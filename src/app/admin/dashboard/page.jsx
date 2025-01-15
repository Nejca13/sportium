import CreateCourtForm from '@/components/Admin/Courts/CreateCourtForm/CreateCourtForm'
import styles from './page.module.css'
import CourtList from '@/components/Admin/Courts/CourtsList/CourtList'

const AdminDashboardPage = () => {
  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <div className={styles.content}>
        <div className={styles.divs}>
          <CreateCourtForm />
        </div>
        <div className={styles.divs}>
          <CourtList />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage

/* name: str = Field(..., description="Nombre de la cancha")
sport_type: str = Field(
    ..., description="Tipo de deporte ('futbol', 'padel', etc.')"
)
location: Optional[str] = Field(None, description="Ubicación de la cancha")
is_active: bool = Field(default=True)
image: Optional[str] = Field(None, description="URL de la imagen de la cancha")
price: Optional[int] = Field(None, description="Precio de la cancha") */
