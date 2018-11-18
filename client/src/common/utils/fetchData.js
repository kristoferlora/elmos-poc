import handleFetchError from './handleFetchError'

export default function fetchData(
  URL,
  config
) {
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
  // const headers = {
  //   authorization: `Token ${authToken.get()}`
  // }
  const fetchConfig = {
    method,
    // headers,
    ...!!body && {
      headers: {
        // ...headers,
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
      .then((response) => response.json())
      .then((responseObj) => responseObj.data)
  }

  if (method === 'GET' && responseType === 'text') {
    return res
      .then((response) => response.text())
      .then((data) => data)
  }

  return res
}
