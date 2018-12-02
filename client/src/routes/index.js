import Dashboard from './Dashboard'
import AddHousehold from './AddHousehold'
import Households from './Households'
import AddUser from './AddUser'
import Users from './Users'

const routes = {
  dashboard: {
    pathname: '/',
    name: 'dashboard',
    component: Dashboard,
    exact: true
  },
  addHousehold: {
    pathname: '/add-household',
    name: 'add-household',
    component: AddHousehold
  },
  households: {
    pathname: '/households',
    name: 'households',
    component: Households
  },
  users: {
    pathname: '/users',
    name: 'users',
    component: Users
  },
  addUser: {
    pathname: '/add-user',
    name: 'add-user',
    component: AddUser
  }
}

export default routes
