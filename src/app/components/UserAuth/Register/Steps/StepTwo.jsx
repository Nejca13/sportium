'use client'
import { useState } from 'react'
import styles from './../Register.module.css'
import useStore from '@/app/store'
import { register } from '@/app/services/register/register'

const StepTwo = ({ setStep }) => {
  const [preferredSports, setPreferredSports] = useState([])
  const { currentForm, setCurrentForm } = useStore()
  const { clearCurrentForm } = useStore.getState()
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target

    if (checked) {
      setPreferredSports((prev) => [...prev, name])
    } else {
      setPreferredSports((prev) => prev.filter((sport) => sport !== name))
    }
  }

  console.log(preferredSports)

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))
    if (formData.password !== formData['confirm-password']) {
      alert('Las contraseñas no coinciden')
      return
    }

    delete formData.padel
    delete formData.futbol
    formData.preferred_sports = preferredSports

    let data = { ...currentForm, ...formData }
    setCurrentForm(data)

    await register(data)
      .then((response) => {
        if (response.success) {
          console.log(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='phone_number' id='phone_number'>
        Teléfono
        <input
          type='tel'
          name='phone_number'
          id='phone_number'
          placeholder='Ingrese su número de teléfono'
          required
        />
      </label>
      <label htmlFor='password' id='password'>
        Contraseña
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Contraseña'
          required
        />
      </label>
      <label htmlFor='confirm-password' id='confirm-password'>
        Contraseña
        <input
          type='password'
          name='confirm-password'
          id='confirm-password'
          placeholder='Confirmar contraseña'
          required
        />
      </label>
      <span>Seleccione deporte (opcional)</span>
      <div className={styles.checkbox}>
        <label>
          Pádel
          <input
            type='checkbox'
            name='padel'
            id='padel'
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Fútbol
          <input
            type='checkbox'
            name='futbol'
            id='futbol'
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <div className={styles.button}>
        <button type='submit'>Registrarse</button>
        <button
          onClick={(e) => {
            e.preventDefault()
            clearCurrentForm()
            setStep(1)
          }}
        >
          Volver
        </button>
      </div>
    </form>
  )
}

export default StepTwo
