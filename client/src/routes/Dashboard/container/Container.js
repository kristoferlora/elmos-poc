import React from 'react'

import Layout from './Layout'

import fetchData from '../../../common/utils/fetchData'
import getServerURL from '../../../common/utils/getServerUrl'

import {
  averageHouseholdSegmentProps,
  totalHouseholdSegmentProps
} from '../constants/gaugeProps'

const tableSegmentProps = {
  title: 'Households'
}

class Container extends React.Component {
  state = {
    loading: false,
    data: [],
    averageHouseholdSegment: averageHouseholdSegmentProps,
    totalHouseholdSegment: totalHouseholdSegmentProps
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.setState({
      loading: true
    }, async () => {
      const URL = `${getServerURL()}/electricMeters`
      const statsURL = `${getServerURL()}/electricMeters/stats`
      try {
        const data = await fetchData(URL)
        fetchData(statsURL)
          .then((statsData) => {
            this.setState({
              averageHouseholdSegment: {
                ...averageHouseholdSegmentProps,
                value: statsData.average || 0
              },
              totalHouseholdSegment: {
                ...totalHouseholdSegmentProps,
                value: statsData.sum || 0
              }
            })
          })

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

  onRowClick = (id) => {
    const {history} = this.props
    history.push(`/electric-meter/${id}`)
  }

  render() {
    const {
      data,
      loading,
      averageHouseholdSegment,
      totalHouseholdSegment
    } = this.state
    const layoutProps = {
      loading,
      averageHouseholdSegmentProps: averageHouseholdSegment,
      totalHouseholdSegmentProps: totalHouseholdSegment,
      tableSegmentProps: {
        tableSegmentProps,
        loadingTableData: loading,
        tableData: data && data.length > 0 ? data : [],
        addHouseholdCallback: this.addHouseholdCallback,
        onRowClick: this.onRowClick
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
