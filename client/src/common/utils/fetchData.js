import handleFetchError from './handleFetchError'

const TOKEN_NAME = 'ELMOSToken'

export const authToken = {
  get: () => localStorage.getItem(TOKEN_NAME),
  set: (value) => localStorage.setItem(TOKEN_NAME, value),
  remove: () => localStorage.removeItem(TOKEN_NAME),
  header: {
    headers: {
      authorization: `Token ${localStorage.getItem(TOKEN_NAME)}`
    }
  }
}

export const fetchData = (
  URL,
  config
) => {
  const options = {
    method: 'GET',
    body: null,
    responseType: 'JSON',
    ...config && config
  }
  const {
    method,
    body,
    responseType
  } = options
  const headers = {
    authorization: `Token ${authToken.get()}`
  }
  const fetchConfig = {
    method,
    headers,
    ...!!body && {
      headers: {
        ...headers,
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(body)
    }
  }
  const res = fetch(
    URL,
    fetchConfig
  )
    .then((response) => handleFetchError(response))

  if (method === 'GET' && responseType === 'JSON') {
    return res
      .then((response) => {
        return response.json()
      })
      // for when implementing the response where all response returns {data, token} format
      // .then((responseObj) => responseObj.data)
  }

  if (method === 'GET' && responseType === 'text') {
    return res
      .then((response) => response.text())
      .then((data) => data)
  }

  return res
}

export default fetchData
