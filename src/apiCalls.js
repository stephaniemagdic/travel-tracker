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
      return err;
    })
}

export const checkForErrors = (res) => {
  if (!res.ok || res.message === "No traveler found with an id of NaN") {
    throw new Error(`${res}`);
  } else {
    return res.json();
  }
}
