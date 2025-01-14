export const register = async (data) => {
  //recibo data como obj pero el backend espera un formdata

  const formData = new FormData() //creo formdata vacio
  formData.append(
    'user',
    JSON.stringify({
      name: data.name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
      password: data.password,
      preferred_sports: data.preferred_sports,
    })
  )
  formData.append('image', data.img)

  const options = {
    method: 'POST',
    body: formData,
  }

  try {
    const response = await fetch('/api/users/', options)

    if (!response.ok) {
      const error = await response.json()
      console.log('Error response:', error)
      return { success: false, message: error.detail || 'Unknown error' }
    }

    const data = await response.json()
    console.log('Success response:', data)
    return { success: true, data }
  } catch (error) {
    console.log(error)
    return { success: false, message: error }
  }
}
