import moment from 'moment'
import colors from '../../../common/colors'

const value = 0

const now = moment()
const month = now.format('MMM')

export const averageHouseholdSegmentProps = {
  title: `Average Household Consumption for ${month} (KWH)`,
  radialGaugeProps: {
    minValue: 0,
    maxValue: 1000,
    units: 'KWS',
    value,
    majorTicks: [
      100,
      200,
      300,
      400,
      500,
      600,
      700,
      800,
      900,
      1000
    ],
    minorTicks: 2,
    width: 200,
    height: 200,
    highlights: [
      {from: 0, to: 200, color: 'rgba(0,0,255,.25)'},
      {from: 200, to: 400, color: 'rgba(255,0,225,.25)'},
      {from: 400, to: 600, color: 'rgba(0,255,0,.15)'},
      {from: 600, to: 800, color: 'rgba(255,255,0,.15)'},
      {from: 800, to: 1000, color: 'rgba(255,30,0,.25)'}
    ],
    colorPlate: colors.base03,
    colorMajorTicks: colors.blue,
    colorMinorTicks: colors.cyan,
    colorUnits: colors.cyan,
    colorNumbers: colors.magenta,
    valueBox: false
  }
}

export const totalHouseholdSegmentProps = {
  title: `Total Household Consumption for ${month} (KWH)`,
  radialGaugeProps: {
    minValue: 0,
    maxValue: 10000,
    units: 'KWS',
    value: 0,
    majorTicks: [
      1000,
      2000,
      3000,
      4000,
      5000,
      6000,
      7000,
      8000,
      9000,
      10000
    ],
    minorTicks: 2,
    width: 200,
    height: 200,
    highlights: [
      {from: 0, to: 2000, color: 'rgba(0,0,255,.25)'},
      {from: 2000, to: 4000, color: 'rgba(255,0,225,.25)'},
      {from: 4000, to: 6000, color: 'rgba(0,255,0,.15)'},
      {from: 6000, to: 8000, color: 'rgba(255,255,0,.15)'},
      {from: 8000, to: 10000, color: 'rgba(255,30,0,.25)'}
    ],
    colorPlate: colors.base03,
    colorMajorTicks: colors.blue,
    colorMinorTicks: colors.cyan,
    colorUnits: colors.cyan,
    colorNumbers: colors.magenta,
    valueBox: false
  }
}
