'use client'
import Link from 'next/link'
import styles from './Navbar.module.css'
import Facebook from '@/app/assets/icons/Facebook'
import Instagram from '@/app/assets/icons/Instagram'
import Whatsapp from '@/app/assets/icons/Whatsapp'
import logo from '@/app/assets/images/logos/Recurso 15_052734.png'
import Image from 'next/image'
import Menu from '@/app/assets/icons/Menu'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  if (pathname === '/register' || pathname === '/login') {
    return null
  }

  return (
    !pathname.includes('admin') && (
      <header className={styles.header}>
        <div className={styles.banner}>
          <div className={styles.content_banner}>
            <Link href={'/'} className={styles.whatsapp}>
              <i>
                <Whatsapp width='20px' height='20px' />
              </i>
              +54 9 3543 57-9562
            </Link>

            <div className={styles.social}>
              <Link href={'/'}>
                <i>
                  <Facebook />
                </i>
              </Link>
              <Link href={'/'}>
                <i>
                  <Instagram />
                </i>
              </Link>
            </div>
          </div>
        </div>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Image src={logo} alt='logo' width={100} height={100} />
          </div>

          <div className={`${styles.login} ${showMenu ? styles.show : ''}`}>
            <Link href={'/register'} className={styles.login_button}>
              Registrarse
            </Link>
            <Link href={'/login'} className={styles.login_button}>
              Iniciar sesión
            </Link>
          </div>
          <div className={styles.menu_button}>
            <button aria-label='menu' onClick={() => setShowMenu(!showMenu)}>
              <Menu />
            </button>
          </div>
        </nav>
      </header>
    )
  )
}

export default Navbar
