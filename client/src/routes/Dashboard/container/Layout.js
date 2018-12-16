import React from 'react'
import PropTypes from 'prop-types'

import {
  Grid
} from 'semantic-ui-react'
import {
  GaugeSegment,
  TableSegment
} from '../components'

function Layout({
  averageHouseholdSegmentProps,
  totalHouseholdSegmentProps,
  tableSegmentProps,
  loading
}) {
  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <React.Fragment>
      <Grid columns={2} stackable textAlign="center">
        <Grid.Column>
          <GaugeSegment
            {...averageHouseholdSegmentProps}
          />
        </Grid.Column>
        <Grid.Column>
          <GaugeSegment
            {...totalHouseholdSegmentProps}
          />
        </Grid.Column>
      </Grid>
      <Grid columns={1}>
        <Grid.Column>
          <TableSegment {...tableSegmentProps} />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}

Layout.propTypes = {
  averageHouseholdSegmentProps: PropTypes.object.isRequired,
  totalHouseholdSegmentProps: PropTypes.object.isRequired,
  tableSegmentProps: PropTypes.object.isRequired
}

export default Layout
