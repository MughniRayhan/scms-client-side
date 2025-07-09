import React from 'react'
import Logo from '../Logo/Logo'
import { Link, NavLink } from 'react-router'

function Navbar() {
    const NavItems = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/courts'>Courts</NavLink></li>
    </>
  return (
    <nav className="navbar bg-base-200 min-w-screen shadow-sm px-5  flex justify-between ">
  <div className="navbar-start  w-full lg:w-[20%] flex  sm:justify-start justify-between ">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow text-white">
       {NavItems}
        <div className='sm:hidden block'>
            <Link to='/login'><button className="btn bg-primary border-none font-semibold">Login</button></Link>
        </div>
      </ul>
    </div>
    <Logo/>
  </div>
  <div className="navbar-center hidden lg:flex  justify-center w-[50%] ">
    <ul className="menu menu-horizontal px-1 text-base font-semibold text-white">
      {NavItems}
    </ul>
  </div>
  <div className="navbar-end  w-[10%]  hidden sm:block">
    <Link to='/login'>
    <button className="btn bg-primary border-none font-semibold hover:scale-105 transition-all duration-300 ease-in-out">Login</button>
    </Link>
  </div>
</nav>
  )
}

export default Navbar