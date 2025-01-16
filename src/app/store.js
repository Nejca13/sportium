import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      // usuario
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      clearCurrentUser: () => set({ currentUser: null }),

      // Formulario de registro
      currentForm: null,
      setCurrentForm: (formData) => set({ currentForm: formData }),
      clearCurrentForm: () => set({ currentForm: null }),

      // Datos de la reserva
      currentReservation: null,
      setCurrentReservation: (data) => set({ currentReservation: data }),
      clearCurrentReservation: () => set({ currentReservation: null }),
    }),
    { name: 'store' }
  )
)

export default useStore
