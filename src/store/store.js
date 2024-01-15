import { create } from 'zustand'
// import { fetchKeluarFromDatabase, fetchMasukFromDatabase } from '../utils/api';

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


  karyawan : [],
  getKaryawan: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/getKaryawan');
      const {data} = await response.json();

      if(response.status == 200) {
        set({ karyawan: data });
      } else {
        set({ karyawan: [] });
      }

    } catch (error) {
      console.error('Error fetching karyawan:', error);
    }
  },
  updateKaryawan : (newKaryawan) => set({karyawan: newKaryawan}),


  riwayatMasuk : [],
  getRiwayatMasuk: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/get-riwayat-masuk');
      const {data} = await response.json();

      if(response.status == 200) {
        set({ riwayatMasuk: data });
      } else {
        set({ riwayatMasuk: [] });
      }

    } catch (error) {
      console.error('Error fetching riwayatMasuk:', error);
    }
  },
  updateRiwayatMasuk : (data) => set({riwayatMasuk: data}),


  riwayatKeluar : [],
  getRiwayatKeluar: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/get-riwayat-keluar');
      const {data} = await response.json();

      if(response.status == 200) {
        set({ riwayatKeluar: data });
      } else {
        set({ riwayatKeluar: [] });
      }

    } catch (error) {
      console.error('Error fetching riwayatKeluar:', error);
    }
  },
  updateRiwayatKeluar : (data) => set({riwayatKeluar: data}),
  resetState : () => set({user: [], products: [], karyawan: []})
  
}));

export default useKasirStore
