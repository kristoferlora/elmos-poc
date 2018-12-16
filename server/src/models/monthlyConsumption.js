/**
 * @module models/monthlyConsumption
 */
import uuid from 'uuid/v4'
import {createModel} from './base'

export default createModel(
  'MonthlyConsumption',
  (types) => {
    return {
      'monthlyConsumptionID': {
        field: 'monthly_consumption_id',
        type: types.STRING,
        default: uuid,
        primaryKey: true,
        unique: true
      },
      fromDate: {
        field: 'from_date',
        type: types.STRING,
        allowNull: false
      },
      toDate: {
        field: 'to_date',
        type: types.STRING,
        allowNull: false
      },
      previousMonthConsumption: {
        field: 'previous_month_consumption',
        type: types.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      'consumption': {
        field: 'consumption',
        type: types.DOUBLE,
        allowNull: false
      },
      billableAmount: {
        field: 'billable_amount',
        type: types.DOUBLE,
        defaultValue: 0
      },
      electricMeterID: {
        field: 'electric_meter_ID',
        type: types.STRING,
        allowNull: false
      },
      isBilled: {
        field: 'is_billed',
        type: types.BOOLEAN,
        defaultValue: false
      },
      sentWarningEmail: {
        field: 'sent_first_email',
        type: types.BOOLEAN,
        defaultValue: false
      }
    }
  }, {
    tableName: 'monthly_consumption',
    associate: (MonthlyConsumption, db) => {
      MonthlyConsumption.belongsTo(db.ElectricMeter, {
        as: 'electricMeter',
        sourceKey: 'electricMeterID',
        foreignKey: 'electricMeterID',
        constraints: false
      })
    }
  }
)
