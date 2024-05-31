import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { BsList } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { TbCards } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";



const Navbar = () => {


    const [cookies] = useCookies(["access_token"]);

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();


  
  const menuVars = {
    initial: {
      x: window.innerWidth,
    },
    animate: {
      x: 0,
      transition: {
        duration: 1.1,
      }
    },
    exit: {
      x: window.innerWidth,
      transition: {
        duration: 0.7,
      }
    }
  }


  const handleClick = () => {
    setIsOpen(!isOpen)
  }



  return (
    <div className='navbar'>
        <AnimatePresence>
        {isOpen && (
          <motion.div
         variants={menuVars}
         initial="initial"
         animate="animate"
         exit="exit"
         className='nav-cont-adap'
         >
          <div className='adap-list'>
            <NavLink to="/" onClick={() => handleClick()} className='nav-btn' style={{ textDecoration: 'none'}} >
                {cookies.access_token ? (<p>Cards</p>) : (<p>Home</p>)}
            </NavLink>
            {cookies.access_token ? 
            <NavLink to="/create" onClick={() => handleClick()} className='nav-btn' style={{ textDecoration: 'none'}} >
                <p>Create</p>
            </NavLink>
            : 
             <></>
            }

            <NavLink to="/auth" onClick={() => handleClick()} className='nav-btn' style={{ textDecoration: 'none'}} >
                {cookies.access_token ? (<p>Account</p>) : (<p>Sign In</p>)}
            </NavLink>
          </div>
        </motion.div>
      )}
      </AnimatePresence>



        <div className='logo-cont' onClick={(e) => navigate('/')}>
            <p id='logo-txt'>Trait Cards</p>
            <TbCards color='black' className='logo-png'/>
        </div>
        <div className='nav-cont'>
            <Link to="/" className='nav-btn' style={{ textDecoration: 'none'}} >
                {cookies.access_token ? (<p>Cards</p>) : (<p>Home</p>)}
            </Link>
            {cookies.access_token ? 
            <Link to="/create" className='nav-btn' style={{ textDecoration: 'none'}} >
                <p>Create</p>
            </Link>
             : 
             <></>
             }
            <Link to="/auth" className='nav-btn' style={{ textDecoration: 'none'}} >
                {cookies.access_token ? (<p>Account</p>) : (<p>Sign In</p>)}
            </Link>  
        </div>
        {!isOpen ? (
            <BsList className='nav-list' size={40} onClick={() => handleClick()} /> 
            ) : (
            <MdOutlineClose className='nav-list' size={40} onClick={() => handleClick()}/>
        )}
    </div>
  )
}

export default Navbar
