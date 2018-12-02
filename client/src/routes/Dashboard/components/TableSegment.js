import React from 'react'
import PropTypes from 'prop-types'
import {
  Divider,
  Segment,
  Header,
  Table,
  Loader
} from 'semantic-ui-react'

import EmptyState from './EmptyState'


function TableSegment({
  title,
  tableData,
  loadingTableData,
  addHouseholdCallback
}) {
  if (loadingTableData) {
    return (
      <Loader>Loading...</Loader>
    )
  }

  if (!tableData || !(tableData.length > 0)) {
    return (
      <EmptyState
        message="No Households managed."
        callback={addHouseholdCallback}
        callbackText="Add household"
      />
    )
  }
  return (
    <Segment>
      <Header as="h2">{title}</Header>
      <Divider />
    </Segment>
  )
}

TableSegment.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  loadingTableData: PropTypes.bool,
  addHouseholdCallback: PropTypes.func
}

TableSegment.defaultProps = {
  title: null,
  tableData: [],
  loadingTableData: true,
  addHouseholdCallback: () => null
}

export default TableSegment
