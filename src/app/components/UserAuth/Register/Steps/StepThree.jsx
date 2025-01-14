import Image from 'next/image'
import styles from './../Register.module.css'
import checket from '@/app/assets/images/checket.gif'
import Link from 'next/link'

const StepThree = () => {
  return (
    <div className={styles.endStep}>
      <Image src={checket} alt='checket' width={400} height={400} />
      <div className={styles.text}>
        <h3>¡Registro exitoso!</h3>
        <p>Ya puedes iniciar sesión</p>
        <Link href={'/login'}>Iniciar Sesión</Link>
      </div>
    </div>
  )
}

export default StepThree
