import Navbar from '../components/navbar/Navbar'
import { FaRegUser } from "react-icons/fa";
import './style.css'
import { useState } from 'react';

import { useNavigate } from "react-router-dom";

import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5"

export default function Register() {
  const [typePw, setTypePw] = useState('password')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState(undefined)
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    {typePw == 'password' ? setTypePw('text') : setTypePw('password')}
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessages(undefined)
    const data = {
      nama : e.target.nama.value,
      email : e.target.email.value,
      password : e.target.password.value
    }
  
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const dataRes =  await res.json()
      
      switch (res.status) {
        case 200:
          setMessages(dataRes.message)
          navigate('/login');
          break;
        case 404:
          setMessages(dataRes.message)
          break;
          case 500:
          setMessages(dataRes.message)
          break;
        default:
          setMessages('Terjadi kesalahan lain')
      }

      e.target.reset()
      setIsLoading(false)
      
    } catch (error) {
      e.target.reset()
      setIsLoading(false)
      console.log(error);
    }
  }


  return (
    <div className="" id='register'>
      <Navbar />
      <div className="w-[100%] h-[90vh]  flex items-center justify-center flex-col gap-4">
        <div className="flex flex-col gap-4 items-center">
          <FaRegUser size={50} color='salmon'/>
          {messages ? <p className='text-[.8rem] text-[crimson]'>{messages}</p> : null}
        </div>
        <form onSubmit={handleRegister} className='w-[400px] h-max '>
          <div className="flex flex-col gap-1">
            <label htmlFor="nama">Masukkan Nama</label>
            <input type="text" name='nama' className='border bg-transparent px-2 py-1' required/>
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <label htmlFor="email">Masukkan Email</label>
            <input type="text" name='email' className='border bg-transparent px-2 py-1' required/>
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <label htmlFor="password">Masukkan Password</label>
            <div className="flex items-center gap-2 justify-between  relative">
              <input type={typePw} name='password' className='border bg-transparent px-2 py-1 w-[100%]' required/>
              <div className="absolute cursor-pointer right-3" onClick={togglePasswordVisibility}>
                {typePw == 'password' ? <FaEyeSlash size={20}/> : <IoEyeSharp size={20}/>}
              </div>
            </div>
          </div>
          <button type='sumbit' className='tracking-[4px] mt-5 border w-[100%] py-1 bg-[salmon] hover:bg-[#e26a5d] duration-300 transition-all cursor-pointer uppercase' disabled={isLoading}>
            {isLoading ? 'Loading' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
}