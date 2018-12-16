import {withFormik} from 'formik'
import {compose} from 'redux'
import * as Yup from 'yup'
import pick from 'lodash/pick'
import moment from 'moment'

import getServerUrl from '../../common/utils/getServerUrl'
import fetchData from '../../common/utils/fetchData'
import handleFetchError from '../../common/utils/handleFetchError'

import UserForm from './UserForm'

const TITLE = 'title'
const FIRST_NAME = 'firstName'
const LAST_NAME = 'lastName'
const MIDDLE_INITIAL = 'middleInitial'
const EMAIL = 'email'
const PHONE = 'phone'
const PERMANENT_ADDRESS = 'permanentAddress'
const ADDRESS = 'address'
const SERIAL_KEY = 'serialKey'
const CONSUMPTION_LIMIT = 'consumptionLimit'
const BILLING_START_DATE = 'billingStartDate'

const addKeys = [
  TITLE,
  FIRST_NAME,
  LAST_NAME,
  MIDDLE_INITIAL,
  EMAIL,
  PHONE,
  PERMANENT_ADDRESS,
  ADDRESS,
  SERIAL_KEY,
  CONSUMPTION_LIMIT,
  BILLING_START_DATE
] // eslint-disable-line max-len
const updateKeys = [CONSUMPTION_LIMIT]

const container = compose(
  withFormik({
    validationSchema: Yup.object().shape({
      [TITLE]: Yup.string().required('Required field'),
      [FIRST_NAME]: Yup.string().required('Required field'),
      [LAST_NAME]: Yup.string().required('Required field'),
      [MIDDLE_INITIAL]: Yup.string().required('Required field'),
      [EMAIL]: Yup.string().required('Required field'),
      [PHONE]: Yup.string().required('Required field'),
      [PERMANENT_ADDRESS]: Yup.string().required('Required field')
    }),
    mapPropsToValues: (props) => {
      const getInitialValue = (key) => {
        return props.initialFormValues && props.initialFormValues[key]
      }

      return {
        [ADDRESS]: getInitialValue(ADDRESS) || '',
        [FIRST_NAME]: getInitialValue(FIRST_NAME) || '',
        [LAST_NAME]: getInitialValue(LAST_NAME) || '',
        [MIDDLE_INITIAL]: getInitialValue(MIDDLE_INITIAL) || '',
        [EMAIL]: getInitialValue(EMAIL) || '',
        [PHONE]: getInitialValue(PHONE) || '',
        [PERMANENT_ADDRESS]: getInitialValue(PERMANENT_ADDRESS) || '',
        [TITLE]: getInitialValue(TITLE) || '',
        [SERIAL_KEY]: getInitialValue(SERIAL_KEY) || '',
        [CONSUMPTION_LIMIT]: getInitialValue(CONSUMPTION_LIMIT) || 0,
        [BILLING_START_DATE]: getInitialValue(BILLING_START_DATE) || moment().format('YYYY-MM-DD') // eslint-disable-line max-len
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
      const baseURL = `${getServerUrl()}/users`
      const createUrl = `${baseURL}/create`
      const updateUrl = `${baseURL}/update/${props.id}`
      const URL = props.action === 'CREATE'
        ? createUrl
        : updateUrl

      processedValues = props.action === 'CREATE'
        ? pick(values, addKeys)
        : pick(values, updateKeys)

      processedValues.type = 'User' // defaults to type user
      processedValues.password = 'password'

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
    displayName: 'UserForm',
    enableReinitialize: true
  })
)(UserForm)

export default container
