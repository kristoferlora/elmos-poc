// NPM packages
import React from 'react'
import {
  Container,
  Button,
  Form,
  Message,
  Header,
  Grid
} from 'semantic-ui-react'
import PropTypes from 'prop-types'

// Common constants
import inputTypes from '../../common/constants/inputTypes'

// Shared components
import FormInput from '../FormInput'

const {
  TEXT,
  PASSWORD
} = inputTypes

const USERNAME = 'email'
const USER_PASSWORD = 'password'


class LoginForm extends React.PureComponent {
  static propTypes = {
    // Injected by withFormik HOC
    handleSubmit: PropTypes.func,
    setFieldValue: PropTypes.func,
    setFieldTouched: PropTypes.func,
    values: PropTypes.object,
    isLoggingIn: PropTypes.bool,
    errors: PropTypes.object,
    loginError: PropTypes.any
  }

  static defaultProps = {
    handleSubmit: () => null,
    setFieldValue: () => null,
    setFieldTouched: () => null,
    values: {},
    isLoggingIn: false,
    errors: null,
    loginError: null
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const {
      handleSubmit
    } = this.props

    handleSubmit()
  }

  handleChange = (e, fieldName, value) => {
    const {
      setFieldValue
    } = this.props

    setFieldValue(fieldName, value)
  }

  handleBlur(fieldName) {
    const {
      setFieldTouched
    } = this.props

    setFieldTouched(fieldName)
  }

  render() {
    const {
      values,
      errors,
      isLoggingIn,
      loginError
    } = this.props

    const userNameError = errors && errors[USERNAME]
    const passwordError = errors && errors[USER_PASSWORD]

    return (
      <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
          <Container textAlign="left">
            <Header as="h2">
              ELMOS
              <Header.Subheader>
                Electricity Monitoring System
              </Header.Subheader>
            </Header>
            {loginError && (
              <Message negative>
                <Message.Header>Something went wrong.</Message.Header>
                <p>{loginError}</p>
              </Message>
            )}

            <Form
              onSubmit={this.handleSubmit}
            >
              <FormInput
                label="Email"
                type={TEXT}
                name={USERNAME}
                onChange={this.handleChange}
                value={values[USERNAME]}
                error={!!userNameError}
                errorMsg={userNameError}
              />
              <FormInput
                label="Password"
                type={PASSWORD}
                name={USER_PASSWORD}
                onChange={this.handleChange}
                value={values[USER_PASSWORD]}
                error={!!passwordError}
                errorMsg={passwordError}
              />
              <Button
                key="submit"
                type="submit"
                loading={isLoggingIn}
                disabled={isLoggingIn}
                primary
              >
                Login
              </Button>
            </Form>
          </Container>
        </Grid.Column>
      </Grid>
    )
  }
}
export default LoginForm
