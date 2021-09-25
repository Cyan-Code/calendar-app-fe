const baseURL = process.env.REACT_APP_API_URL

const fetchSinToken = ( endPoint, data, method='GET' ) => {
  const url = `${ baseURL }/${ endPoint }`
  if(method === 'GET') {
    return fetch(url)
  } else {
    return fetch( url, {
      method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify( data )
    })
  }
}

export {
  fetchSinToken
}

