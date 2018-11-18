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
      'month': {
        field: 'month',
        type: types.STRING,
        allowNull: false
      },
      'year': {
        field: 'year',
        type: types.STRING,
        allowNull: false
      },
      'consumption': {
        field: 'consumption',
        type: types.DOUBLE,
        allowNull: false
      },
      electricMeterID: {
        field: 'electricMeterID',
        type: types.STRING,
        allowNull: false
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
