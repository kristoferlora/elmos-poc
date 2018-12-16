// NPM packages
import {withFormik} from 'formik'
import * as Yup from 'yup'
import {compose} from 'redux'
import {connect} from 'react-redux'

// Main component
import Login from '../LoginForm'

// User actions
import {userActions} from '../../../services/user'

const USERNAME = 'email'
const USER_PASSWORD = 'password'


const container = compose(
  connect(
    (state) => ({
      isLoggingIn: state.user.isSubmitting,

      // TODO: Remove this if we are ready to implement the `alerts` reducer.
      // TODO: Errors should be displayed in a common Alerts component inside
      //       the layout.
      loginError: state.user.error
    }),
    (dispatch) => ({
      login: (u, p) => dispatch(userActions.loginRequest(u, p))
    })
  ),
  withFormik({
    validationSchema: Yup.object().shape({
      [USERNAME]: Yup.string()
        .required('Email is required.'),
      [USER_PASSWORD]: Yup.string()
        .required('Password is required.')
    }),
    mapPropsToValues: () => {
      return {
        [USERNAME]: '',
        [USER_PASSWORD]: ''
      }
    },
    handleSubmit: (values, formikBag) => {
      formikBag.props.login(
        values[USERNAME],
        values[USER_PASSWORD]
      )
    },
    // Makes it easier to find in React DevTools
    displayName: 'LoginForm',
    enableReinitialize: true
  }),

)(Login)

export default container
