// NPM packages
import React from 'react'
import PropTypes from 'prop-types'
import {
  Menu,
  Button
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

// Common constants
// import userTypes from '../../../../../common/constants/userTypes'

// Routes manifest
import routes from '../../../../../routes'

// Styled components
import {Nav} from './styled'
// const {
//   ADMIN
// } = userTypes

function Navbar({
  location,
  isLoggedIn,
  onLogout,
  // userType,
  name
}) {
  const {
    pathname
  } = location
  const {
    dashboard
  } = routes
  const matchesCurrentPath = (currentPathname) => {
    return pathname === currentPathname
  }
  const logout = () => {
    onLogout()
  }
  return (
    <Nav>
      <Menu.Item header>
        ELMOS
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={dashboard.pathname}
        active={matchesCurrentPath(dashboard.pathname)}
      >
        Dashboard
      </Menu.Item>
      {
        isLoggedIn && (
          <Menu.Menu position="right">
            {name && (
              <Menu.Item>
                {name}
              </Menu.Item>
            )}
            <Menu.Item>
              <Button onClick={logout}>Logout</Button>
            </Menu.Item>
          </Menu.Menu>
        )
      }
    </Nav>
  )
}

Navbar.propTypes = {
  // Component props
  location: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
  // userType: PropTypes.string,
  // Injected by react-redux
  name: PropTypes.string
  // leadCount: PropTypes.number
}

Navbar.defaultProps = {
  isLoggedIn: false,
  //   userType: null,
  name: null
  //   leadCount: null
}

export default Navbar
