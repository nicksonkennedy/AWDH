import React, { useContext, useState } from 'react';
import ghs from '../assets/images/ghs.jpg'
import moh_logo from '../assets/images/moh-logo-2.png'
import { FaSignOutAlt, FaToolbox, FaUserAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import MenuDrop from '../UIComps/MenuDrop';
import { AuthContext } from '../context/AuthContext';
import { CiMenuBurger } from "react-icons/ci";
import { Button, Drawer } from 'antd';
import axios from 'axios'

const Navbar = () => {
 const {loggedIn, getLoggedIn} = useContext(AuthContext)
  const location = useLocation()
   const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

   const userLogout = async() =>{
    await axios.get('/logout')
    await getLoggedIn()
  }

  return (
    <nav className='fixed w-full text-white  z-50'>
      <div className='  mx-auto bg-gray-100 shadow-2xl'>
          <div className='relative flex items-center justify-between p-1'>
                    
                    
                    <div className="flex items-center gap-4  p-3 relative left-10">
          {/* Ghana Health Service Logo */}
          <div className="flex-shrink-0">
            <img 
              src={ghs}
              alt="Ghana Health Service Logo"
              className="h-16 w-auto object-contain rounded-full"
            />
          </div>
        
          {/* Hospital Name with Vertical Separator */}
          <Link to='/' className="flex items-center">
            <div className="h-12 w-px bg-gray-300 mr-4"></div>
            <span className={loggedIn ? "hidden sm:inline text-xl font-bold text-green-900 font-sans": " text-xl font-bold text-green-900 font-sans"}>
              ATIWA WEST DISTRICT HOSPITAL
            </span>
          </Link>

        </div>
        
        <div className=' hidden   md:inline'>
           {location.pathname === '/admin' && (
          <div className='mr-10'>
          <MenuDrop />
        </div>
        
      )} 
      {
        loggedIn && location.pathname !="/admin" ? (
        // Make sure this is wrapped in parentheses instead of curly braces
       <Link to='/admin' className='mr-10 px-3 py-1 bg-cyan-800 text-white font-semibold rounded-sm'>Dashboard</Link>
        
      ): ''}
        </div>
      
        {
          loggedIn && 
          <div className='inline  md:hidden'><CiMenuBurger className='text-2xl relative right-5 text-slate-900' onClick={showDrawer}/></div>
        }
{/******************drawer************************************************** */}
        <Drawer
        title="ATIWA WEST DISTRICT HOSPITAL"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
        width= '250'
        
      >
        <div className='w-full space-y-12'>
          <div className='text-xl font-semibold text-green-900 flex '><FaUserAlt className='relative top-1'/> <span className='ml-3 '>Profile</span></div>
            <div className='text-xl font-semibold text-green-900 flex '><FaToolbox className='relative top-1'/> <span className='ml-3 '>Settings</span></div>
          <div className='text-xl font-semibold text-green-900 flex ' onClick={userLogout}><FaSignOutAlt className='relative top-1'/> <span className='ml-3 '>Logout</span></div>

        </div>
      </Drawer>
                </div>
                
{/**<div className='relative top-1 p-[0.09rem] w-full bg-cyan-800 shadow-2xl'></div> */}
    </div>
    </nav>
  );
};

export default Navbar;