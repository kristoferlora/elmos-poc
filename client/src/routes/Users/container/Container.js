import React from 'react'
import PropTypes from 'prop-types'

import getServerURL from '../../../common/utils/getServerUrl'
import fetchData from '../../../common/utils/fetchData'
import Layout from './Layout'

const transformData = (data) => {
  return data.map((datum) => {
    return {
      ...datum,
      type: datum.recordType.name
    }
  })
}

class Container extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired,
    users: PropTypes.array
  }

  static defaultProps = {
    users: []
  }

  state = {
    loading: false,
    data: []
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    await this.setState({
      loading: true
    })
    const URL = `${getServerURL()}/users`

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

  addUserCallback = () => {
    const {history} = this.props
    history.push('/add-user')
  }

  render() {
    const {loading, data} = this.state

    if (loading) {
      return <p>...</p>
    }

    const props = {
      addUserCallback: this.addUserCallback,
      data
    }

    return (
      <Layout {...props} />
    )
  }
}

export default Container
