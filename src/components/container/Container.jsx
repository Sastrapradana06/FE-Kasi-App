import { AiFillHome } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa"
import { MdLogout, MdOutlineLightMode, MdLightMode   } from "react-icons/md";

import { useShallow } from 'zustand/react/shallow'
import { useEffect, useState } from "react";
import useKasirStore from "../../store/store";
import { useNavigate } from 'react-router-dom';




export default function Container({children}) {
  const [user, setUser, theme, setTheme] = useKasirStore(
    useShallow((state) => [state.user, state.setUser, state.theme, state.setTheme])
  )
  const navigate = useNavigate()

  // const [theme, setTheme]  = useState()

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem('theme') || 'light';
  //   setTheme(savedTheme)
  // }, [])


  // const setThemeModel = (data) => {
  //   setTheme(data);
  //   localStorage.setItem('theme', data);
  // };

  const handleLogOut = () => {
    setUser(undefined)
    navigate('/login')
  }




  return (
    <main className={`w-[100%] min-h-[100vh] max-h-max flex relative ${theme === 'light' ? 'bg-[#f0f0f0] text-black' : 'bg-[#333333] text-white'}`}>
      <div className="w-[20%] min-h-[100vh] max-h-max  border-r-2 border-[#c5c5c5] flex flex-col gap-2 fixed z-20">
        <div className="w-[100%] h-[200px] border-b border-[#c8c6c6] p-2 flex flex-col items-center justify-center ">
          <img src="/logo2.png" alt="" width={230} className=""/>
        </div>
        <div className="w-[100%] h-max p-2 flex flex-col items-center  gap-6">
          <button className="flex  gap-5 w-[200px] text-[1.2rem]" onClick={() => navigate('/dashboard')}>  
            <AiFillHome size={25}/>
            Dashboard
          </button>
          <button className="flex  gap-5 w-[200px]" onClick={() => navigate('/produk')}>  
            <FaShoppingCart size={25}/>
            Produk
          </button>
          <button className="flex  gap-5 w-[200px]">  
            <FaShoppingCart size={25}/>
            <a href="/produk" className="text-[1.2rem]">Produk</a>
          </button>
        </div>
      </div>
      <div className="h-max flex flex-col gap-2 w-[80%] relative left-[20%]">
        <div className={`w-[80%] h-[70px] border border-gray-300 p-2 flex items-center justify-between fixed z-10 ${theme === 'light' ? 'bg-[#f0f0f0] text-black' : 'bg-[#333333] text-white'}`}>
          <h1 className="tracking-[2px] text-[1.1rem] font-extrabold">{user.nama}</h1>
          <div className="flex items-center gap-4">
            <button onClick={setTheme}>
              {theme == 'light' ? <MdOutlineLightMode size={25} /> : <MdLightMode size={25}/>}
            </button>
            <MdLogout size={25} color="crimson" onClick={handleLogOut}/>
            <img src="/profil-cewe.jfif" alt="ayang" className="w-[40px] h-[40px] object-cover rounded-[100%]"/>
          </div>
        </div>
        {children}
      </div>
    </main>
  )
}