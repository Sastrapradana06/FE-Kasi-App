
import { MdLogout, MdOutlineLightMode, MdLightMode } from "react-icons/md";

import { useShallow } from 'zustand/react/shallow'
import useKasirStore from "../../store/store";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";



export default function Container({ children }) {
  const [user, setUser, theme, setTheme, authenticated, logout, resetState] = useKasirStore(
    useShallow((state) => [state.user, state.setUser, state.theme, state.setTheme, state.authenticated, state.logout, state.resetState])
  )
  const navigate = useNavigate()

  // useEffect(() => {
  //   if(!authenticated) {
  //     navigate('/login')
  //   }
  // }, [authenticated, navigate])

  const handleLogOut = () => {
    logout()
    setUser(undefined)
    navigate('/login')
    localStorage.clear();
    resetState()
  }

  return (
    <main className={`w-[100%] min-h-[100vh] max-h-max flex relative ${theme === 'light' ? 'bg-[#f0f0f0] text-black' : 'bg-[#333333] text-white'}`}>
      <Sidebar />
      <div className="h-max flex flex-col gap-2 w-[80%] relative left-[20%]">
        <div className={`w-[80%] h-[70px] border border-gray-300 p-2 flex items-center justify-between fixed z-10 ${theme === 'light' ? 'bg-[#f0f0f0] text-black' : 'bg-[#333333] text-white'}`}>
          <h1 className="tracking-[2px] text-[1.1rem] font-extrabold">{user.nama}</h1>
          <div className="flex items-center gap-4">
            <button onClick={setTheme}>
              {theme == 'light' ? <MdOutlineLightMode size={25} /> : <MdLightMode size={25} />}
            </button>
            <MdLogout size={25} color="crimson" onClick={handleLogOut} />
            <img src="/profil-cewe.jfif" alt="ayang" className="w-[40px] h-[40px] object-cover rounded-[100%]" />
          </div>
        </div>
        {children}
      </div>
    </main>
  )
}

Container.propTypes = {
  children: PropTypes.node,
};