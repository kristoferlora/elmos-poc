import React from 'react'
import PropTypes from 'prop-types'
import {
  Divider,
  Segment,
  Header,
  Loader
} from 'semantic-ui-react'

import EmptyState from './EmptyState'
import {electricMeterHeaders} from
  '../../Households/constants/electricMeterHeaders'
import {DataTable} from '../../../components'


function TableSegment({
  title,
  tableData,
  loadingTableData,
  addHouseholdCallback,
  onRowClick
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
      <DataTable
        headers={electricMeterHeaders}
        data={tableData}
        keyField="electricMeterID"
        onRowClick={onRowClick}
      />
    </Segment>
  )
}

TableSegment.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  loadingTableData: PropTypes.bool,
  addHouseholdCallback: PropTypes.func,
  onRowClick: PropTypes.func
}

TableSegment.defaultProps = {
  title: 'Managed Households',
  tableData: [],
  loadingTableData: true,
  addHouseholdCallback: () => null,
  onRowClick: () => null
}

export default TableSegment
