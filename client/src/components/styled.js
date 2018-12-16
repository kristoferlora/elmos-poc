import styled from 'styled-components'

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

InputWrapper.displayName = 'InputWrapper'

export {
  InputWrapper
}
