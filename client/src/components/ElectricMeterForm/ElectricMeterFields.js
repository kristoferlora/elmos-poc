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

function ElectricMeterFields({
  required,
  handleBlur,
  handleChange,
  values,
  disabled,
  errors,
  touched
}) {
  const getField = (fieldName, type) => {
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
      />
    )
  }
  return (
    <Segment>
      <Header as="h1">Household Information</Header>
      <Divider />
      <Grid divided stackable>
        <Row>
          <Column width={4}>
            {getField('serialKey', TEXT)}
          </Column>
          <Column width={12}>
            {getField('address', TEXT)}
          </Column>
        </Row>
        <Row columns={3}>
          <Grid.Column>
            {getField('user', TEXT)}
          </Grid.Column>
          <Grid.Column>
            {getField('billableAmountLimit', TEXT)}
          </Grid.Column>
          <Grid.Column>
            {getField('billingStartDate', TEXT)}
          </Grid.Column>
        </Row>
      </Grid>
    </Segment>
  )
}

ElectricMeterFields.propTypes = {
  required: PropTypes.bool,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  values: PropTypes.object,
  disabled: PropTypes.bool,
  errors: PropTypes.object,
  touched: PropTypes.object
}

ElectricMeterFields.defaultProps = {
  required: true,
  handleBlur: () => null,
  handleChange: () => null,
  errors: {},
  touched: {},
  values: {},
  disabled: false
}

export default ElectricMeterFields
