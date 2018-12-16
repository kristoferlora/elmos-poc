import React from 'react'
import PropTypes from 'prop-types'
import {
  Header,
  Segment,
  Divider
} from 'semantic-ui-react'

import {userHeaders} from '../constants/userHeaders'

import {
  EmptyState,
  DataTable
} from '../../../components'

function Layout({
  loading,
  addUserCallback,
  data,
  onRowClick
}) {
  if (loading) {
    return (
      <p>Loading...</p>
    )
  }
  if (data && data.length > 0) {
    return (
      <Segment>
        <Header as="h2">Homeowners</Header>
        <Divider />
        <DataTable
          headers={userHeaders}
          data={data}
          keyField="userID"
          onRowClick={onRowClick}
        />
      </Segment>
    )
  }
  return (
    <EmptyState
      message="No Household Owners"
      callback={addUserCallback}
      callbackText="Add Household Owner"
    />
  )
}

Layout.propTypes = {
  addUserCallback: PropTypes.func,
  data: PropTypes.array,
  loading: PropTypes.bool,
  onRowClick: PropTypes.func
}

Layout.defaultProps = {
  addUserCallback: () => null,
  data: [],
  loading: false,
  onRowClick: () => null
}

export default Layout
