import React, { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { BsList } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { TbCards } from "react-icons/tb";

import { CSSTransition } from 'react-transition-group';


const Navbar = () => {


    const [cookies] = useCookies(["access_token"]);

    const [openMenu, setOpenMenu] = useState(false);
    const [closeButt, setCloseButt] = useState(false);

    const nodeRef = useRef(null);

    const changeVar = () => {
        setOpenMenu(!openMenu)
        setCloseButt(!closeButt)
    }

    const changeVatButt = () => {
        setOpenMenu(false)
        setCloseButt(false)
    }



  return (
    <div className='navbar'>
        <div className='logo-cont'>
            <p id='logo-txt'>Trait Cards</p>
            <TbCards color='white' className='logo-png'/>
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
            {closeButt ? (
                <MdOutlineClose id='closeButton' onClick={() => changeVar()}/>
            ) : (
                <BsList id='listOpButton' onClick={() => setOpenMenu(!openMenu)}/>
            )}
            
        </div>
        {/* <CSSTransition 
        in={openMenu}
        nodeRef={nodeRef}
        timeout={300}
        classNames="nav-open-menu"
        unmountOnExit
        // onEnter={() => setShowButton(false)}
        // onExited={() => setShowButton(true)}
        >
           <div className='nav-open-menu'>
                <Link to="/" className='nav-btn-menu' style={{ textDecoration: 'none'}} onClick={() => changeVatButt()} ><p>Home</p></Link>
                <Link to="/create" className='nav-btn-menu' style={{ textDecoration: 'none'}} onClick={() => changeVatButt()}><p>Create Data</p></Link>
                <Link to="/auth" className='nav-btn-menu' style={{ textDecoration: 'none'}} onClick={() => changeVatButt()} >
                    {cookies.access_token ? (<p>Account</p>) : (<p>Sign In</p>)}
                </Link>          
            </div> 
            
        </CSSTransition> */}
    </div>
  )
}

export default Navbar
