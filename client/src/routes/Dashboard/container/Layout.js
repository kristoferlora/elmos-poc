import React from 'react'
import PropTypes from 'prop-types'

import {
  Grid,
  Container,
  Divider,
  Segment,
  Header
} from 'semantic-ui-react'
import {GaugeSegment} from '../components'

function Layout({
  averageHouseholdSegmentProps,
  totalHouseholdSegmentProps
}) {
  return (
    <Grid divided>
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
            <Segment>
              <Header as="h2">
                Households
              </Header>
              <Divider />
            </Segment>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

Layout.propTypes = {
  averageHouseholdSegmentProps: PropTypes.object.isRequired,
  totalHouseholdSegmentProps: PropTypes.object.isRequired
}

export default Layout
