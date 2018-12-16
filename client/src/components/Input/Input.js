// NPM packages
import React from 'react'
import PropTypes from 'prop-types'

// Common constants
import inputTypes from '../../common/constants/inputTypes'

// Internal components
import InputText from '../InputText'
import InputDropdown from '../InputDropdown'
// import InputDate from './components/InputDate'
// import InputDateRange from './components/InputDateRange'
// import InputTextArea from './components/InputTextArea'

const {
  TEXT,
  PASSWORD,
  NUMBER,
  NUMBER_STEPPER,
  DROPDOWN
//   DROPDOWN_SEARCH,
//   DATE,
//   DATE_RANGE,
//   TEXT_AREA
} = inputTypes

function Input({
  type,
  name,
  onChange, // Callback must return React synthetic event, name, and value
  onBlur,
  value,
  disabled,
  ...rest
}) {
  const commonProps = {
    type,
    name,
    onChange,
    onBlur,
    value,
    disabled
  }
  const fieldInputComponents = {
    [TEXT]: InputText,
    [PASSWORD]: InputText,
    [NUMBER]: InputText,
    [NUMBER_STEPPER]: InputText,
    [DROPDOWN]: InputDropdown
    // [DROPDOWN_SEARCH]: InputDropdown,
    // [DATE]: InputDate,
    // [DATE_RANGE]: InputDateRange,
    // [TEXT_AREA]: InputTextArea
  }
  const ComponentToRender = fieldInputComponents[type]

  return (
    <ComponentToRender
      {...commonProps}
      {...rest}
    />
  )
}

Input.propTypes = {
  type: PropTypes.oneOf(
    Object.keys(inputTypes).map((key) => inputTypes[key])
  ).isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.any,
  disabled: PropTypes.bool
}

Input.defaultProps = {
  name: null,
  onChange: () => null,
  onBlur: () => null,
  value: null,
  disabled: false
}

export default Input
