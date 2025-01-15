'use client'
import { useEffect, useState } from 'react'
import styles from './CourtList.module.css'
import { getCourts } from '@/services/courts/court'

const CourtList = () => {
  const [courts, setCourts] = useState([])

  useEffect(() => {
    getCourts().then((res) => {
      if (res.success) {
        setCourts(res.data)
      }
    })
  }, [])
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courts.length > 0 &&
            courts.map((court) => (
              <tr key={court.id}>
                <td>{court.name}</td>
                <td>{court.location}</td>
                <td>
                  <button>Editar</button>
                  <button>Eliminar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default CourtList
