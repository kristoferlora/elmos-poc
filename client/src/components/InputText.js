import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'
import kebabCase from 'lodash/kebabCase'
import startCase from 'lodash/startCase'

import {
  Label,
  Input
} from 'semantic-ui-react'

const InputWrapper = styled.div`
  div.ui.label {
    display: block;
    width: fit-content;
    background: none;
    color: white;
    padding-left: 0;
  }
  span {
    margin-left: 0.5rem;
    color: orange;
  }

  div.ui.input {
    width: 100%;
  }
`

function InputText({
  name,
  secured,
  value,
  error,
  required
}) {
  const type = secured ? 'text' : 'password'
  return (
    <InputWrapper error={!isEmpty(error)}>
      <Label
        htmlFor={name}
      >
        {startCase(name)}
        {
          required
          && (
            <span>*</span>
          )
        }
      </Label>
      <Input
        id={kebabCase(name)}
        name={name}
        type={type}
        value={value}
      />
      {
        !isEmpty(error)
        && (
          <p>Invalid input</p>
        )
      }
    </InputWrapper>
  )
}

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  secured: PropTypes.bool,
  value: PropTypes.any,
  error: PropTypes.string,
  required: PropTypes.bool
}

InputText.defaultProps = {
  secured: false,
  value: '',
  error: null,
  required: false
}

export default InputText
