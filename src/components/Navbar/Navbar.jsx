'use client'
import Link from 'next/link'
import styles from './Navbar.module.css'
import Facebook from '@/assets/icons/Facebook'
import Instagram from '@/assets/icons/Instagram'
import Whatsapp from '@/assets/icons/Whatsapp'
import logo from '@/assets/images/logos/Recurso 15_052734.png'
import Image from 'next/image'
import Menu from '@/assets/icons/Menu'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import User from './User/User'
import useStore from '@/app/store'
import UserMenu from './UserMenu/UserMenu'

const Navbar = () => {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)
  const { currentUser } = useStore()
  const menuRef = useRef(null)

  const toggleMenu = () => setShowMenu(!showMenu)

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false)
    }
  }

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  if (
    pathname === '/register' ||
    pathname === '/login' ||
    pathname.includes('pago')
  ) {
    return null
  }

  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        <div className={styles.content_banner}>
          <Link
            href='https://wa.me/5491166344522'
            target='_blank'
            className={styles.whatsapp}
          >
            <i>
              <Whatsapp width='20px' height='20px' />
            </i>
            +54 9 3543 57-9562
          </Link>

          <div className={styles.social}>
            <Link href='/'>
              <i>
                <Facebook />
              </i>
            </Link>
            <Link href='/'>
              <i>
                <Instagram />
              </i>
            </Link>
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        {currentUser ? (
          <User />
        ) : (
          <div className={styles.logo}>
            <Image src={logo} alt='logo' width={100} height={100} />
          </div>
        )}
        {currentUser ? (
          <UserMenu />
        ) : (
          <>
            <div
              ref={menuRef}
              className={`${styles.login} ${showMenu ? styles.show : ''}`}
            >
              {pathname !== '/' && (
                <Link
                  href='/'
                  onClick={toggleMenu}
                  className={styles.login_button}
                >
                  Inicio
                </Link>
              )}
              <Link
                href='/register'
                onClick={toggleMenu}
                className={styles.login_button}
              >
                Registrarse
              </Link>
              <Link
                href='/login'
                onClick={toggleMenu}
                className={styles.login_button}
              >
                Iniciar sesión
              </Link>
            </div>

            <div className={styles.menu_button}>
              <button aria-label='menu' onClick={toggleMenu}>
                <Menu width='40px' height='40px' />
              </button>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
