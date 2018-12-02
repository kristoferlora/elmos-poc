import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Container,
  Segment,
  Button,
  Divider
} from 'semantic-ui-react'

import {AddHouseholdForm} from '../components'

const {
  Row,
  Column
} = Grid


function Layout({
  addUserCallback
}) {
  /* eslint-disable max-len */
  return (
    <Grid divided stackable>
      <Row>
        <Column width={4}>
          <Container textAlign="left">
            <Segment>
              Here you can add a household which should be connected to a user.
              If the user does not exist, create a user by clicking the button below.
              <Divider />
              <Button
                onClick={addUserCallback}
              >
                Add Household Owner
              </Button>
            </Segment>
          </Container>
        </Column>
        <Column width={12}>
          <AddHouseholdForm />
        </Column>
      </Row>
    </Grid>
  )
}

Layout.propTypes = {
  addUserCallback: PropTypes.func
}

Layout.defaultProps = {
  addUserCallback: () => null
}

export default Layout
