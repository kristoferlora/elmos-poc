import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Segment,
  Header,
  Divider
} from 'semantic-ui-react'

import {
  InputText
} from '../../../../components'

const {
  Column,
  Row
} = Grid

function AddHouseholdForm({
  required
}) {
  return (
    <Segment>
      <Header as="h1">Household Information</Header>
      <Divider />
      <Grid divided stackable>
        <Row>
          <Column width={4}>
            <InputText
              name="serialKey"
              required={required}
            />
          </Column>
          <Column width={12}>
            <InputText
              name="address"
              required={required}
            />
          </Column>
        </Row>
        <Row columns={3}>
          <Grid.Column>
            <InputText
              name="owner"
              required={required}
            />
          </Grid.Column>
          <Grid.Column>
            <InputText
              name="consumptionLimit"
            />
          </Grid.Column>
          <Grid.Column>
            <InputText
              name="billingStartDate"
              required={required}
            />
          </Grid.Column>
        </Row>
      </Grid>
    </Segment>
  )
}

AddHouseholdForm.propTypes = {
  required: PropTypes.bool
}

AddHouseholdForm.defaultProps = {
  required: true
}

export default AddHouseholdForm
