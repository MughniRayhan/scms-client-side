import React from 'react'
import { Outlet } from 'react-router'
import login from '../assets/login.png'
import Logo from '../Shared/Logo/Logo'
import Navbar from '../Shared/Navbar/Navbar'

function AuthLayout() {
  return (
    <div>
        <Navbar/>
        <div className=" lg:max-w-screen w-full min-h-screen">
        
  <div className="flex flex-col md:flex-row-reverse ">
    <div className='hidden  flex-1  lg:min-h-screen md:flex items-center justify-center w-full'>
        <img
      src={login}
      className="md:w-[300px] rounded-full  "
      data-aos="flip-left" data-aos-easing="ease-out-cubic"
    />
    </div>
    <div className='md:flex-1 sm:p-12 p-8  bg-[#FAFDF0] min-h-screen dark:bg-gray-900'>
        
      <Outlet/>
    </div>
  </div>
</div>
    </div>
  )
}

export default AuthLayout