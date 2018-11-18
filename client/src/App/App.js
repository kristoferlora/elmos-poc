// NPM packages
import React from 'react'
import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom'
import PropTypes from 'prop-types'

// Common constants
import userTypes from '../common/constants/userTypes'

// Common utilities
// import {authToken} from '../common/utils/auth'

// Internal components
// import AuthGuard from './components/AuthGuard'
import Layout from './components/Layout'

const {
  ADMIN,
  USER
} = userTypes

class App extends React.PureComponent {
  static propTypes = {
    // Injected by withRouterHOC
    history: PropTypes.object,
    // Injected via react-redux
    isLoggedIn: PropTypes.bool,
    userType: PropTypes.oneOf([
      ADMIN,
      USER,
      null
    ]),
    loginCheck: PropTypes.func,
    logout: PropTypes.func
  }

  static defaultProps = {
    history: {},
    isLoggedIn: false,
    userType: USER,
    loginCheck: () => null,
    logout: () => null
  }

  // componentWillMount() {
  //   const {
  //     loginCheck
  //   } = this.props
  //   const token = authToken.get()

  //   if (token) {
  //     loginCheck(token)
  //   }
  // }

  logout = () => {
    const {
      logout,
      history: {
        push
      }
    } = this.props

    logout()

    push('/login')
  }

  render() {
    const {
      isLoggedIn,
      userType,
      name
    } = this.props

    return (
      <Switch>
        {
          /* <AuthGuard
          path="/login"
          isLoggedIn={isLoggedIn}
          exact
          /> */
        }
        <Route
          children={(routerProps) => { // eslint-disable-line react/no-children-prop
            return (
              <Layout
                isLoggedIn={isLoggedIn}
                userType={userType}
                name={name}
                onLogout={this.logout}
                {...routerProps}
              />
            )
          }}
        />
      </Switch>
    )
  }
}

export default withRouter(App)
