import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Container,
  Segment,
  Button,
  Divider
} from 'semantic-ui-react'

import {ElectricMeterForm} from '../../../components'

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
              Here you can add an electric meter which should be connected to a user.
              If the owner does not exist, create the owner by clicking the button below.
              <Divider />
              <Button
                onClick={addUserCallback}
              >
                Add Owner
              </Button>
            </Segment>
          </Container>
        </Column>
        <Column width={12}>
          <ElectricMeterForm action="CREATE" />
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
