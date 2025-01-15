'use client'
import { createCourt } from '@/services/courts/court'
import styles from './CreateCourtForm.module.css'

const CreateCourtForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))

    await createCourt(formData)
      .then((response) => {
        console.log('Cancha creada:', response)
      })
      .catch((error) => {
        console.error('Error al crear la cancha:', error)
      })
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor='name'>
        Nombre de la cancha
        <input required type='text' name='name' id='name' />
      </label>
      <label htmlFor='image'>
        Imagen de la cancha
        <input
          required
          type='file'
          name='image'
          id='image'
          accept='image/jpeg, image/png, image/webp, image/jpg'
        />
      </label>
      <label htmlFor='sport_type'>
        Tipo de deporte
        <select name='sport_type' id='sport_type' required>
          <option value='futbol'>Fútbol</option>
          <option value='padel'>Pádel</option>
        </select>
      </label>
      <label htmlFor='location'>
        Ubicación
        <input required type='text' name='location' id='location' />
      </label>
      <label htmlFor='price'>
        Precio
        <input required type='number' name='price' id='price' />
      </label>
      <button type='submit'>Crear</button>
    </form>
  )
}

export default CreateCourtForm
