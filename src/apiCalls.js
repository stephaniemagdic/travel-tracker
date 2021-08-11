export const postData = (type, dataObject) => {
  return fetch(`http://localhost:3001/api/v1/${type}`, {
    method: 'POST',
    body: JSON.stringify(dataObject),
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export const fetchData = (endpoint) => {
  return fetch(`http://localhost:3001/api/v1/${endpoint}`)
    .then(response => {
      return response.json()
    })
    .then(data => data)
    .catch(err => {
      console.log(`ERROR with ${endpoint}: ${err}`);
      return err;
    })
}
