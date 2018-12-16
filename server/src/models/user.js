/**
 * @module models/user
 */
import uuid from 'uuid/v4'

import {createModel} from './base'
import {
  createAdminUser,
  createHouseholdUser,
  createElectricMeter,
  createMonthlyConsumption
} from '../seeder'

import {TYPES} from './constants/user'

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
      'password': {
        field: 'password',
        type: types.STRING,
        allowNull: false
      },
      'firstName': {
        field: 'first_name',
        type: types.STRING,
        allowNull: false
      },
      'lastName': {
        field: 'last_name',
        type: types.STRING,
        allowNull: false
      },
      email: {
        field: 'email',
        type: types.STRING,
        unique: true
      },
      permanentAddress: {
        field: 'permanent_address',
        type: types.TEXT
      },
      phone: {
        field: 'phone',
        type: types.STRING
      },
      mobilePhone: {
        field: 'mobile',
        type: types.STRING
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
    },
    constants: {
      TYPES
    },
    setup: (User, sequelize) => {
      const db = sequelize.models

      Object.defineProperty(User.prototype, "name", {
        get: function() {
          return `${this.firstName} ${this.lastName}`
        }
      })
      Object.defineProperty(User.prototype, "type", {
        get: function() {
          return db.RecordType.User.VALUES[this.recordType]
        }
      })
    },
    afterBulkSync: async (User, db) => {
      const user = await User.findOne()
      if (!user) {
        const userRows = []
        const electricMeterRows = []
        const monthlyConsumptions = []
        userRows.push(createAdminUser(db))
        let i = 0
        while(i < 20) {
          const user = createHouseholdUser(db)
          const electricMeter = createElectricMeter(user, db)

          userRows.push(user)
          electricMeterRows.push(electricMeter)
          monthlyConsumptions.push(createMonthlyConsumption(electricMeter))

          i++
        }
        await User.bulkCreate(userRows)
        await db.ElectricMeter.bulkCreate(electricMeterRows)
        await db.MonthlyConsumption.bulkCreate(monthlyConsumptions)
      }
    }
  }
)
