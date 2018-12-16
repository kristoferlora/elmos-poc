// NPM packages
import React from 'react'
import PropTypes from 'prop-types'
import {
  Menu,
  Button
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

// Routes manifest
import routes from '../../../../../routes'

// Styled components
import {Nav} from './styled'

class Navbar extends React.Component {
  state = {
    showMenu: false
  }

  getMenuContent = () => {
    const {
      location,
      isLoggedIn,
      small,
      login
    } = this.props
    const {
      pathname
    } = location
    const {
      electricMeter,
      addElectricMeter,
      addUser,
      users
    } = routes

    if (isLoggedIn) {
      if (small) {
        return (
          <Menu.Menu position="right">
            <Menu.Item>
              <Button
                type="button"
                onClick={this.toggleMenu}
              >
                Menu
              </Button>
            </Menu.Item>
          </Menu.Menu>
        )
      }
      return (
        <React.Fragment>
          <Menu.Item
            as={Link}
            to={electricMeter.pathname}
            active={this.matchesCurrentPath(pathname, electricMeter.pathname)}
          >
            Electric Meters
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={addElectricMeter.pathname}
            active={
              this.matchesCurrentPath(pathname, addElectricMeter.pathname)
            }
          >
            Add Electric Meter
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={users.pathname}
            active={this.matchesCurrentPath(pathname, users.pathname)}
          >
            Users
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={addUser.pathname}
            active={this.matchesCurrentPath(pathname, addUser.pathname)}
          >
            Add User
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button onClick={this.logout}>Logout</Button>
            </Menu.Item>
          </Menu.Menu>
        </React.Fragment>
      )
    }
    return (
      <Menu.Menu position="right">
        <Menu.Item>
          <Button onClick={login}>Login</Button>
        </Menu.Item>
      </Menu.Menu>
    )
  }

  onClick = () => {
    this.setState({
      showMenu: false
    })
  }

  getVerticalMenu = () => {
    const {
      electricMeter,
      addElectricMeter,
      addUser,
      users
    } = routes
    return (
      <Nav vertical>
        <Menu.Item
          as={Link}
          to={electricMeter.pathname}
          onClick={this.onClick}
        >
          Electric Meters
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={addElectricMeter.pathname}
          onClick={this.onClick}
        >
          Add Electric Meter
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={users.pathname}
          onClick={this.onClick}
        >
          Users
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={addUser.pathname}
          onClick={this.onClick}
        >
          Add User
        </Menu.Item>
        <Menu.Item>
          <Button onClick={this.logout}>Logout</Button>
        </Menu.Item>
      </Nav>
    )
  }

  matchesCurrentPath = (pathname, currentPathname) => {
    return pathname === currentPathname
  }

  toggleMenu = () => {
    const {showMenu} = this.state
    this.setState({
      showMenu: !showMenu
    })
  }

  logout = () => {
    const {
      onLogout
    } = this.props
    this.setState({
      showMenu: false
    })
    onLogout()
  }

  home = () => {
    const {
      history
    } = this.props
    history.push('/')
  }

  render() {
    const {
      small
    } = this.props
    const {
      showMenu
    } = this.state

    return (
      <React.Fragment>
        <Nav>
          <Menu.Item
            header
            onClick={this.home}
          >
            ELMOS
          </Menu.Item>
          {this.getMenuContent()}
        </Nav>
        {small && showMenu && this.getVerticalMenu()}
      </React.Fragment>
    )
  }
}

Navbar.propTypes = {
  // Component props
  location: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
  // Injected by react-redux
  // name: PropTypes.string,
  login: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  small: PropTypes.bool
}

Navbar.defaultProps = {
  isLoggedIn: false,
  // name: null,
  login: () => null,
  history: {
    push: () => null
  },
  small: false
}

export default Navbar
