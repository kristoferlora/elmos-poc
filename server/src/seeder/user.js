/*
 * @module seeder/user
 * For seeding database with test data
 */
import faker from 'faker'
import uuid from 'uuid/v4'
import {hashPassword} from '../utils'

export function createAdminUser(db) {
  const user = {
    recordTypeID: db.RecordType.User.ADMIN,
    password: hashPassword('password1'),
    firstName: 'kristofer',
    lastName: 'lora',
    email: 'kristofer.lora@gmail.com',
    permanentAddress: [faker.address.streetAddress(), faker.address.city(), faker.address.country(), faker.address.zipCode()].join(' '),
    phone: faker.phone.phoneNumberFormat(1),
    mobilePhone: faker.phone.phoneNumberFormat(0)
  }
  return user
}

export function createHouseholdUser(db) {
  const userID = uuid()
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@test.com`
  const user = {
    userID,
    email,
    firstName,
    lastName,
    recordTypeID: db.RecordType.User.USER,
    password: hashPassword('password2'),
    permanentAddress: [faker.address.streetAddress(), faker.address.city(), faker.address.country(), faker.address.zipCode()].join(' '),
    phone: faker.phone.phoneNumberFormat(1),
    mobilePhone: faker.phone.phoneNumberFormat(0)
  }
  return user
}
