// NPM packages
import {connect} from 'react-redux'

// Main component
import Navbar from '../Navbar'

const container = connect(
  (state) => ({
    name: state.user.name
  })
)(Navbar)

export default container
