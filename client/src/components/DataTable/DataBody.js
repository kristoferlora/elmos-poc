import React from 'react'
import PropTypes from 'prop-types'

import {Table} from 'semantic-ui-react'

const {
  Body,
  Row,
  Cell
} = Table

function DataBody({
  headers,
  data,
  keyField,
  onRowClick
}) {
  const getCell = (rowData) => {
    return headers.map((header) => {
      const key = `${rowData[keyField]}-${header}`
      return (
        <Cell key={key}>
          <p>{rowData[header]}</p>
        </Cell>
      )
    })
  }
  const getData = () => {
    return data.map((datum) => {
      const rowClick = () => onRowClick(datum[keyField])
      return (
        <Row key={datum[keyField]} onClick={rowClick}>
          {getCell(datum)}
        </Row>
      )
    })
  }
  return (
    <Body>
      {getData()}
    </Body>
  )
}

DataBody.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  keyField: PropTypes.string.isRequired,
  onRowClick: PropTypes.func
}

DataBody.defaultProps = {
  onRowClick: () => null
}

export default DataBody
