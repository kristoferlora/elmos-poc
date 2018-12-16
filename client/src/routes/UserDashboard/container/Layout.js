import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
  Grid,
  Container,
  Segment,
  Divider,
  Header,
  Button
} from 'semantic-ui-react'
import {
  GaugeSegment
} from '../components'

const month = moment().format('MMM')

function Layout({
  averageHouseholdSegmentProps,
  totalHouseholdSegmentProps
}) {
  return (
    <Grid divided stackable>
      <Grid.Row>
        <Grid.Column width={4}>
          <Container fluid textAlign="center">
            <GaugeSegment
              {...averageHouseholdSegmentProps}
            />
            <GaugeSegment
              {...totalHouseholdSegmentProps}
            />
          </Container>
        </Grid.Column>
        <Grid.Column width={12}>
          <Container fluid>
            <Segment>
              <Header as="h3">My Prepaid Settings</Header>
              <Divider />
              <p>
                <span>Name:&nbsp;</span>
                George Canterbury
              </p>

              <p>
                <span>Permanent Address:&nbsp;</span>
                Lot 3, 5th Avenue, Fortune Homes, Lanang, Davao City
              </p>

              <p>
                <span>Email:&nbsp;</span>
                george.canterbury@gmail.com
              </p>

              <p>
                <span>Phone Number:&nbsp;</span>
                (876) 998-8765
              </p>

              <p>
                <span>Global Consumption Limit:&nbsp;</span>
                2000 PHP
              </p>

              <p>
                <span>
                  {`Current Consumption Limit for ${month}:`}
                </span>
                &nbsp;2000 PHP
              </p>

              <p>
                <span>
                  Current PHP/kWH:
                </span>
                &nbsp;5.35 PHP
              </p>
            </Segment>
            <Segment>
              <Header as="h3">My Payables</Header>
              <Divider />
            </Segment>
            <Button
              primary
            >
              Add Load
            </Button>
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
