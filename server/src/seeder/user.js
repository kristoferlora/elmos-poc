/*
 * @module seeder/user
 * For seeding database with test data
 */
import faker from 'faker'
import {hashPassword} from '../utils'

export function createAdminUser(db) {
  const user = {
    recordTypeID: db.RecordType.User.ADMIN,
    password: hashPassword('password1'),
    firstName: 'kristofer',
    lastName: 'lora',
    email: 'kristofer.lora@gmail.com'
  }
  return user
}

export function createHouseholdUser(db) {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@test.com`
  const user = {
    recordTypeID: db.RecordType.User.USER,
    email,
    firstName,
    lastName,
    password: hashPassword('password2')
  }
  return user
}
