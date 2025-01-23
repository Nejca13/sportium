'use client'
import Spinner from '@/components/Spinner/Spinner'
import styles from './page.module.css'
import OpenEye from '@/assets/icons/OpenEye'
import CloseEye from '@/assets/icons/CloseEye'
import { useState } from 'react'

const ChangePasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = Object.fromEntries(new FormData(e.target))
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.container_form}>
          <label htmlFor='old-password' id='old-password'>
            Contraseña actual
            <div className={styles.input_container}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='old-password'
                id='old-password'
                placeholder='Contraseña'
                required
                minLength={8}
              />
              <button
                type='button'
                className={styles.togglePassword}
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <OpenEye width='20px' height='20px' />
                ) : (
                  <CloseEye width='20px' height='20px' />
                )}
              </button>
            </div>
          </label>
          <label htmlFor='password' id='password'>
            Nueva contraseña
            <div className={styles.input_container}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                placeholder='Confirmar contraseña'
                required
                minLength={8}
              />
              <button
                type='button'
                className={styles.togglePassword}
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <OpenEye width='20px' height='20px' />
                ) : (
                  <CloseEye width='20px' height='20px' />
                )}
              </button>
            </div>
          </label>

          <label htmlFor='confirm-password' id='confirm-password'>
            Repita contraseña
            <div className={styles.input_container}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='confirm-password'
                id='confirm-password'
                placeholder='Nueva contraseña'
                required
                minLength={8}
              />
              <button
                type='button'
                className={styles.togglePassword}
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <OpenEye width='20px' height='20px' />
                ) : (
                  <CloseEye width='20px' height='20px' />
                )}
              </button>
            </div>
          </label>
          <button type='submit' className={styles.button}>
            {isLoading ? <Spinner /> : 'Cambiar contraseña'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordPage
