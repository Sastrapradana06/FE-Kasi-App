import { create } from 'zustand'

const useKasirStore = create((set) => ({
  
  user: [],
  setUser: (newUser) => set({ user: newUser }),

  theme: 'light',
  setTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  authenticated: false,
  login: () => set({ authenticated: true }),
  logout: () => set({ authenticated: false }),

  products : [],
  getProducts: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/getProducts');
      const {data} = await response.json();

      if(response.status == 200) {
        set({ products: data });
      } else {
        set({ products: [] });
      }

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  updateProducts : (newProducts) => set({products: newProducts}),
}));

export default useKasirStore
