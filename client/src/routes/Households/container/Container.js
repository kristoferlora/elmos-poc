import React from 'react'
import PropTypes from 'prop-types'

import Layout from './Layout'

class Container extends React.Component {
  static propTypes = {
    households: PropTypes.arrayOf(PropTypes.object),
    loadingHouseholds: PropTypes.bool,
    refetchHouseholds: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func
    })
  }

  static defaultProps = {
    households: [],
    loadingHouseholds: false,
    refetchHouseholds: () => null,
    history: {
      push: () => null
    }
  }

  nextPage = () => {
    alert('clicked next page')
  }

  prevPage = () => {
    alert('clicked prev page')
  }

  addHouseholdCallback = () => {
    const {history} = this.props
    history.push('/add-household')
  }

  render() {
    const {
      households,
      loadingHouseholds,
      refetchHouseholds
    } = this.props

    const props = {
      householdProps: {
        households,
        loadingHouseholds,
        refetchHouseholds,
        addHouseholdCallback: this.addHouseholdCallback
      },
      pagination: {
        nextPage: this.nextPage,
        prevPage: this.prevPage
      }
    }
    return (
      <Layout {...props} />
    )
  }
}

export default Container
