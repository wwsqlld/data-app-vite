import React from 'react';
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer'>
      <p>Created and built by Vlad 😛</p>
      <a href='https://www.instagram.com/wwsqlld13/'><FaInstagram size={25} style={{ cursor: 'pointer', color: 'white' }}/></a> 
    </div>
  )
}

export default Footer
