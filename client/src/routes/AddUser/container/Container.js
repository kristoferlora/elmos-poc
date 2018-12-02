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

  handleCreateUser = async (values) => {
    const {createUser} = this.props
    await createUser(values)
  }

  addHouseholdCallback = () => {
    const {history} = this.props
    history.push('/add-household')
  }

  render() {
    const props = {
      handleCreateUser: this.handleCreateUser,
      addHouseholdCallback: this.addHouseholdCallback
    }
    return (
      <Layout {...props} />
    )
  }
}

export default Container
