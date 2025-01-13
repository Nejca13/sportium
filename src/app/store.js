import { create } from 'zustand'
import { persist } from 'zustand-persist'

const useStore = create(
  persist(
    (set) => ({
      // usuario
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      clearCurrentUsetr: () => set({ currentUser: null }),
    }),
    { name: 'store' }
  )
)

export default useStore
