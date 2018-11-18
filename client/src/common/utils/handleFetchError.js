async function handleFetchError(response) {
  const {
    ok,
    status,
    statusText
  } = response

  if (!ok) {
    const data = await response.json()

    throw Error(`Status ${data.status || status} - ${data.message || statusText}`) // eslint-disable-line max-len
  } else {
    return response
  }
}

export default handleFetchError
