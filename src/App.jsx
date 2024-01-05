
import './App.css'
import logo from './assets/logo.svg'

import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()

  return (
  <main className='w-[100%] h-[100vh] gap-2' id='app'>
      <div className="flex items-center">
        <img src={logo} alt="Logo" className='w-[50px]'/>
      </div>
      <div className="">
        <h1 className='timeline'>Welcome to <span className='text-[salmon] '>Kasirku</span></h1>
      </div>
      <div className="flex items-center justify-center gap-6 w-max h-max">
        <button className='px-6 py-1 border rounded-md bg-white text-black font-semibold hover:bg-[#e7e5e5] duration-200' onClick={() => navigate('/login')}>
          Login
        </button>
        <button className='px-6 py-1 border rounded-md bg-white text-black font-semibold hover:bg-[#e7e5e5] duration-200' onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
  </main> 

  )
}

export default App
