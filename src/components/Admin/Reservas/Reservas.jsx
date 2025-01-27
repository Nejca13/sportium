'use client'
import SpinnerForm from '@/components/Spinner/SpinnerForm/SpinnerForm'
import styles from './Reservas.module.css'
import { getReservation } from '@/services/reservas/reservas'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const Reservas = () => {
  const [reservations, setReservations] = useState([])

  const obtenerTodasLasReservas = async () => {
    await getReservation()
      .then((res) => {
        if (res.success) {
          console.log(res.data)
          setReservations(res.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    obtenerTodasLasReservas()
  }, [])
  return (
    <div className={styles.container}>
      <label className={styles.input_container}>
        Seleccione fecha
        <input
          type="date"
          name='date'
          id='date'
          placeholder='Fecha'
        />
      </label>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha y horario</th>
            <th>Cancha</th>
            <th>Deporte</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <tr key={index}>
                <td
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <Image
                    src={reservation.user.img}
                    alt={reservation.user.name}
                    width={30}
                    height={30}
                    style={{ borderRadius: '50%' }}
                  />
                  {reservation.user.name} {reservation.user.last_name}
                </td>
                <td>{reservation.date}</td>
                <td
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <Image
                    src={reservation.court.image}
                    alt={reservation.court.name}
                    width={30}
                    height={30}
                  />
                  {reservation.court.name}
                </td>
                <td>{reservation.court.sport_type}</td>
                <td>{reservation.status}</td>
              </tr>
            ))
          ) : (
            <tr className={styles.spinner}>
              <td>
                <SpinnerForm />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Reservas
