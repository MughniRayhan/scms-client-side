import React from 'react'
import { Link } from 'react-router'
import logo from '../../assets/logo.png'

function Logo() {
  return (
    <Link to='/'>
    
        <div className='flex items-center '>
            <img src={logo} alt="" className='sm:w-[50px] w-[30px] '/>
            <div className='text-primary'>
             <h3 className='font-extrabold sm:text-2xl text-sm'>SPORTS CLUB </h3>
            <p className='sm:text-sm text-[8px]'>MANAGEMENT SYSTEM</p>
            </div>
        </div>
   
    </Link>
  )
}

export default Logo