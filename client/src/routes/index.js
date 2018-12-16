import Dashboard from './Dashboard'
import AddElectricMeter from './AddElectricMeter'
import Households from './Households'
import AddUser from './AddUser'
import Users from './Users'
import UserDashboard from './UserDashboard'
import ElectricMeter from './ElectricMeter'

const routes = {
  dashboard: {
    pathname: '/',
    name: 'dashboard',
    component: Dashboard,
    exact: true
  },
  addElectricMeter: {
    pathname: '/add-electric-meter',
    name: 'add-electric-meter',
    component: AddElectricMeter
  },
  electricMeter: {
    pathname: '/electric-meter',
    name: 'electric-meter',
    component: Households,
    exact: true
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
  },
  userDashboard: {
    pathname: '/my-dashboard',
    name: 'user-dashboard',
    component: UserDashboard
  },
  viewElectricMeter: {
    pathname: '/electric-meter/:id',
    name: 'view-electric-meter',
    component: ElectricMeter
  }
}

export default routes
