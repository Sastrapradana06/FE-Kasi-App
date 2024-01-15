import Navbar from '../components/navbar/Navbar'
import { FaRegUser } from "react-icons/fa";
import './style.css'
import { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { useShallow } from 'zustand/react/shallow'
import useKasirStore from "../store/store";




export default function Login() {
  const [typePw, setTypePw] = useState('password')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState(undefined)

  const [setUser, login] = useKasirStore(
    useShallow((state) => [ state.setUser, state.login])
  )


  const navigate = useNavigate();


  const togglePasswordVisibility = () => {
    {typePw == 'password' ? setTypePw('text') : setTypePw('password')}
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessages(undefined)
    const data = {
      email : e.target.email.value,
      password : e.target.password.value
    }

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const {message, dataUser} = await res.json()
      
      switch (res.status) {
        case 200:
          login()
          setMessages(message)
          localStorage.setItem('token', dataUser.token);
          setUser(dataUser)
          navigate('/dashboard');
          break;
        case 401:
          setMessages(message)
          break;
        case 404:
          setMessages(message)
          break;
        case 500:
          setMessages(message)
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
    <div className="" id='login'>
      <Navbar />
      <div className="w-[100%] h-[90vh]  flex items-center justify-center flex-col gap-5">
        <div className="flex flex-col gap-4 items-center">
          <FaRegUser size={50} color='salmon'/>
          {messages ? <p className='text-[.8rem] text-[crimson]'>{messages}</p> : null}
        </div>
        <form onSubmit={handleLogin} className='w-[400px] h-max '>
          <div className="flex flex-col gap-1">
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
            {isLoading ? 'Loading' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}