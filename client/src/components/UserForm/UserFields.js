import React from 'react'
import PropTypes from 'prop-types'
import startCase from 'lodash/startCase'
import {
  Grid,
  Segment,
  Header,
  Divider
} from 'semantic-ui-react'

import FormInput from '../FormInput'
import inputTypes from '../../common/constants/inputTypes'

const {
  Column,
  Row
} = Grid

const {
  TEXT
} = inputTypes

function UserFields({
  handleBlur,
  handleChange,
  values,
  disabled,
  errors,
  touched
}) {
  const getField = (fieldName, type, required = false, options) => {
    return (
      <FormInput
        type={type}
        name={fieldName}
        required={required}
        label={startCase(fieldName)}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[fieldName]}
        disabled={disabled}
        error={errors[fieldName] && touched[fieldName]}
        errorMsg={errors[fieldName]}
        options={options}
      />
    )
  }
  // const options = [
  //   {text: 'MS.', key: 'MS.', value: 'MS.'},
  //   {text: 'MR.', key: 'MR.', value: 'MR.'},
  //   {text: 'MRS.', key: 'MRS.', value: 'MRS.'}
  // ]
  return (
    <React.Fragment>
      <Segment>
        <Header as="h1">Personal Information</Header>
        <Divider />
        <Grid divided stackable>
          <Row>
            <Column width={4}>
              {getField('title', TEXT, true)}
            </Column>
            <Column width={4}>
              {getField('firstName', TEXT, true)}
            </Column>
            <Column width={4}>
              {getField('middleInitial', TEXT, true)}
            </Column>
            <Column width={4}>
              {getField('lastName', TEXT, true)}
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
              {getField('email', TEXT, true)}
            </Column>
            <Column width={4}>
              {getField('phone', TEXT, true)}
            </Column>
            <Column width={8}>
              {getField('permanentAddress', TEXT, true)}
            </Column>
          </Row>
        </Grid>
      </Segment>
    </React.Fragment>
  )
}

UserFields.propTypes = {
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  values: PropTypes.object,
  disabled: PropTypes.bool,
  errors: PropTypes.object,
  touched: PropTypes.object
}

UserFields.defaultProps = {
  handleBlur: () => null,
  handleChange: () => null,
  errors: {},
  touched: {},
  values: {},
  disabled: false
}

export default UserFields
