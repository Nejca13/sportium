import { Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar/Navbar'
import ButtonWhatsapp from '@/components/ButtonWhatsapp/ButtonWhatsapp'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://sportium.vercel.app/'),
  title: 'Sportium - Alquiler de Canchas de Fútbol y Pádel',
  description:
    'Sportium te ofrece las mejores canchas de fútbol y pádel para que disfrutes de tus partidos y eventos. Reserva fácil y rápida, con disponibilidad garantizada.',
  keywords:
    'Sportium, canchas de fútbol, canchas de pádel, alquiler de canchas, reserva de canchas, partidos de fútbol, partidos de pádel, entrenamiento, canchas disponibles, alquiler en línea, eventos deportivos, fútbol, pádel',
  author: 'Sportium',
  openGraph: {
    title: 'Sportium - Alquiler de Canchas de Fútbol y Pádel',
    description:
      'Descubre y reserva las mejores canchas de fútbol y pádel en tu zona. Servicio confiable para partidos, entrenamientos y eventos.',
    images: 'https://sportium.vercel.app/image.jpeg',
    url: 'https://sportium.vercel.app/',
    type: 'website',
    site_name: 'Sportium',
  },
  alternates: {
    canonical: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sportium - Reserva de Canchas de Fútbol y Pádel',
    description:
      'En Sportium encuentras canchas de fútbol y pádel de calidad. Reserva online rápido y sencillo para disfrutar de tus partidos.',
    images: 'https://sportium.vercel.app/image.jpeg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <body className={` ${montserrat.className}`}>
        <Navbar />
        {children}
        {/* <ButtonWhatsapp /> */}
      </body>
    </html>
  )
}
