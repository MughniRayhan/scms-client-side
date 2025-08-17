import React from 'react';
import Logo from '../Logo/Logo';
import { Link, NavLink, useNavigate } from 'react-router';
import UseAuth from '../../Hooks/UseAuth';
import { toast } from 'react-toastify';
import { FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

function Navbar() {
  const { user, logOut, loading} = UseAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate('/');
      })
      .catch((error) => {
        console.error("Logout Error: ", error);
        toast.error("Logout failed");
      });
  };



  const NavItems = (
    <>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/courts'>Courts</NavLink></li>
      <li><NavLink to='/events'>Events</NavLink></li>
      {user && (
         <li>
                <NavLink to='/dashboard' >
                  Dashboard
                </NavLink>
              </li>
      )}
    </>
  );

  return (
    <nav className="navbar bg-base-200 min-w-screen shadow-sm px-5 flex justify-between">
      <div className="navbar-start w-full lg:w-[20%] flex lg:justify-start justify-between">
        

   <div className='flex items-center  gap-2 sm:gap-4'>
    <Logo />
     <div className='lg:hidden'>
     
        {user &&
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="sm:w-40 w-10 rounded-full">
                <img src={user?.photoURL} alt="" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-200 text-white rounded-box w-40">
              <li className="text-center">
                <span className="text-sm font-medium">{user.displayName || user.email}</span>
              </li>
              <div className=" my-0 border-t border-white"></div>
              <li>
                <NavLink to='/dashboard'  className="flex items-center gap-2">
                  <FaTachometerAlt /> Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogOut} className="flex items-center gap-2 text-primary">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        }
    </div>
   </div>

        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 p-2 w-30   shadow text-white relative right-3">
            {NavItems}
            <div className='lg:hidden block'>
              {
                !user &&
                  <Link to='/login'>
                    <button className="btn text-primary border-none font-semibold">Login</button>
                  </Link>
                
              }
            </div>
          </ul>
        </div>
        
      </div>

      <div className="navbar-center hidden lg:flex justify-center w-[50%]">
        <ul className="menu menu-horizontal px-1 text-base font-semibold text-white">
          {NavItems}
        </ul>
      </div>

      <div className="navbar-end w-[10%] hidden lg:block">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-40 rounded-full">
                <img src={user?.photoURL} alt="" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-200 text-white rounded-box w-40">
              <li className="text-center">
                <span className="text-sm font-medium">{user.displayName || user.email}</span>
              </li>
              <div className=" my-0 border-t border-white"></div>
              <li>
                <NavLink to='/dashboard'  className="flex items-center gap-2">
                  <FaTachometerAlt /> Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogOut} className="flex items-center gap-2 text-primary">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to='/login'>
            <button className="btn bg-primary border-none font-semibold hover:scale-105 transition-all duration-300 ease-in-out">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
