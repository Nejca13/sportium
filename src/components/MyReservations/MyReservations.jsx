'use client'
import { useEffect, useState } from 'react'
import styles from './MyReservations.module.css'
import useStore from '@/app/store'
import { getReservationById } from '@/services/reservas/reservas'
import Image from 'next/image'

const MyReservations = () => {
  const [activeButton, setActiveButton] = useState('pending')
  const [reservations, setReservations] = useState([])

  const { currentUser } = useStore()

  const reservacionesPorId = async (user_id) => {
    await getReservationById(user_id)
      .then((response) => {
        if (response.success) {
          setReservations(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (currentUser) {
      reservacionesPorId(currentUser.user.id)
    }
  }, [])

  // Filtrar reservas según el estado activo
  const filteredReservations = reservations.filter(
    (reservation) => reservation.status === activeButton
  )

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Mis Reservas</h2>
        <div className={styles.control_buttons}>
          <button
            onClick={() => setActiveButton('pending')}
            className={`${styles.button} ${activeButton === 'pending' ? styles.active : ''}`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setActiveButton('approved')}
            className={`${styles.button} ${activeButton === 'approved' ? styles.active : ''}`}
          >
            Pagadas
          </button>
        </div>

        <div className={styles.container_reservations}>
          {filteredReservations.map((reservation, index) => (
            <div className={styles.reservation} key={index}>
              <h3>{reservation.court.name}</h3>
              <div className={styles.info_reservation}>
                <Image
                  src={reservation.court.image}
                  alt={reservation.court.name}
                  width={200}
                  height={200}
                />

                <div className={styles.info}>
                  <p>
                    <strong>Tipo de deporte:</strong>{' '}
                    {reservation.court.sport_type.charAt(0).toUpperCase() +
                      reservation.court.sport_type.slice(1)}
                  </p>
                  <p>
                    <strong>Ubicación:</strong> {reservation.court.location}
                  </p>
                  <p>
                    <strong>Fecha y Hora:</strong>{' '}
                    {new Date(reservation.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                    ,{' '}
                    {new Date(reservation.date).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p>
                    <strong>Duración del turno:</strong> {reservation.duration}{' '}
                    min
                  </p>
                  <p
                    style={{
                      color:
                        reservation.status === 'pending'
                          ? '#EAB308'
                          : 'var(--green)',
                      fontWeight: 'semibold',
                    }}
                  >
                    <strong>Estado de pago:</strong>{' '}
                    {reservation.status.charAt(0).toUpperCase() +
                      reservation.status.slice(1)}
                  </p>
                  <p>
                    <strong>Precio total:</strong> $
                    {reservation.court.price.toLocaleString()}
                  </p>
                </div>

                <div className={styles.info_reservation}>
                  {reservation.status === 'pending' ? (
                    <>
                      <button>Pagar</button>
                      <button>Cancelar</button>
                    </>
                  ) : (
                    <button className={styles.detail_button}>Detalles</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyReservations
