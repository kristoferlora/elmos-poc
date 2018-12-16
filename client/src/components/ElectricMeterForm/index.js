import {withFormik} from 'formik'
import * as Yup from 'yup'
import pick from 'lodash/pick'
import {compose} from 'redux'
import moment from 'moment'

import getServerUrl from '../../common/utils/getServerUrl'
import fetchData from '../../common/utils/fetchData'
import handleFetchError from '../../common/utils/handleFetchError'

import ElectricMeterForm from './ElectricMeterForm'


const ADDRESS = 'address'
const USER = 'user'
const SERIAL_KEY = 'serialKey'
const BILLABLE_AMOUNT_LIMIT = 'billableAmountLimit'
const BILLING_START_DATE = 'billingStartDate'

const addKeys = [ADDRESS, USER, SERIAL_KEY, BILLABLE_AMOUNT_LIMIT, BILLING_START_DATE] // eslint-disable-line max-len
const updateKeys = [USER, BILLABLE_AMOUNT_LIMIT]


const container = compose(
  withFormik({
    validationSchema: Yup.object().shape({
      [ADDRESS]: Yup.string().required('Required field'),
      [USER]: Yup.string().required('Required field'),
      [SERIAL_KEY]: Yup.string().required('Required field'),
      [BILLABLE_AMOUNT_LIMIT]: Yup.number().required('Required field'),
      [BILLING_START_DATE]: Yup.string().required('Required field')
    }),
    mapPropsToValues: (props) => {
      const getInitialValue = (key) => {
        return props.initialFormValues && props.initialFormValues[key]
      }

      return {
        [ADDRESS]: getInitialValue(ADDRESS) || '',
        [USER]: getInitialValue(USER) || '',
        [SERIAL_KEY]: getInitialValue(SERIAL_KEY) || '',
        [BILLABLE_AMOUNT_LIMIT]: getInitialValue(BILLABLE_AMOUNT_LIMIT) || 0,
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
      const baseURL = `${getServerUrl()}/electricMeters`
      const createHouseholdUrl = `${baseURL}/create`
      const updateHouseholdUrl = `${baseURL}/update/${props.id}`
      const URL = props.action === 'CREATE'
        ? createHouseholdUrl
        : updateHouseholdUrl

      processedValues = props.action === 'CREATE'
        ? pick(values, addKeys)
        : pick(values, updateKeys)

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
    displayName: 'ElectricMeterForm',
    enableReinitialize: true
  })
)(ElectricMeterForm)

export default container
