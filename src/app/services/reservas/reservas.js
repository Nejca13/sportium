const API_URL = '/api/reservation/'

export const createReservation = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  await fetch(API_URL + 'create-reservation/', options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      console.log('Finalizo el fetch de createReservation')
    })
}
