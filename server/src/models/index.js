import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path'
import Sequelize from 'sequelize'
import urlParse from 'url-parse'
import debugLib from 'debug'
import _ from 'lodash'

const debug = debugLib('one-rent:db')

let basename = path.basename(module.filename)

const schema = process.env.EMS_SCHEMA

const makeTestConnection = () => {
  dotenv.config()
  const debugTest = debugLib('one-rent:test')
  if (process.env.POSTGRES_TEST_URL) {
    const dbOptions = {
      dialect: 'postgres',
      logging: false
    }

    const url = urlParse(process.env.POSTGRES_TEST_URL)
    debugTest(`Connecting to '${url.pathname}' on '${url.hostname}' via Sequelize...`)
    return new Sequelize(process.env.POSTGRES_TEST_URL, dbOptions)
  } else {
    const dbOptions = {
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false
    }

    debugTest(`Connecting to 'in memory sqlite database' via Sequelize...`)
    return new Sequelize('', null, null, dbOptions)
  }
}

const makeConnection = () => {
  const dbOptions = {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: process.env.POSTGRES_SSL
    },
    pool: {
      max: 100,
      min: 0,
      idle: 20000,
      acquire: 20000
    }
  }

  const url = urlParse(process.env.POSTGRES_URL)
  debug(`Connecting to '${url.pathname}' on '${url.hostname}' via Sequelize...`)
  return new Sequelize(process.env.POSTGRES_URL, dbOptions)
}


const readModels = (sequelize) => {
  let models = {}

  fs.readdirSync(__dirname)

    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== basename)
    })

    .forEach(function(file) {
      if (file.slice(-3) !== '.js' || file === 'base.js') {
        return
      }
      const filePath = path.join(__dirname, file)
      const model = sequelize.import(filePath)
      models[model.name] = model
    })

  Object.keys(models).forEach(function(modelName) {
    if (models[modelName].associate) {
      models[modelName].associate(models)
    }
  })

  return models
}

const sequelize = (process.env.NODE_ENV === 'test')?  makeTestConnection() : makeConnection()
const db = readModels(sequelize)
// expose some attributes
db.sequelize = sequelize
db.Sequelize = Sequelize
db.CURRENT_TIMESTAMP = sequelize.literal('CURRENT_TIMESTAMP')

db.connect = async (callback) => {
  const runAfterSyncCallbacks = () => {
    debug('Running after sync callbacks')
    // run after sync
    return Promise.all(_.map(Object.keys(db), (modelName) => {
      if (db[modelName].afterSyncCallback) {
        return db[modelName].afterSyncCallback(db[modelName], db)
      }
    })).then(runAfterBulkSyncCallbacks)
  }

  const runAfterBulkSyncCallbacks = () => {
    debug('Running after bulk sync callbacks')
    // run after afterSync
    return Promise.all(_.map(Object.keys(db), (modelName) => {
      if (db[modelName].afterBulkSyncCallback) {
        return db[modelName].afterBulkSyncCallback(db[modelName], db)
      }
    })).then(callback)
  }

  // try to create schema if not in production or staging
  if (!['production', 'staging'].includes(process.env.NODE_ENV)) {
    try {
      await sequelize.createSchema(schema)
    } catch (error) {
      debug(`Schema [${schema}] already exists.`)
    } finally {
      return await sequelize.sync().then(runAfterSyncCallbacks)

    }
  }
  return await runAfterSyncCallbacks()
}

export default db
