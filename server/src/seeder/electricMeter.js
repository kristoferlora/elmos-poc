/*
 * @module seeder/electricMeter
 * For seeding database with test data
 */
import uuid from 'uuid/v4'
import faker from 'faker'
import moment from 'moment'

export function createElectricMeter(User) {
  const electricMeter = {
    electricMeterID: uuid(),
    serialKey: faker.random.alphaNumeric(12),
    address: User.permanentAddress,
    totalConsumption: 0,
    userID: User.userID,
    billingStartDate: moment().format('YYYY-MM-DD'),
    billableAmountLimit: 200
  }
  return electricMeter
}
