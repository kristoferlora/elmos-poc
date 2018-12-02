import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Segment
} from 'semantic-ui-react'

import {EmptyState} from '../../../components'

function Layout({
  households,
  loadingHouseholds,
  addHouseholdCallback
}) {
  if (loadingHouseholds) {
    return (
      <p>loading...</p>
    )
  }
  if (!households || households.length < 1) {
    return (
      <EmptyState
        message="No households"
        callback={addHouseholdCallback}
        callbackText="Add household"
      />
    )
  }
  return (
    <Container>
      <Segment>
        HOuseholds
      </Segment>
    </Container>
  )
}

Layout.propTypes = {
  households: PropTypes.array,
  loadingHouseholds: PropTypes.bool,
  // refetchHouseholds: PropTypes.func,
  addHouseholdCallback: PropTypes.func
}

Layout.defaultProps = {
  households: [],
  loadingHouseholds: false,
  // refetchHouseholds: () => null,
  addHouseholdCallback: () => null
}

export default Layout
