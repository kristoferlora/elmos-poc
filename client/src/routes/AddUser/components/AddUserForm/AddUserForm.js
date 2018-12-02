import React from 'react'
import {
  Grid,
  Segment,
  Header,
  Divider
} from 'semantic-ui-react'

import {
  InputText
} from '../../../../components'

import {
  AddHouseholdForm
} from '../../../AddHousehold/components'

const {
  Column,
  Row
} = Grid

function AddUserForm() {
  return (
    <div>
      <Segment>
        <Header as="h1">Personal Information</Header>
        <Divider />
        <Grid divided stackable>
          <Row>
            <Column width={4}>
              <InputText
                name="title"
                required
              />
            </Column>
            <Column width={4}>
              <InputText
                name="firstName"
                required
              />
            </Column>
            <Column width={4}>
              <InputText
                name="middleInitial"
                required
              />
            </Column>
            <Column width={4}>
              <InputText
                name="lastName"
                required
              />
            </Column>
          </Row>
        </Grid>
      </Segment>
      <Segment>
        <Header as="h1">Contact Information</Header>
        <Divider />
        <Grid>
          <Row>
            <Column width={4}>
              <InputText
                name="email"
                required
              />
            </Column>
            <Column width={4}>
              <InputText
                name="phone"
                required
              />
            </Column>
            <Column width={8}>
              <InputText
                name="address"
                required
              />
            </Column>
          </Row>
        </Grid>
      </Segment>
      <Segment>
        <Header as="h1">Emergency Contact</Header>
        <Divider />
        <Grid>
          <Row>
            <Column width={4}>
              <InputText
                name="name"
              />
            </Column>
            <Column width={4}>
              <InputText
                name="phone"
              />
            </Column>
            <Column width={8}>
              <InputText
                name="address"
              />
            </Column>
          </Row>
        </Grid>
      </Segment>
      <AddHouseholdForm required={false} />
    </div>
  )
}

export default AddUserForm
