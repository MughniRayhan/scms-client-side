import React from 'react'
import { NavLink, Outlet } from 'react-router'
import Logo from '../Shared/Logo/Logo'
import { FaClock, FaTachometerAlt } from 'react-icons/fa'
import { FaUserCircle } from "react-icons/fa";
function DashboardLayout() {
   
   
  return (
<div className="drawer lg:drawer-open ">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col ">
   
        {/* Navbar */}
    <div className="navbar bg-base-200 text-white w-full lg:hidden">
      <div className="flex-none ">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2">Dashboard</div>
      
    </div>
    {/* Page content here */}
    <Outlet/>
  </div>
  <div className="drawer-side ">
     <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
<ul className="menu bg-base-200 text-white  min-h-full sm:w-80 w-[80%] p-4">
  <div className='flex items-center justify-between lg:hidden'>
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg></label>
      {/* Sidebar content here */}
    <div ><Logo/></div>
  </div>
       <div className='mb-4 hidden lg:block border-b border-base-100/30 pb-4'><Logo/></div>    
     <NavLink to='/dashboard'  className="flex items-center gap-2 mt-5 text-lg  ">
     <FaTachometerAlt /> Dashboard
    </NavLink>
    
    <NavLink to="/dashboard/myProfile" className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaUserCircle /> My Profile
</NavLink>

<NavLink
  to='/dashboard/pendingBookings' className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaClock /> Pending Bookings
</NavLink>
    </ul>
  </div>
</div>
  )
}

export default DashboardLayout