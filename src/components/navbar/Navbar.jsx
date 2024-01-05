import { useEffect, useState } from 'react';
import logo from '/logo.svg'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [path, setPath] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const pathname = window.location.pathname;
    setPath(pathname)
  }, []);


  return (
    <nav className="w-[100%] h-[50px] py-2 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className='w-[40px]'/>
        <p className='font-bold uppercase text-[1.3rem]'>asirku</p>
      </div>
      {path == '/login' ? (
        <div className="flex items-center gap-4">
          <p>Belum Memiliki Akun?</p>
          <button className='px-2 py-1 bg-slate-200 text-black font-semibold rounded-lg capitalize tracking-[2px]' onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <p>Sudah memiliki Akun?</p>
          <button className='px-2 py-1 bg-slate-200 text-black font-semibold rounded-lg capitalize tracking-[2px]' onClick={() => navigate('/login')}>
            Login
          </button>
      </div>
      )}
    </nav>
  )
}