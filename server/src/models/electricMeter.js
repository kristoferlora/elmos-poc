/**
 * @module models/electricMeter
 */
import uuid from 'uuid/v4'

import {createModel} from './base'

export default createModel(
  'ElectricMeter',
  (types) => {
    return {
      electricMeterID: {
        field: 'electric_meter_id',
        type: types.STRING,
        default: uuid,
        unique: true,
        primaryKey: true
      },
      serialKey: {
        field: 'serial_key',
        type: types.STRING,
        unique: true
      },
      location: {
        field: 'location',
        type: types.STRING,
        allowNull: false
      },
      latitude: {
        field: 'latitude',
        type: types.DOUBLE,
        defaultValue: 0
      },
      longitude: {
        field: 'longitude',
        type: types.DOUBLE,
        defaultValue: 0
      },
      totalConsumption: {
        field: 'total_consumption',
        type: types.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      userID: {
        field: 'user_id',
        type: types.STRING,
        allowNull: false
      },
      billingStartDate: {
        field: 'billing_start_date',
        type: types.STRING,
        allowNull: false
      },
      billingEndDate: {
        field: 'billing_end_date',
        type: types.STRING
      },
      reasonOfDisconnection: {
        field: 'reason_of_disconnection',
        type: types.STRING
      },
      isDisconnected: {
        field: 'is_disconnected',
        type: types.BOOLEAN,
        defaultValue: false
      },
      billableAmountLimimt: {
        field: 'billable_amount_limit',
        type: types.DOUBLE
      }
    }
  },
  {
    tableName: 'electric_meter',
    associate: (ElectricMeter, db) => {
      ElectricMeter.hasMany(db.MonthlyConsumption, {
        as: 'monthlyConsumptions',
        targetKey: 'electricMeterID',
        foreignKey: 'electricMeterID',
        constraints: false
      })
      ElectricMeter.belongsTo(db.User, {
        as: 'user',
        sourceKey: 'userID',
        foreignKey: 'userID',
        constraints: false
      })
    }
  }
)
