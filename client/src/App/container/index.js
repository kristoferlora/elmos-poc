// NPM packages
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

// User actions
import {userActions} from '../../services/user'

// Main component
import App from '../App'

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  userType: state.user.type
})

const mapDispatchToProps = (dispatch) => ({
  loginCheck: (token) => dispatch(userActions.loginCheck(token)),
  logout: () => dispatch(userActions.logoutRequest())
})

const container = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
)

export default container
