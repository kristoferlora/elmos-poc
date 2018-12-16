import React from 'react'
import PropTypes from 'prop-types'

import Layout from './Layout'

class Container extends React.Component {
  static propTypes = {
    createUser: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func
    })
  }

  static defaultProps = {
    createUser: () => null,
    history: {
      push: () => null
    }
  }

  addHouseholdCallback = () => {
    const {history} = this.props
    history.push('/add-household')
  }

  render() {
    const props = {
      addHouseholdCallback: this.addHouseholdCallback
    }
    return (
      <Layout {...props} />
    )
  }
}

export default Container
