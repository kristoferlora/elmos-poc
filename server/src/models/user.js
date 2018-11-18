/**
 * @module models/user
 */
import uuid from 'uuid/v4'

import {createModel} from './base'

export default createModel(
  'User',
  (types) => {
    return {
      'userID': {
        field: 'user_id',
        type: types.STRING,
        defaultValue: uuid,
        primaryKey: true,
        unique: true
      },
      'recordTypeID': {
        field: 'record_type_id',
        type: types.STRING,
        allowNull: false
      },
      'username': {
        field: 'username',
        type: types.STRING
      },
      'password': {
        field: 'password',
        type: types.STRING
      },
      'firstName': {
        field: 'first_name',
        type: types.STRING
      },
      'lastName': {
        field: 'last_name',
        type: types.STRING
      },
      contactID: {
        field: 'contact_id',
        type: types.STRING,
        allowNull: false
      }
    }
  }, {
    tableName: 'user',
    associate: (User, db) => {
      User.belongsTo(db.RecordType, {
        as: 'recordType',
        sourceKey: 'recordTypeID',
        foreignKey: 'recordTypeID',
        constraints: false
      })
      User.hasMany(db.ElectricMeter, {
        as: 'electricMeters',
        targetKey: 'userID',
        foreignKey: 'userID',
        constraints: false
      })
      User.hasMany(db.Contact, {
        as: 'contacts',
        targetKey: 'userID',
        foreignKey: 'userID',
        constraints: false
      })
    },
    setup: (User) => {
      Object.defineProperty(User.prototype, "name", {
        get: function() {
          return `${this.firstName} ${this.lastName}`
        }
      })
    }
  }
)
