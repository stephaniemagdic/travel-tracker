export const postData = (type, dataObject) => {
  return fetch(`http://localhost:3001/api/v1/${type}`, {
    method: 'POST',
    body: JSON.stringify(dataObject),
    headers: {
      'Content-type': 'application/json'
    }
  })
}

//fetch catch block doesnt catch 404 errors??**
export const fetchData = (endpoint) => {
  return fetch(`http://localhost:3001/api/v1/${endpoint}`)
    .then(response => {
      if (response.status === 404){
        throw new Error(404)
      };
      response.json()
    })
    .then(data => data)
    .catch(err => {
     // check API ... other error handling needs
        // 400- 500 internal server error
        // 400 -sorry our bad, let us get back to you
      console.log(`ERROR with ${endpoint}: ${err}`);
      return err;
    })
}
