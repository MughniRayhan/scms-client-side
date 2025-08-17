import React, { useEffect, useState } from 'react';
import Logo from '../Logo/Logo';
import { Link, NavLink, useNavigate } from 'react-router';
import UseAuth from '../../Hooks/UseAuth';
import { toast } from 'react-toastify';
import { FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

function Navbar() {
  const { user, logOut, loading} = UseAuth();
   const [theme, setTheme] = useState("light");
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


//  theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggle = <>
  <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} className="theme-controller" value="synthwave" />

  {/* sun icon */}
  <svg
    className="swap-off sm:h-10 sm:w-10 h-8 w-8 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>

  {/* moon icon */}
  <svg
    className="swap-on sm:h-10 sm:w-10 fill-current h-8 w-8"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>
</>
  const NavItems = (
    <>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/courts'>Courts</NavLink></li>
      <li><NavLink to='/events'>Events</NavLink></li>
      {user && (
         <>
         <li><NavLink to='/dashboard' >Dashboard</NavLink></li>
         <li><NavLink to='/membership-packages'>Membership Packages</NavLink></li>
         </>
      )}
    </>
  );

  return (
    <nav className="navbar bg-base-200 min-w-screen shadow-sm px-5 flex justify-between fixed z-10">
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
                <button onClick={handleLogOut} className="flex items-center gap-2 text-primary dark:text-orange-500">
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
                    <button className="btn text-primary border-none font-semibold dark:text-orange-500">Login</button>
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
        <label className="sm:swap swap-rotate text-white hidden ">
  {/* this hidden checkbox controls the state */}
{toggle}
</label>
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
                <button onClick={handleLogOut} className="flex items-center gap-2 text-primary dark:text-orange-500">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to='/login'>
            <button className="btn bg-primary dark:bg-orange-500 border-none font-semibold hover:scale-105 transition-all duration-300 ease-in-out">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
