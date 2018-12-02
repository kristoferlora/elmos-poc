import React from 'react'
import PropTypes from 'prop-types'

import Layout from './Layout'

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

  addUserCallback = () => {
    const {history} = this.props
    history.push('/add-user')
  }

  render() {
    const props = {
      addUserCallback: this.addUserCallback
    }
    return (
      <Layout {...props} />
    )
  }
}

export default Container
