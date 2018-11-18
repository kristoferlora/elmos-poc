const {
  NODE_ENV,
  REACT_APP_SERVER_BASE_URL_DEV,
  REACT_APP_SERVER_BASE_URL_PROD
} = process.env
const devBaseURL = REACT_APP_SERVER_BASE_URL_DEV
const prodBaseURL = REACT_APP_SERVER_BASE_URL_PROD

function getServerURL() {
  const API = 'api'
  const devURL = `${devBaseURL}/${API}`
  const prodURL = `${prodBaseURL}/${API}`
  const URL = NODE_ENV === 'production'
    ? prodURL
    : devURL

  return URL
}

export function getServerBaseURL() {
  return NODE_ENV === 'production'
    ? prodBaseURL
    : devBaseURL
}

export default getServerURL
