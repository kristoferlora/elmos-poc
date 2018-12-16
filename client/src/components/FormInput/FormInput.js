// NPM packages
import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Message
} from 'semantic-ui-react'

// Shared components
import Input from '../Input'

function FormInput({
  required,
  size,
  label,
  error,
  errorMsg,
  ...rest
}) {
  return (
    <Form.Field
      required={required}
      width={size}
    >
      <label>{label}</label>
      <Input {...rest} />
      {
        error
        && (
          <Message
            size="small"
            color="yellow"
          >
            <p>{errorMsg}</p>
          </Message>
        )
      }
    </Form.Field>
  )
}

FormInput.propTypes = {
  required: PropTypes.bool,
  size: PropTypes.number,
  label: PropTypes.string,
  error: PropTypes.bool,
  errorMsg: PropTypes.string
}

FormInput.defaultProps = {
  required: false,
  size: null,
  label: null,
  error: false,
  errorMsg: null
}

export default FormInput
