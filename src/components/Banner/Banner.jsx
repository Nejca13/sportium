import Image from 'next/image'
import styles from './Banner.module.css'
import pelota_banner from '@/assets/images/pelota_banner.png'

const Banner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Tu Partido, Tu Lugar</h2>
        <p>
          Encuentra y reserva fácilmente canchas de fútbol y pádel en Argentina.
          Horarios flexibles, espacios de calidad y todo listo para que
          disfrutes tu juego.
        </p>
      </div>
    </div>
  )
}

export default Banner
