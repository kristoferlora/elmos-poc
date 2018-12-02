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
    dashboard,
    households,
    addHousehold,
    addUser,
    users
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
      <Menu.Item
        as={Link}
        to={households.pathname}
        active={matchesCurrentPath(households.pathname)}
      >
        Households
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={addHousehold.pathname}
        active={matchesCurrentPath(addHousehold.pathname)}
      >
        Add Household
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={users.pathname}
        active={matchesCurrentPath(users.pathname)}
      >
        Users
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={addUser.pathname}
        active={matchesCurrentPath(addUser.pathname)}
      >
        Add User
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
