import ButtonWhatsapp from '@/components/ButtonWhatsapp/ButtonWhatsapp'
import Inicio from '../components/Inicio/Inicio'
import styles from './page.module.css'
import Marcas from '@/components/Marcas/Marcas'
import Banner from '@/components/Banner/Banner'
import SobreNosotros from '@/components/SobreNosotros/SobreNosotros'
import Contacto from '@/components/Contacto/Contacto'

export default function Home() {
  return (
    <div className={styles.page}>
      <Inicio />
      <ButtonWhatsapp />
      <Marcas />
      <Banner />
      <SobreNosotros />
      {/* <Contacto /> */}
    </div>
  )
}
