import React from 'react'
import PropTypes from 'prop-types'

import {Table} from 'semantic-ui-react'

import DataHeaders from './DataHeaders'
import DataBody from './DataBody'

import EmptyState from '../EmptyState'

function DataTable({
  data,
  headers,
  keyField,
  onRowClick,
  emptyStateProps
}) {
  if (data.length < 1) {
    return (
      <EmptyState
        {...emptyStateProps}
      />
    )
  }
  return (
    <Table celled>
      <DataHeaders
        headers={headers}
      />
      <DataBody
        headers={headers}
        data={data}
        keyField={keyField}
        onRowClick={onRowClick}
      />
    </Table>
  )
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  keyField: PropTypes.string.isRequired,
  emptyStateProps: PropTypes.shape({
    message: PropTypes.string,
    callback: PropTypes.func,
    callbackText: PropTypes.string
  }),
  onRowClick: PropTypes.func
}

DataTable.defaultProps = {
  emptyStateProps: {
    message: 'No data available',
    callback: null,
    callbackText: null
  },
  onRowClick: null
}

export default DataTable
