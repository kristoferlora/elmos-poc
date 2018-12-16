import React from 'react'
import PropTypes from 'prop-types'
import kebabCase from 'lodash/kebabCase'

import {
  Input
} from 'semantic-ui-react'

// Common constant
import inputTypes from '../common/constants/inputTypes'

const {
  TEXT,
  PASSWORD,
  NUMBER
} = inputTypes

const types = {
  [TEXT]: 'text',
  [NUMBER]: 'text',
  [PASSWORD]: 'password'
}

const toFloat = (value) => {
  return Number.isNaN(value) || !value ? 0 : Number.parseFloat(value)
}

function InputText({
  name,
  onChange,
  autoComplete,
  value,
  disabled,
  placeholder,
  onBlur,
  onKeyPress,
  asString,
  type
}) {
  const handleChange = (e, fieldName) => {
    let newValue = e.target.value

    if (type === NUMBER) {
      const cleansedValue = newValue.replace(/[^0-9]/g, '')
      const inputValue = asString
        ? cleansedValue.toString()
        : toFloat(cleansedValue)
      newValue = inputValue
    }

    onChange(e, fieldName, newValue)
  }

  const onHandleChange = (e) => {
    handleChange(e, name)
  }

  const handleBlur = () => {
    onBlur(name)
  }

  return (
    <Input
      type={types[type]}
      id={kebabCase(name)}
      autoComplete={autoComplete}
      name={name}
      value={value}
      onChange={onHandleChange}
      onBlur={handleBlur}
      onKeyPress={onKeyPress}
      disabled={disabled}
      placeholder={placeholder}
    />
  )
}

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  type: PropTypes.oneOf([
    TEXT,
    PASSWORD,
    NUMBER
  ]),
  value: PropTypes.any,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onKeyPress: PropTypes.func,
  asString: PropTypes.bool
}

InputText.defaultProps = {
  autoComplete: 'nope',
  type: TEXT,
  value: '',
  disabled: false,
  placeholder: null,
  onBlur: () => null,
  onKeyPress: () => null,
  asString: false
}

export default InputText
