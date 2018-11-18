import React from 'react'
import PropTypes from 'prop-types'
import {RadialGauge} from 'react-canvas-gauges'

import {
  Segment,
  Header
} from 'semantic-ui-react'

function GaugeSegment({
  radialGaugeProps,
  title
}) {
  return (
    <Segment>
      <p>
        <b>
          {title}
        </b>
      </p>
      <RadialGauge {...radialGaugeProps} />
      <div className="center-absolute" style={{bottom: '60px'}}>
        <Header as="h2">
          {radialGaugeProps.value}
        </Header>
      </div>
    </Segment>
  )
}

GaugeSegment.propTypes = {
  radialGaugeProps: PropTypes.object.isRequired
}

export default GaugeSegment
