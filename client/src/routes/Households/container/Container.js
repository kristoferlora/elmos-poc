import React from 'react'
import PropTypes from 'prop-types'
import pick from 'lodash/pick'

import getServerURL from '../../../common/utils/getServerUrl'
import fetchData from '../../../common/utils/fetchData'
import {electricMeterHeaders as fields} from '../constants/electricMeterHeaders'

import Layout from './Layout'

const transformData = (data) => {
  return data.map((datum) => {
    const forReturn = pick(datum, [...fields, 'electricMeterID'])
    forReturn.ownedBy = [datum.user.firstName, datum.user.lastName].join(' ')
    return forReturn
  })
}


class Container extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    })
  }

  static defaultProps = {
    history: {
      push: () => null
    }
  }

  state = {
    loading: false
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    await this.setState({
      loading: true
    })
    const URL = `${getServerURL()}/electricMeters`

    try {
      const data = await fetchData(URL)

      this.setState({
        loading: false,
        data: (data && transformData(data)) || []
      })
    } catch (error) {
      this.setState({
        loading: false
      })
      console.log(error.message)
    }
  }

  addHouseholdCallback = () => {
    const {history} = this.props
    history.push('/add-household')
  }

  onRowClick = (id) => {
    const {
      history
    } = this.props
    history.push(`/electric-meter/${id}`)
  }

  render() {
    const {
      loading,
      data
    } = this.state
    const props = {
      households: data,
      loading,
      addHouseholdCallback: this.addHouseholdCallback,
      onRowClick: this.onRowClick
    }
    return (
      <Layout {...props} />
    )
  }
}

export default Container
