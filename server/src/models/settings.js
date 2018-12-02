/**
 * @module models/electricMeter
 */
import uuid from 'uuid/v4'

import {createModel} from './base'

const DATA_TYPES = [
  'STRING',
  'NUMBER',
  'BOOLEAN'
]

export default createModel(
  'Settings',
  (types) => {
    return {
      name: {
        field: 'name',
        type: types.STRING,
        allowNull: false,
        primaryKey: true
      },
      value: {
        field: 'value',
        type: types.TEXT,
        allowNull: false
      },
      dataType: {
        field: 'data_type',
        type: types.STRING,
        allowNull: false
      }
    }
  },
  {
    tableName: 'settings',
    constants: [
      DATA_TYPES
    ],
    afterSync: async (Settings, db) => {
      const settings = await Settings.findAll()
      if (!settings || settings.length < 1) {
        const rows = []
        rows.push({
          name: 'KILOWATTHOURCHARGE',
          value: '5.3554',
          dataType: 'NUMBER'
        })
        await Settings.bulkCreate(rows)
      }
    }
  }
)
