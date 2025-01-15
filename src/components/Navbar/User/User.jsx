import useStore from '@/app/store'
import styles from './User.module.css'
import Image from 'next/image'

const UserSettings = () => {
  const { currentUser } = useStore()

  return (
    <div className={styles.user}>
      <div className={styles.avatar}>
        <Image
          src={currentUser?.user?.img}
          alt='avatar'
          width={100}
          height={100}
        />
        <div className={styles.info_user}>
          <span>
            {currentUser?.user?.name} {currentUser?.user?.last_name}
          </span>
          <p>{currentUser?.user?.email}</p>
        </div>
      </div>
    </div>
  )
}

export default UserSettings
