import React from 'react'
import PropTypes from 'prop-types'
import {withFormik} from 'formik'
import * as Yup from 'yup'
import pick from 'lodash/pick'
import startCase from 'lodash/startCase'
import {
  Message,
  Button,
  Modal,
  Form
} from 'semantic-ui-react'

import getServerUrl from '../../common/utils/getServerUrl'
import fetchData from '../../common/utils/fetchData'
import handleFetchError from '../../common/utils/handleFetchError'

import FormInput from '../../components/FormInput'
import inputTypes from '../../common/constants/inputTypes'

const {
  TEXT
} = inputTypes

const fields = {
  NEW_LIMIT: 'newLimit'
}

const addKeys = [
  fields.NEW_LIMIT
]

const updateKeys = [
  fields.NEW_LIMIT
]

class UpdateForm extends React.Component {
  static propTypes = {
    electricMeter: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    handleSubmit: PropTypes.func,
    setFieldValue: PropTypes.func,
    setFieldTouched: PropTypes.func,
    errors: PropTypes.object,
    touched: PropTypes.object,
    isSubmitting: PropTypes.bool,
    setStatus: PropTypes.func,
    status: PropTypes.object,
    values: PropTypes.object
  }

  static defaultProps = {
    handleSubmit: () => null,
    setFieldValue: () => null,
    setFieldTouched: () => null,
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
      handleSubmit,
      setStatus
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
      electricMeter,
      loading,
      isSubmitting,
      status,
      disabled,
      errors,
      values,
      touched
    } = this.props

    const {
      submitSuccess,
      error,
      errorMsg
    } = status
    return (
      <Modal trigger={<Button primary>Update Limit</Button>}>
        <Modal.Header>Adjust Electric Meter Limit</Modal.Header>
        <Modal.Content>
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
              <Message error>
                <Message.Header>Something went wrong</Message.Header>
                {errorMsg}
              </Message>
            )
          }
          <Form
            onSubmit={this.handleSubmit}
            loading={loading}
          >
            <p>{`Current Limit: ${electricMeter.billableAmountLimit} PHP`}</p>
            <FormInput
              type={TEXT}
              name="newLimit"
              required
              label={startCase('newLimit')}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={values.newLimit}
              disabled={disabled}
              error={errors.newLimit && touched.newLimit}
              errorMsg={errors.newLimit}
            />
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              primary
            >
              Update Limit
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default withFormik({
  validationSchema: Yup.object().shape({
    [fields.NEW_LIMIT]: Yup.string().required('Required field')
  }),
  mapPropsToValues: (props) => {
    const getInitialValue = (key) => {
      return props.initialFormValues && props.initialFormValues[key]
    }

    return {
      [fields.NEW_LIMIT]: getInitialValue(fields.NEW_LIMIT) || ''
    }
  },
  handleSubmit: (values, formikBag) => {
    let processedValues = {}

    const {
      props,
      setStatus,
      setSubmitting,
      resetForm
    } = formikBag

    const baseURL = `${getServerUrl()}/monthlyConsumptions`
    const createHouseholdUrl = `${baseURL}/update`
    const updateHouseholdUrl = `${baseURL}/update`
    const URL = props.action === 'CREATE'
      ? createHouseholdUrl
      : updateHouseholdUrl

    processedValues = props.action === 'CREATE'
      ? pick(values, addKeys)
      : pick(values, updateKeys)

    processedValues.electricMeterID = props.electricMeter.electricMeterID
    setStatus({
      submitSuccess: false,
      submitError: false,
      submitErrorMsg: null
    })

    fetchData(URL, {
      method: 'POST',
      body: processedValues
    })
      .then((response) => handleFetchError(response))
      .then(() => {
        if (props.action === 'CREATE') {
          resetForm()
        }

        setSubmitting(false)

        setStatus({
          submitSuccess: true,
          error: false,
          errorMsg: null
        })
      })
      .catch((error) => {
        setSubmitting(false)
        setStatus({
          submitSuccess: false,
          error: true,
          errorMsg: error.message
        })
      })
  },
  displayName: 'UpdateForm',
  enableReinitialize: true
})(UpdateForm)
