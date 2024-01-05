import { create } from 'zustand'

const useKasirStore = create((set) => ({
  
  user: [],
  setUser: (newUser) => set({ user: newUser }),

  theme: 'light',
  setTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default useKasirStore
