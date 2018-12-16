import React from 'react'
import PropTypes from 'prop-types'
import {
  Segment,
  Divider,
  Header
} from 'semantic-ui-react'

import {
  EmptyState,
  DataTable
} from '../../../components'

import {
  electricMeterHeaders
} from '../constants/electricMeterHeaders'

function Layout({
  households,
  loading,
  addHouseholdCallback,
  onRowClick
}) {
  if (loading) {
    return (
      <p>loading...</p>
    )
  }

  if (!households || households.length < 1) {
    return (
      <EmptyState
        message="No households"
        callback={addHouseholdCallback}
        callbackText="Add household"
      />
    )
  }

  return (
    <Segment>
      <Header as="h2">Managed Households</Header>
      <Divider />
      <DataTable
        headers={electricMeterHeaders}
        data={households}
        keyField="electricMeterID"
        onRowClick={onRowClick}
      />
    </Segment>
  )
}

Layout.propTypes = {
  households: PropTypes.array,
  loading: PropTypes.bool,
  addHouseholdCallback: PropTypes.func,
  onRowClick: PropTypes.func
}

Layout.defaultProps = {
  households: [],
  loading: false,
  // refetchHouseholds: () => null,
  addHouseholdCallback: () => null,
  onRowClick: () => null
}

export default Layout
