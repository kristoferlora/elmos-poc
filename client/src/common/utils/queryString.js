// NPM packages
import qs from 'qs'

const queryString = {
  parse: (input) => qs.parse(input, {ignoreQueryPrefix: true}),
  stringify: (input) => qs.stringify(input)
}

export default queryString
