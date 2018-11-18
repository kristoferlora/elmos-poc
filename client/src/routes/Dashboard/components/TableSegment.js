import React from 'react'
import PropTypes from 'prop-types'

import {
  Divider,
  Segment,
  Header
} from 'semantic-ui-react'

function TableSegment({
  title,
  tableData
}) {
  return (
    <Segment>
      <Header as="h2">{title}</Header>
      <Divider />
      Table here
      {
        tableData
        && tableData.length > 0
        && (
          <p>Table data here</p>
        )
      }
    </Segment>
  )
}

TableSegment.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array
}

TableSegment.defaultProps = {
  title: null,
  tableData: []
}

export default TableSegment
