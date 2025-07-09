import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Shared/Navbar/Navbar'
import Footer from '../Shared/Footer/Footer'
import AOS from 'aos';
import 'aos/dist/aos.css';

function RootLayout() {
   useEffect(() => {
      AOS.init({
      once: false, 
    });
    }, []);
    
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