import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Message,
  Button,
  Form
} from 'semantic-ui-react'

import ElectricMeterFields from './ElectricMeterFields'

class ElectricMeterForm extends React.PureComponent {
  static propTypes = {
    action: PropTypes.oneOf([
      'CREATE',
      'EDIT'
    ]),
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    handleSubmit: PropTypes.func,
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
    handleSubmit: () => null,
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
    const props = {
      ...this.props,
      handleBlur: this.handleBlur,
      handleChange: this.handleChange
    }
    const {
      loading,
      isSubmitting,
      status
    } = this.props

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
          <ElectricMeterFields {...props} required />
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

export default ElectricMeterForm
