import React from 'react'
import moment from 'moment'

import Layout from './Layout'

import fetchData from '../../../common/utils/fetchData'
import getServerURL from '../../../common/utils/getServerUrl'
import colors from '../../../common/colors'

const value = 0
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
    width: 250,
    height: 250,
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
    value: 0,
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
    width: 250,
    height: 250,
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

const tableSegmentProps = {
  title: 'Households'
}

class Container extends React.Component {
  state = {
    loading: false,
    data: []
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.setState({
      loading: true
    }, async () => {
      const URL = `${getServerURL()}/electricMeters`
      try {
        const data = await fetchData(URL)
        this.setState({
          data
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.setState({
          loading: false
        })
      }
    })
  }

  addHouseholdCallback = () => {
    const {history} = this.props
    history.push('/add-household')
  }

  render() {
    const {
      data,
      loading
    } = this.state
    const layoutProps = {
      averageHouseholdSegmentProps,
      totalHouseholdSegmentProps,
      tableSegmentProps: {
        tableSegmentProps,
        loadingTableData: loading,
        tableData: data && data.length > 0 ? data : [],
        addHouseholdCallback: this.addHouseholdCallback
      }
    }

    return (
      <Layout
        {...layoutProps}
      />
    )
  }
}

export default Container
