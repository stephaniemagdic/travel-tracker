export const postData = (type, dataObject) => {
  return fetch(`http://localhost:3001/api/v1/${type}`, {
    method: 'POST',
    body: JSON.stringify(dataObject),
    headers: {
      'Content-type': 'application/json'
    }
  })
}