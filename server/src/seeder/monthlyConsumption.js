import faker from 'faker'
import moment from 'moment'
import uuid from 'uuid/v4'


export const createMonthlyConsumption = (electricMeter) => {
  const toDate = moment(electricMeter.billingStartDate)
    .add(1, 'M')
    .format('YYYY-MM-DD')

  return {
    monthlyConsumptionID: uuid(),
    fromDate: electricMeter.billingStartDate,
    toDate,
    consumption: 0,
    billableAmount: 0,
    electricMeterID: electricMeter.electricMeterID,
    isBilled: false,
    sentWarningEmail: false
  }
}
