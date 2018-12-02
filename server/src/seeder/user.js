/*
 * @module seeder/user
 * For seeding database with test data
 */
import faker from 'faker'
import {hashPassword} from '../utils'

export function createAdminUser(db) {
  const user = {
    recordTypeID: db.RecordType.User.ADMIN,
    username: 'kristofer_lora',
    password: hashPassword('password1'),
    firstName: 'kristofer',
    lastName: 'lora'
  }
  return user
}

export function createHouseholdUser(db) {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`
  const user = {
    recordTypeID: db.RecordType.User.USER,
    username,
    firstName,
    lastName,
    password: hashPassword('password2')
  }
  return user
}
