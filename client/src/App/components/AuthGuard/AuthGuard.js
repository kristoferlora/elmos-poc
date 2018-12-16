// NPM packages
import React from 'react'
import PropTypes from 'prop-types'
import {
  Route,
  Redirect
} from 'react-router-dom'

// Shared components
import {LoginForm} from '../../../components'

function AuthGuard({
  path,
  isLoggedIn,
  component,
  onLogin,
  onAuthRedirectTo,
  ...rest
}) {
  return (
    <Route
      path={path}
      render={(routerProps) => {
        if (isLoggedIn) {
          const ComponentToRender = component

          if (!ComponentToRender) {
            return (
              <Redirect
                to={onAuthRedirectTo}
                exact
              />
            )
          }

          return (
            <ComponentToRender
              {...routerProps}
              {...rest}
            />
          )
        }

        return (
          <LoginForm
            {...routerProps}
          />
        )
      }}
      exact
    />
  )
}

AuthGuard.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.any,
  onAuthRedirectTo: PropTypes.string,
  onLoginRedirectTo: PropTypes.string,
  isLoggedIn: PropTypes.bool
}

AuthGuard.defaultProps = {
  component: null,
  onAuthRedirectTo: '/',
  onLoginRedirectTo: null,
  isLoggedIn: false
}

export default AuthGuard
