import React from 'react'
import moment from 'moment'

import Layout from './Layout'

import colors from '../../../common/colors'

const value = 287.739
const averageHouseholdSegmentProps = {
  title: 'Average Household Consumption (KWH)',
  radialGaugeProps: {
    minValue: 0,
    maxValue: 10000,
    units: 'KWH',
    value,
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
    width: 350,
    height: 350,
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

const now = moment()
const month = now.format('MMM')

const totalHouseholdSegmentProps = {
  title: `Total Household Consumption for ${month} (KWH)`,
  radialGaugeProps: {
    minValue: 0,
    maxValue: 100000,
    units: 'KWH',
    value: 44282.54,
    majorTicks: [
      10000,
      20000,
      30000,
      40000,
      50000,
      60000,
      70000,
      80000,
      90000,
      100000
    ],
    minorTicks: 2,
    width: 350,
    height: 350,
    highlights: [
      {from: 0, to: 20000, color: 'rgba(0,0,255,.25)'},
      {from: 20000, to: 40000, color: 'rgba(255,0,225,.25)'},
      {from: 40000, to: 60000, color: 'rgba(0,255,0,.15)'},
      {from: 60000, to: 80000, color: 'rgba(255,255,0,.15)'},
      {from: 80000, to: 100000, color: 'rgba(255,30,0,.25)'}
    ],
    colorPlate: colors.base03,
    colorMajorTicks: colors.blue,
    colorMinorTicks: colors.cyan,
    colorUnits: colors.cyan,
    colorNumbers: colors.magenta,
    valueBox: false
  }
}

function Container() {
  const layoutProps = {
    averageHouseholdSegmentProps,
    totalHouseholdSegmentProps
  }
  return (
    <Layout
      {...layoutProps}
    />
  )
}

export default Container
