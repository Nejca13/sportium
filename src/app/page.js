import ButtonWhatsapp from '@/components/ButtonWhatsapp/ButtonWhatsapp'
import Inicio from '../components/Inicio/Inicio'
import styles from './page.module.css'
import Banner from '@/components/Banner/Banner'

export default function Home() {
  return (
    <div className={styles.page}>
      <Inicio />
      <ButtonWhatsapp />
      <Banner />
    </div>
  )
}
