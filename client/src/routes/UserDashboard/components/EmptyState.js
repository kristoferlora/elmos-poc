import React from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash/isFunction'

import {
  Segment,
  Divider,
  Button
} from 'semantic-ui-react'

function EmptyState({
  message,
  callback,
  callbackText
}) {
  return (
    <Segment textAlign="center">
      {message}
      <Divider />
      {
        callback
        && isFunction(callback)
        && (
          <Button onClick={callback}>
            {callbackText}
          </Button>
        )
      }
    </Segment>
  )
}

EmptyState.propTypes = {
  message: PropTypes.any,
  callback: PropTypes.func,
  callbackText: PropTypes.string
}

EmptyState.defaultProps = {
  message: 'No data available',
  callback: null,
  callbackText: null
}

export default EmptyState
