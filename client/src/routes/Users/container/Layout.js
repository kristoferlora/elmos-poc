import React from 'react'
import PropTypes from 'prop-types'

import {EmptyState} from '../../../components'

function Layout({
  addUserCallback
}) {
  return (
    <EmptyState
      message="No Household Owners"
      callback={addUserCallback}
      callbackText="Add Household Owner"
    />
  )
}

Layout.propTypes = {
  addUserCallback: PropTypes.func
}

Layout.defaultProps = {
  addUserCallback: () => null
}

export default Layout
