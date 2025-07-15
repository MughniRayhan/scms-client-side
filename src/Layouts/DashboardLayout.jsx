import React from 'react'
import { NavLink, Outlet } from 'react-router'
import Logo from '../Shared/Logo/Logo'
import { FaBullhorn, FaCheckCircle, FaCheckSquare, FaClock, FaLayerGroup, FaMoneyCheckAlt, FaTachometerAlt, FaUsers, FaUsersCog } from 'react-icons/fa'
import { FaUserCircle } from "react-icons/fa";
import useUserRole from '../Hooks/useUserRole';

function DashboardLayout() {
  const {role,roleLoading} = useUserRole()
   
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

{
  !roleLoading && (role==="member" || role==="user") &&
  <>
  <NavLink to="/dashboard/announcements" className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaBullhorn /> Announcements
</NavLink>

<NavLink
  to='/dashboard/pendingBookings' className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaClock /> Pending Bookings
</NavLink>
  </>
}

{/* members routes */}
{
  !roleLoading && role==="member" &&
  <>
  <NavLink
  to='/dashboard/approved-bookings'  className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaCheckCircle />  Approved Bookings
</NavLink>

  </> 
}

{
  !roleLoading && role==="admin" && 
  <>
  <NavLink to="/dashboard/manageBookingsApproval" className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaCheckSquare /> Manage Bookings Approval
</NavLink>

<NavLink
  to='/dashboard/manageMembers'  className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaUsersCog /> Manage Members
</NavLink>

<NavLink
  to='/dashboard/allUsers'  className="flex items-center gap-2 mt-5 text-lg dashboard_page">
  <FaUsers /> All Users
</NavLink>

<NavLink to='/dashboard/manage-courts' className="flex items-center gap-2 mt-3 text-lg dashboard_page">
  <FaLayerGroup /> Manage Courts
</NavLink>

<NavLink to='/dashboard/make-announcement' className="flex items-center gap-2 mt-3 text-lg dashboard_page">
  <FaBullhorn /> Make Announcement
</NavLink>
  </>
}
    </ul>
  </div>
</div>
  )
}

export default DashboardLayout