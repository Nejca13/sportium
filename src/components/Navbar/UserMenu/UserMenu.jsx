'use client'
import { useState } from 'react'
import styles from './UserMenu.module.css'
import Menu from '@/assets/icons/Menu'
import Link from 'next/link'

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => setShowMenu(!showMenu)
  return (
    <div className={styles.user}>
      <div className={styles.menu_button_user}>
        <button aria-label='menu' onClick={toggleMenu}>
          <Menu width='40px' height='40px' />
        </button>
      </div>
      <ul className={` ${styles.user_list} ${showMenu ? styles.show : ''}`}>
        <li>
          <Link href='/login' className={styles.login_button}>
            Hacer reservas
          </Link>
        </li>
        <li>
          <Link href='/register' className={styles.login_button}>
            Mis reservas
          </Link>
        </li>
        <li>
          <button>Cerrar sesión</button>
        </li>
      </ul>
    </div>
  )
}

export default UserMenu
