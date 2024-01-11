import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from './components/error-page/ErrorPage.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Produk from './pages/produk/Produk.jsx';
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import Karyawan from './pages/karyawan/Karyawan.jsx';
import RiwayatMasuk from './pages/riwayat-masuk/RiwayatMasuk.jsx';
// import ProtectedPage from './components/protected-page/ProtectedPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element:<Dashboard />,
    errorElement: <ErrorPage />
  },
  {
    path: "/produk",
    element: <Produk />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/karyawan",
    element: <Karyawan />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/riwayat-masuk",
    element: <RiwayatMasuk />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);





