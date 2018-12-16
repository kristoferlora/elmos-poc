/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Container,
  Segment,
  Divider,
  Grid
} from 'semantic-ui-react'

import fetchData from '../../common/utils/fetchData'
import getServerURL from '../../common/utils/getServerUrl'

import UpdateForm from './UpdateForm'

class ElectricMeter extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  state = {
    loading: false,
    data: null
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const electricMeterID = match.params.id
    this.setState({
      loading: true
    }, async () => {
      const URL = `${getServerURL()}/monthlyConsumptions/get`
      const options = {
        method: 'POST',
        body: {
          electricMeterID
        }
      }
      try {
        const data = await fetchData(URL, options).then((response) => {
          return response.json()
        })
        this.setState({
          data
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.setState({
          loading: false
        })
      }
    })
  }

  render() {
    const {
      loading,
      data
    } = this.state
    if (loading) {
      return <p>Loading...</p>
    }
    if (data) {
      console.log(data)
      const {
        electricMeter,
        monthlyConsumptions
      } = data
      return (
        <Container fluid>
          <Segment>
            <p>Electric Meter: {electricMeter.address}</p>
            <p>Bill Limit: {electricMeter.billableAmountLimit} PHP</p>
            <UpdateForm electricMeter={electricMeter} />
            <Divider />
            {monthlyConsumptions.map((bill) => {
              const from = moment(bill.fromDate).format('MMM DD, YYYY')
              const to = moment(bill.toDate).format('MMM DD, YYYY')
              const month = moment(bill.fromDate).format('MMMM')
              return (
                <React.Fragment key={bill.monthlyConsumptionID}>
                  <Grid stackable divided columns={4}>
                    <Grid.Column>
                      <p>{month} billing</p>
                    </Grid.Column>
                    <Grid.Column>
                      <p>{from} - {to}</p>
                    </Grid.Column>
                    <Grid.Column>
                      <p>Consumption: {bill.consumption} KWH</p>
                    </Grid.Column>
                    <Grid.Column>
                      <p>Balance: {bill.billableAmount} PHP</p>
                    </Grid.Column>
                  </Grid>
                  <Divider />
                </React.Fragment>
              )
            })}
          </Segment>
        </Container>
      )
    }
    return (
      <p>Electric Meter Page</p>
    )
  }
}

export default ElectricMeter
