"use client";
import CreateCourtForm from "@/components/Admin/Courts/CreateCourtForm/CreateCourtForm";
import styles from "./page.module.css";
import CourtList from "@/components/Admin/Courts/CourtsList/CourtList";
import { getCourts } from "@/services/courts/court";
import { useEffect, useState } from "react";
import Reservas from "@/components/Admin/Reservas/Reservas";
import useStore from "@/app/store";
import { useRouter } from "next/navigation";

const AdminDashboardPage = () => {
  const [courts, setCourts] = useState([]);
  const [activeButton, setActiveButton] = useState("Canchas");
  const { currentUser } = useStore();

  const router = useRouter();

  const obtenerCanchas = async () => {
    getCourts().then((res) => {
      if (res.success) {
        setCourts(res.data);
      }
    });
  };

  useEffect(() => {
    obtenerCanchas();
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (currentUser?.user?.role !== "admin") {
        router.push("/");
      }
    }
  }, [currentUser]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Panel de Administración</h2>
        <div className={styles.control_buttons}>
          <button
            onClick={() => setActiveButton("Canchas")}
            className={`${styles.button} ${activeButton === "Canchas" ? styles.active : ""}`}
          >
            Canchas
          </button>
          <button
            onClick={() => setActiveButton("Reservas")}
            className={`${styles.button} ${activeButton === "Reservas" ? styles.active : ""}`}
          >
            Reservas
          </button>
        </div>
        <div className={styles.control}>
          {activeButton === "Canchas" && (
            <CreateCourtForm obtenerCanchas={obtenerCanchas} />
          )}
          {activeButton === "Canchas" && (
            <CourtList courts={courts} obtenerCanchas={obtenerCanchas} />
          )}
          {activeButton === "Reservas" && <Reservas />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

/* name: str = Field(..., description="Nombre de la cancha")
sport_type: str = Field(
    ..., description="Tipo de deporte ('futbol', 'padel', etc.')"
)
location: Optional[str] = Field(None, description="Ubicación de la cancha")
is_active: bool = Field(default=True)
image: Optional[str] = Field(None, description="URL de la imagen de la cancha")
price: Optional[int] = Field(None, description="Precio de la cancha") */
