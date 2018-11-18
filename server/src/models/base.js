/**
 * @module models
 */
import _ from 'lodash'

const modifiedDateColumnName = 'modified_date'

/**
 * get Date fields for inclusion to a model
 * @param {Object} types - sequelize data types
 * @returns {Object} fields
 */
const getDateFields = (types) =>  {
  return {
    fields: {
      createdDate: {
        type: types.DATE,
        field: 'created_date'
      },
      modifiedDate: {
        type: types.DATE,
        field: modifiedDateColumnName
      }
    },
    options: {
      timestamps: true,
      createdAt: 'createdDate',
      updatedAt: modifiedDateColumnName
    }
  }
}

/**
 * get deleted field for inclusion to a model
 * @param {Object} types - sequelize data types
 * @returns {Object} fields
 */
const getDeletedField = (types) =>  {
  return {
    fields: {
      isDeleted: {
        type: types.BOOLEAN,
        field: 'isdeleted',
        defaultValue: false
      }
    },
    options: {
      deletedAt: false
    }
  }
}

/**
 * get created and modified by fields for inclusion to a model
 * @param {Object} types - sequelize data types
 * @returns {Object} fields
 */
const getCreatedAndModifiedFields = (types) =>  {
  return {
    fields: {
      createdBy: {
        type: types.STRING,
        field: 'created_by',
        defaultValue: 'SYSTEM'
      },
      modifiedBy: {
        type: types.STRING,
        field: 'modified_by',
        defaultValue: 'SYSTEM'
      }
    }
  }
}

/**
 * get date and deleted fields for inclusion to a model
 * @param {Object} DataTypes - sequelize data types
 * @returns {Object} fields
 */
const getDateAndDeletedFields = (DataTypes) => {
  return _.merge(
    getDateFields(DataTypes),
    getDeletedField(DataTypes),
    getCreatedAndModifiedFields(DataTypes)
  )
}

/**
 * Calculates the table name for a given model name
 * @param {String} modelName - name of the model
 * @returns {String} calculated table name for use in heroku connect
 */
const getTableName = (modelName) => {
  const snake = modelName.replace(/([a-z])([A-Z])/g,
    (m) => `${m[0]}_${m[1].toLowerCase()}`).toLowerCase()
  return `${snake}__c`
}

const multiSelectFieldMethods = (field) => {
  return {
    get() {
      return this.getDataValue(field)? this.getDataValue(field).split(';') : []
    },
    set(values) {
      const value = (values instanceof Array)? values.join(';') : values
      this.setDataValue(field, value)
    }
  }
}

// add hooks here from sequelize docs
const validHooks = [
  'afterSync',
  'afterBulkSync'
]

const addHooks = (model, hooks) => {
  let keys = Object.keys(hooks)
  keys = keys.filter((key) => {
    return validHooks.includes(key)
  })
  keys.forEach((key) => {
    model.addHook(key ,(options) => {
      const callback = hooks[key]
      callback(model, options)
    })
  })
}

/**
 * Factory for creating models
 * @param {String} modelName - name for the model
 * @param {Function} fields -
 * @param {Object} options - maps to options for sequelize.define function with default values
 *  tableName - explicitly set table name for the model, defalts to lowercase + __c
 *  associate
 *  constants
 *  setup
 *  freezeTableName = true
 *  schema=EMS_SCHEMA
 * @returns {Function} function for sequelize to create a model
 */
const createModel = (modelName, fields, options, hooks) => {
  // destructure some variables
  const {
    tableName,
    associate,
    constants,
    setup,
    schema,
    afterSync,
    afterBulkSync,
    freezeTableName,
    includeExtraFields,
    includeIsDeletedField
  } = {
    // set default values
    ...{
      schema:process.env.EMS_SCHEMA,
      freezeTableName:true,
      includeExtraFields:true,
      includeIsDeletedField: true
    },
    ...options
  }

  return (sequelize, types) => {
    const extraFields = getDateAndDeletedFields(types)

    if (!includeIsDeletedField) {
      delete extraFields.fields.isDeleted
    }

    // default table name to lowercased model name suffixed with __c
    const realTableName = (tableName)? tableName : getTableName(modelName)

    // call sequelize function to define the model
    const model = sequelize.define(
      modelName, {
        // pass fields and other default extra fields if necessary
        ...fields(types, sequelize),
        ...(includeExtraFields)? extraFields.fields : {}
      }, {
        // pass options to define model function
        ...options,
        ...{
          tableName: realTableName,
          freezeTableName,
          schema,
          ...(includeExtraFields)? extraFields.options : {timestamps: false}
        }
      }
    )

    // add in associate
    model.associate = (associate)
      ? (db) => associate(model, db)
      : null

    // attach constants
    Object.assign(model, constants)

    // add method alias ---------------------------------------------
    model.findByID = model.findById

    // run setup if function present --------------------------------
    if (setup) {
      setup(model, sequelize)
    }

    if (hooks) {
      addHooks(model, hooks)
    }

    // run after sequelize.sync
    if (afterSync) {
      model.afterSyncCallback = afterSync
    }

    if (afterBulkSync) {
      model.afterBulkSyncCallback = afterBulkSync
    }

    // override methods ---------------------------------------------
    const hasIsDeleted = model.rawAttributes.isDeleted
    const hasDeleted = model.rawAttributes.deleted
    const overrideOptions = (options) => {
      const overriden = Object.assign({}, options)
      // exclude deleted records unless explicitly set
      if (hasIsDeleted && options && options.where && !('isDeleted' in options.where)) {
        if (('$and' in options.where)) {
          overriden.where['$and'].push({
            $or: [
              {isDeleted: false},
              {isDeleted: null}
            ]
          })
        } else {
          overriden.where['$and'] = [{
            $or: [
              {isDeleted: false},
              {isDeleted: null}
            ]
          }]
        }
      }
      if (hasDeleted && options && options.where && !('deleted' in options.where)) {
        if (('$and' in options.where)) {
          overriden.where['$and'].push({
            $or: [
              {deleted: false},
              {deleted: null}
            ]
          })
        } else {
          overriden.where['$and'] = [{
            $or: [
              {deleted: false},
              {deleted: null}
            ]
          }]
        }
      }
      return overriden
    }

    model.origFindOne = model.findOne
    model.findOne = model.find = (options) => {
      const overriden = overrideOptions(options)
      return model.origFindOne(overriden)
    }

    model.origFindAll = model.findAll
    model.findAll = (options) => {
      const overriden = overrideOptions(options)
      return model.origFindAll(overriden)
    }

    model.origFindAndCountAll = model.findAndCountAll
    model.findAndCountAll = (options) => {
      const overriden = overrideOptions(options)
      return model.origFindAndCountAll(overriden)
    }

    return model
  }
}

export {
  modifiedDateColumnName,
  getDateFields,
  getDeletedField,
  getDateAndDeletedFields,
  multiSelectFieldMethods,
  createModel
}
