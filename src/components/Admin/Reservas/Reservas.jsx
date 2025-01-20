import SpinnerForm from '@/components/Spinner/SpinnerForm/SpinnerForm'
import styles from './Reservas.module.css'

const Reservas = () => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cancha</th>
            <th>Ubicación</th>
          </tr>
        </thead>
        {/* <tbody>
          {courts.length > 0 ? (
            courts.map((court, index) => (
              <tr key={index}>
                <td>{court.name}</td>
                <td>{court.location}</td>
              </tr>
            ))
          ) : (
            <tr className={styles.spinner}>
              <td>
                <SpinnerForm />
              </td>
            </tr>
          )}
        </tbody> */}
      </table>
    </div>
  )
}

export default Reservas
