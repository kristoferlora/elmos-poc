import React from 'react'
import PropTypes from 'prop-types'

import {
  Grid,
  Container,
  Segment,
  Button,
  Divider
} from 'semantic-ui-react'

import {
  AddUserForm
} from '../components'

function Layout({
  addHouseholdCallback
}) {
  return (
    <Grid divided stackable>
      <Grid.Row>
        <Grid.Column width={4}>
          <Container textAlign="left">
            <Segment>
              Here you can add a user, with his/her first household (optional).
              If you need to add a household to a user, click here.
              <Divider />
              <Button
                onClick={addHouseholdCallback}
              >
                Add Household
              </Button>
            </Segment>
          </Container>
        </Grid.Column>
        <Grid.Column width={12}>
          <AddUserForm />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

Layout.propTypes = {
  addHouseholdCallback: PropTypes.func
}

Layout.defaultProps = {
  addHouseholdCallback: () => null
}

export default Layout
