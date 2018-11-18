/**
 * @module models/contact
 */
import uuid from 'uuid/v4'

import {createModel} from './base'
import {contactConstants} from './constants'

const {TYPES} = contactConstants

export default createModel(
  'Contact',
  (types) => {
    return {
      'contactID': {
        field: 'contact_id',
        type: types.STRING,
        defaultValue: uuid,
        primaryKey: true,
        unique: true
      },
      'unit_number': {
        field: 'unit_number',
        type: types.STRING
      },
      'street': {
        field: 'street',
        type: types.STRING
      },
      'municipality': {
        field: 'municipality',
        type: types.STRING
      },
      'country': {
        field: 'country',
        type: types.STRING
      },
      'zipCode': {
        field: 'zip_code',
        type: types.STRING
      },
      'phone': {
        field: 'phone',
        type: types.STRING
      },
      'name': {
        field: 'name',
        type: types.STRING
      },
      'recordTypeID': {
        field: 'record_type_id',
        type: types.STRING
      },
      userID: {
        field: 'user_id',
        type: types.STRING
      }
    }
  }, {
    tableName: 'contact',
    associate: (Contact, db) => {
      Contact.belongsTo(db.RecordType, {
        as: 'recordType',
        sourceKey: 'recordTypeID',
        foreignKey: 'recordTypeID',
        constraints: false
      })
      Contact.belongsTo(db.User, {
        as: 'user',
        sourceKey: 'userID',
        foreignKey: 'userID',
        constraints: false
      })
    },
    constants: {
      TYPES
    }
  }
)
