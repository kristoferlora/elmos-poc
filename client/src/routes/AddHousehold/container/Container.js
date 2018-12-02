import React from 'react'
import PropTypes from 'prop-types'

import Layout from './Layout'

class Container extends React.Component {
  static propTypes = {
    createHousehold: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func
    })
  }

  static defaultProps = {
    createHousehold: () => null,
    history: {
      push: () => null
    }
  }

  createHouseholdCallback = (values) => {
    const {createHousehold} = this.props
    createHousehold(values)
  }

  addUserCallback = () => {
    const {history} = this.props
    history.push('/add-user')
  }

  render() {
    const props = {
      handleSubmit: this.createHouseholdCallback,
      addUserCallback: this.addUserCallback
    }
    return (
      <Layout {...props} />
    )
  }
}

export default Container
