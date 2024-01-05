import logo from '../../assets/logo.svg'

export default function Home() {
  return (
          <main className='w-[100%] h-[100vh] gap-2' id='app'>
        <div className="flex items-center">
          <img src={logo} alt="Logo" className='w-[50px]'/>
        </div>
        <div className="">
          <h1 className='timeline'>Welcome to <span className='text-[salmon] '>Kasirku</span></h1>
        </div>
        <div className="flex items-center justify-center gap-6 w-max h-max">
          <button className='px-6 py-1 border rounded-md bg-white text-black font-semibold hover:bg-[#e7e5e5] duration-200'>
            <a href="/login">Login</a>
          </button>
          <button className='px-6 py-1 border rounded-md bg-white text-black font-semibold hover:bg-[#e7e5e5] duration-200'>
            <a href="/register">Register</a>
          </button>
        </div>
      </main> 
  )
}