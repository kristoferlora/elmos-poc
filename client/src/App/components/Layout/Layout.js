// NPM Packages
import React from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import PropTypes from 'prop-types'

// Common constants
import userTypes from '../../../common/constants/userTypes'

// Routes manifest
import routes from '../../../routes'

// Styled components
import {AppContent} from './styled'

// Internal components
import Navbar from './components/Navbar'
// import AuthGuard from '../AuthGuard'

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

    if (user === ADMIN) {
      return toArray(routesObj)
    }

    return toArray(routesObj).filter((route) => !route.adminOnly)
  }

  return (
    <div className="app">
      <Navbar
        history={history}
        location={location}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        userType={userType}
      />
      <AppContent>
        <Switch>
          {
            // <Redirect
            //   from="/"
            //   to={search.pathname}
            //   exact
            // />
          }
          {getAppRoutes(userType, routes).map((route) => (
            <Route
              key={route.name}
              path={route.pathname}
              component={route.component}
              exact={route.exact}
              // isLoggedIn={isLoggedIn}
              // userType={userType}
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
