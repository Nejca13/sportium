import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from './../Register.module.css'
import checket from '@/assets/images/checket.gif'
import Alert from '@/assets/icons/Alert'

const StepThree = () => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className={styles.endStep}>
      <Image src={checket} alt='checket' width={400} height={400} />
      <div className={styles.text}>
        <h3>¡Registro exitoso!</h3>
        <div className={styles.info}>
          <span>
            <Alert />
            Activa tu cuenta
          </span>
          <p>
            Revisa tu bandeja de entrada o carpeta de spam para activar tu
            cuenta. ¡Haz clic en el enlace de confirmación y listo!
          </p>
        </div>
      </div>
    </div>
  )
}

export default StepThree
