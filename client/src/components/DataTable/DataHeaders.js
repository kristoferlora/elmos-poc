import React from 'react'
import PropTypes from 'prop-types'
import startCase from 'lodash/startCase'
import kebabCase from 'lodash/kebabCase'

import {Table} from 'semantic-ui-react'

const {
  Header,
  Row,
  HeaderCell
} = Table

function DataHeader({
  headers
}) {
  return (
    <Header>
      <Row>
        {
          headers.map((header) => {
            return (
              <HeaderCell key={kebabCase(header)}>
                {startCase(header)}
              </HeaderCell>
            )
          })
        }
      </Row>
    </Header>
  )
}

DataHeader.propTypes = {
  headers: PropTypes.array.isRequired
}

export default DataHeader
