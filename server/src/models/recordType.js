/**
 * @module models/recordType
 */
import uuid from 'uuid/v4'
import _ from 'lodash'

import {
  createModel
} from './base'

const OBJECTS = [
  'User'
]

export default createModel(
  'RecordType',
  (types) => {
    return {
      recordTypeID: {
        type: types.STRING,
        field: 'record_type_id',
        unique: true,
        primaryKey: true,
        default: uuid
      },
      name: {
        type: types.STRING,
        field: 'name'
      },
      object: {
        type: types.STRING,
        field: 'object'
      }
    }
  }, {
    tableName: 'recordtype',
    includeIsDeletedField: false,
    associate: (RecordType, db) => {
      const tables = _.map(OBJECTS, (table) => db[table])
      tables.forEach((model) => {
        const alias = model.name.charAt(0).toLowerCase() + model.name.slice(1)
        RecordType.belongsTo(model, {
          as: alias,
          foreignKey: 'recordTypeID',
          constraints: false
        })
      })
    },
    afterSync: async (RecordType, db) => {
      const tables = _.map(OBJECTS, (table) => db[table])

      if (['test', 'development'].includes(process.env.NODE_ENV)) {
        const types = await RecordType.findAndCountAll()
        if (types.count === 0) {
          const rows = []
          _.each(tables, (table) => {
            _.each(table.TYPES, (type) => {
              rows.push({
                object: table.tableName,
                recordTypeID: uuid().substring(0,18),
                name: type
              })
            })
          })
          await RecordType.bulkCreate(rows)
        }
      }
      const types = await RecordType.findAll()

      const models = _.fromPairs(_.map(db, (m) => {
        return [m.tableName, m.name]
      }))
      Object.assign(RecordType, _.transform(types, (o, type) => {
        const {object, recordTypeID, name} = type
        const modelName = models[object]

        if (modelName !== undefined) {
          if (o[modelName] === undefined) {
            o[modelName] = {VALUES: {}}
          }

          // attach based on type value
          o[modelName][name] = recordTypeID

          // attach based on key
          const key = _.invert(db[modelName].TYPES)[name]
          o[modelName][key] = recordTypeID

          // attach based on actual value
          o[modelName].VALUES[recordTypeID] = name
        }
      }))
    }
  }
)
