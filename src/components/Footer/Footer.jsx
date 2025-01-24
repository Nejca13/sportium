'use client'
import Image from 'next/image'
import styles from './Footer.module.css'
import logo from '@/assets/images/logos/Recurso 13_023532.png'
import Link from 'next/link'
import Email from '@/assets/icons/Email'
import Facebook from '@/assets/icons/Facebook'
import Instagram from '@/assets/icons/Instagram'
import Whatsapp from '@/assets/icons/Whatsapp'
import Mobile from '@/assets/icons/Mobile'
import Location from '@/assets/icons/Location'
import Clock from '@/assets/icons/Clock'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.full_content}>
        <div className={styles.content_list}>
          <div className={styles.logo}>
            <Image src={logo} alt='logo' width={100} height={100} style={{borderRadius:'50%'}}/>
            <div className={styles.text}>
              <h3>Sportium</h3>
              <span>Canchas de futbol y padel </span>
            </div>
          </div>
          <div className={styles.list}>
            <h5>Información</h5>
            <ul>
              <Link href='https://wa.me/+541166344522' target='_blank'>
                <li>
                  <Mobile color='white' />
                  +541166344522
                </li>
              </Link>
              <Link href='mailto:hernancarrazan33@gmail.com' target='_blank'>
                <li>
                  <Email color='white' />
                  sportium@gmail.com
                </li>
              </Link>
              <Link
                href='https://www.google.com/maps/place/Juan+B.+Justo+130,+Isidro+Casanova'
                target='_blank'
              >
                <li>
                  <Location color='white' />
                  Av. san juan 3183, CABA.
                </li>
              </Link>
              <li>
                <Clock color='white' />
                <p>LUN-DOM: 9:00 AM - 00:00 PM</p>
              </li>
            </ul>
          </div>
          <div className={styles.social}>
            <h5>Redes Sociales</h5>
            <div className={styles.social_list}>
              <Link
                href='https://www.facebook.com/profile.php?id=100089499019169'
                target='_blank'
              >
                <span>
                  <Facebook color='white' />
                </span>
              </Link>
              <Link
                href='https://www.instagram.com/cerrajeriadelvalle33_'
                target='_blank'
              >
                <span>
                  <Instagram color='white' />
                </span>
              </Link>
              <Link href='https://wa.me/+541166344522' target='_blank'>
                <span>
                  <Whatsapp color='white' />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.copyright}>
          <p>© 2025, Todos los derechos reservados Sportium.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer