import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Button,
  Container,
  Message
} from 'semantic-ui-react'

import UserFields from './UserFields'

class UserForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    action: PropTypes.oneOf([
      'CREATE',
      'EDIT'
    ]),
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    setFieldValue: PropTypes.func,
    setFieldTouched: PropTypes.func,
    resetForm: PropTypes.func,
    errors: PropTypes.object,
    touched: PropTypes.object,
    isSubmitting: PropTypes.bool,
    setStatus: PropTypes.func,
    status: PropTypes.object,
    values: PropTypes.object
  }

  static defaultProps = {
    action: 'CREATE',
    setFieldValue: () => null,
    setFieldTouched: () => null,
    resetForm: () => null,
    errors: {},
    touched: {},
    values: {},
    loading: false,
    disabled: false,
    isSubmitting: false,
    setStatus: () => null,
    status: {}
  }

  handleSubmit = async (e) => {
    const {
      setStatus,
      handleSubmit
    } = this.props

    e.preventDefault()

    setStatus({
      submitSuccess: false,
      error: false,
      errorMsg: null
    })

    handleSubmit()
  }

  handleBlur = (fieldName) => {
    const {
      setFieldTouched
    } = this.props

    setFieldTouched(fieldName)
  }

  handleChange = (e, fieldName, value) => {
    const {
      setFieldValue
    } = this.props

    setFieldValue(fieldName, value)
  }

  render() {
    const {
      loading,
      handleSubmit,
      isSubmitting,
      status,
      ...rest
    } = this.props

    const props = {
      isSubmitting,
      ...rest
    }

    const {
      submitSuccess,
      error,
      errorMsg
    } = status
    return (
      <React.Fragment>
        {
          submitSuccess
          && (
            <Message positive>
              Successfully Saved
            </Message>
          )
        }
        {
          error
          && (
            <Message negative>
              <Message.Header>
                Something went wrong
              </Message.Header>
              <p>{errorMsg}</p>
            </Message>
          )
        }
        <Form
          onSubmit={this.handleSubmit}
          loading={loading}
        >
          <UserFields {...props} />
          <Container
            textAlign="right"
            fluid
          >
            <Button
              key="submit"
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              primary
            >
              Save
            </Button>
          </Container>
        </Form>
      </React.Fragment>
    )
  }
}

export default UserForm
