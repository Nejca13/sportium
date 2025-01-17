'use client'
import { useEffect, useState } from 'react'
import styles from './Login.module.css'
import OpenEye from '@/assets/icons/OpenEye'
import CloseEye from '@/assets/icons/CloseEye'
import Link from 'next/link'
import { login } from '@/services/login/login'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/Spinner/Spinner'
import useStore from '@/app/store'
import imagen_logo from '@/assets/images/logos/Recurso 14_023535.png'
import Image from 'next/image'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { currentUser, setCurrentUser } = useStore()

  const router = useRouter()

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    const formData = Object.fromEntries(new FormData(e.target))

    await login(formData)
      .then((response) => {
        if (response.success) {
          setCurrentUser(response.data)
          router.push('/')
        } else {
          setErrorMessage(response.message.detail)
        }
      })
      .catch((error) => {
        setErrorMessage('Error al iniciar sesión:', error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    if (currentUser) {
      router.push('/')
    }
  }, [currentUser, router])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.container_form}>
          <Image src={imagen_logo} alt='logo' width={200} height={200} />
          <form onSubmit={onSubmit}>
            <label htmlFor='username' id='username'>
              Correo Electrónico
              <input
                type='email'
                name='username'
                id='username'
                placeholder='Correo Electrónico'
                required
                autoComplete='email'
              />
            </label>
            <label htmlFor='password' id='password'>
              Contraseña
              <div className={styles.input_container}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  placeholder='Contraseña'
                  required
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
              {isLoading ? <Spinner /> : 'Ingresar'}
            </button>
            {errorMessage && (
              <small className={styles.error}>{errorMessage}</small>
            )}
          </form>
          <Link href={'/register'} className={styles.link}>
            ¿No tienes una cuenta? Registrarse
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
