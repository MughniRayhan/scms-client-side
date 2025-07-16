import React from 'react'
import { Outlet, useNavigation } from 'react-router'
import Navbar from '../Shared/Navbar/Navbar'
import Footer from '../Shared/Footer/Footer'
import Loader from '../Components/Loader/Loader'


function RootLayout() {
  const state = useNavigation();
  return (
    <div >
        <Navbar/>
        <main className='max-w-7xl mx-auto'>
            {state=="loading" ? <Loader/> : <Outlet/>}
        </main>
        <Footer/>
    </div>
  )
}

export default RootLayout