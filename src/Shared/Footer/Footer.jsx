import React from 'react'
import { NavLink } from 'react-router'
import Logo from '../Logo/Logo'
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
function Footer() {
     const listItems = <>
     <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/courts'>Courts</NavLink></li>
    </>
  return (

    <footer className="bg-gray-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo */}
        <Logo/>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-primary w-30 pb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white">
            {listItems}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-primary w-30 pb-2">Follow Us</h3>
          <div className="flex space-x-4 text-2xl text-gray-300 mt-6">
            <a href="https://github.com/MughniRayhan" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/mughni-rayhan-1aa587317/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
              <FaLinkedin />
            </a>
            <a href="https://www.facebook.com/mughni.rayhan.tisha" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-primary w-30 pb-2">Contact Us</h3>
          <ul className="text-sm text-gray-300 space-y-2 mt-3">
            <li>Email: <a href="mailto:info@scms.com" className="hover:text-orange-400">mughnirayhan22@gmail.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:text-orange-400">+880 1746423366</a></li>
            <li>Address: Sylhet, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-12 ">
        &copy; 2025 SCMS. All rights reserved.
      </div>
    </footer>
  );
};



export default Footer