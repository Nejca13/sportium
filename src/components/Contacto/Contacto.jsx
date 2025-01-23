'use client'
import Email from '@/assets/icons/Email'
import styles from './Contacto.module.css'
import dynamic from 'next/dynamic'
import Location from '@/assets/icons/Location'
import Whatsapp from '@/assets/icons/Whatsapp'
import Link from 'next/link'

const MapComponent = dynamic(() => import('./MapComponent/MapComponent'), {
  ssr: false,
})

const infoBanner = [
  {
    info: 'hernancarrazan33@gmail.com',
    icon: <Email width='25px' height='25px' color='var(--green)' />,
    href: 'mailto:hernancarrazan33@gmail.com',
  },
  {
    info: 'Av San Juan 3183, CABA',
    icon: <Location width='25px' height='25px' color='var(--green)' />,
    href: 'https://www.google.com/maps?q=Av+San+Juan+3183,+CABA',
  },
  {
    info: '+541166344522',
    icon: <Whatsapp width='25px' height='25px' color='var(--green)' />,
    href: 'https://wa.me/+541166344522',
  },
]

const Contacto = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Contactanos</h2>
      </div>
      <div className={styles.content}>
        <form action=''>
          <label htmlFor='nombre' id='nombre'>
            <input type='text' name='name' id='name' placeholder='Nombre' />
          </label>
          <label htmlFor='email' id='email'>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Correo electrónico'
            />
          </label>
          <label htmlFor='asunto' id='asunto'>
            <input type='text' name='asunto' id='asunto' placeholder='Asunto' />
          </label>
          <label htmlFor='nombre' id='nombre'>
            <textarea name='message' id='' placeholder='Mensaje'></textarea>
          </label>
          <button>Enviar</button>
        </form>
        <div className={styles.info}>
          <h3>Información de Contacto</h3>
          <p>
            No dudes en ponerte en contacto con nosotros, estamos a tu
            disposición para ayudarte en todo lo que necesites.
          </p>
          <div className={styles.info_contacto}>
            {infoBanner.map((info, index) => (
              <div key={index} className={styles.info_contacto_item}>
                {info.icon}
                <Link href={info.href}>{info.info}</Link>
              </div>
            ))}
          </div>
          <MapComponent />
        </div>
      </div>
    </div>
  )
}

export default Contacto
