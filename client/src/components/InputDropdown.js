// NPM packages
import React from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown
} from 'semantic-ui-react'

// Common constant
import inputTypes from '../common/constants/inputTypes'

const {
  DROPDOWN,
  DROPDOWN_SEARCH
} = inputTypes

function InputDropdown({
  placeholder,
  options,
  name,
  onChange,
  onBlur,
  value,
  disabled,
  type,
  autoComplete
}) {
  const handleChange = (e, data, inputName) => {
    const inputValue = data.value

    onChange(e, inputName, inputValue)
  }

  return (
    <Dropdown
      placeholder={placeholder}
      options={options}
      onChange={(e, data) => handleChange(e, data, name)}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
      search={type === DROPDOWN_SEARCH}
      onFocus={(e) => e.target.setAttribute('autocomplete', autoComplete)}
      fluid
      selection
    />
  )
}

InputDropdown.propTypes = {
  type: PropTypes.oneOf([
    DROPDOWN,
    DROPDOWN_SEARCH
  ]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.any,
      key: PropTypes.string
    })
  ),
  onBlur: PropTypes.func,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string
}

InputDropdown.defaultProps = {
  placeholder: null,
  options: [],
  onBlur: () => null,
  value: null,
  disabled: false,
  /**
   * The value below disables autocomplete. Google Chrome does not recognize
   * autocomplete="off" so assign an invalid value to the attribute.
   * https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
   */
  autoComplete: 'nope'
}

export default InputDropdown
