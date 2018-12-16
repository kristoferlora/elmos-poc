// NPM Packages
import React from 'react'
import PropTypes from 'prop-types'
import {
  Switch,
  Route
} from 'react-router-dom'

// Common constants
import userTypes from '../../../common/constants/userTypes'

// Routes manifest
import routes from '../../../routes'

// Styled components
import {AppContent} from './styled'

// Internal components
import Navbar from './components/Navbar'

const {
  ADMIN
} = userTypes

function Layout({
  history,
  location,
  isLoggedIn,
  onLogout,
  userType
}) {
  // const {search} = routes
  const getAppRoutes = (user, routesObj) => {
    const toArray = (obj) => Object.keys(obj).map((key) => obj[key])

    if (user.toUpperCase() === ADMIN.toUpperCase()) {
      return toArray(routesObj)
    }

    return toArray(routesObj).filter((route) => route.public)
  }

  const login = () => {
    history.push('/login')
  }

  return (
    <div className="app">
      <Navbar
        history={history}
        location={location}
        isLoggedIn={isLoggedIn}
        login={login}
        onLogout={onLogout}
        userType={userType}
      />
      <AppContent>
        <Switch>
          {getAppRoutes(userType, routes).map((route) => (
            <Route
              key={route.name}
              path={route.pathname}
              component={route.component}
              exact={route.exact}
              isLoggedIn={isLoggedIn}
              userType={userType}
            />
          ))}
        </Switch>
      </AppContent>
    </div>
  )
}

Layout.propTypes = {
  // Component props
  onLogout: PropTypes.func.isRequired,
  // Injected by App component
  isLoggedIn: PropTypes.bool.isRequired,
  userType: PropTypes.string,
  history: PropTypes.object,
  location: PropTypes.object
}

Layout.defaultProps = {
  history: {},
  location: {},
  userType: null
}

export default Layout
