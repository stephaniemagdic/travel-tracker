export const postData = (type, dataObject) => {
  return fetch('http://localhost:3001/api/v1/${}/${}' , {
    method: 'POST',
    body: JSON.stringify(dataObject),
    headers: {
      'Content-type': 'application/json'
    }
  })
}