import React from 'react'
import PropTypes from 'prop-types'

import {
  Grid,
  Container
} from 'semantic-ui-react'
import {
  GaugeSegment,
  TableSegment
} from '../components'

function Layout({
  averageHouseholdSegmentProps,
  totalHouseholdSegmentProps,
  tableSegmentProps
}) {
  return (
    <Grid divided stackable>
      <Grid.Row>
        <Grid.Column width={4}>
          <Container textAlign="center">
            <GaugeSegment
              {...averageHouseholdSegmentProps}
            />
            <GaugeSegment
              {...totalHouseholdSegmentProps}
            />
          </Container>
        </Grid.Column>
        <Grid.Column width={12}>
          <Container>
            <TableSegment {...tableSegmentProps} />
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

Layout.propTypes = {
  averageHouseholdSegmentProps: PropTypes.object.isRequired,
  totalHouseholdSegmentProps: PropTypes.object.isRequired,
  tableSegmentProps: PropTypes.object.isRequired
}

export default Layout
