// NPM packages
import {connect} from 'react-redux'

// Main component
import Navbar from '../Navbar'

const mapStateToProps = (state) => {
  return {
    name: state.user.name,
    type: state.user.type,
    small: state.viewport.small
  }
}

const container = connect(
  mapStateToProps
)(Navbar)

export default container
