import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Shared/Navbar/Navbar'
import Footer from '../Shared/Footer/Footer'


function RootLayout() {
  
  return (
    <div >
        <Navbar/>
        <main className='max-w-7xl mx-auto'>
            <Outlet></Outlet>
        </main>
        <Footer/>
    </div>
  )
}

export default RootLayout