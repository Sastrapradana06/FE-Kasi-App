import { AiFillHome } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa"
import { FaUsers } from "react-icons/fa6";

import { useNavigate } from 'react-router-dom';
import { useLocation  } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate()
  const {pathname} = useLocation ();

  return (
    <div className="w-[20%] min-h-[100vh] max-h-max  border-r-2 border-[#c5c5c5] flex flex-col gap-2 fixed z-20">
      <div className="w-[100%] h-[200px] border-b border-[#c8c6c6] p-2 flex flex-col items-center justify-center ">
        <img src="/logo2.png" alt="" width={230} />
      </div>
      <div className="w-[100%] h-max p-2 flex flex-col items-center  gap-6">
        <button className={`flex gap-5 w-[200px] ${pathname == '/dashboard' ? 'text-cyan-600' : ''}`} onClick={() => navigate('/dashboard')}>
          <AiFillHome size={25} />
          Dashboard
        </button>
        <button className={`flex gap-5 w-[200px] ${pathname == '/produk' ? 'text-cyan-600' : ''}`} onClick={() => navigate('/produk')}>
          <FaShoppingCart size={25} />
          Produk
        </button>
        <button className={`flex gap-5 w-[200px] ${pathname == '/karyawan' ? 'text-cyan-600' : ''}`} onClick={() => navigate('/karyawan')}>
          <FaUsers size={25} />
          Karyawan
        </button>
      </div>
    </div>
  )
}