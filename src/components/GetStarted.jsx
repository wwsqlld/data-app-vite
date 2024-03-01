import React from 'react';
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const fadeInVarience = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1
    }
  },
}

const GetStarted = () => {
  return (
    <motion.div
    variants={fadeInVarience}
    initial="initial"
    whileInView="animate"
    viewport={{
      once: true
    }}
    className='get-started-page'
    >
      <div className='get-started-container'>
        <div className='gt-cont-if'>
            <p>Create cards of people whose information you don't want to forget.</p>
            <Link to='/auth' style={{ textDecoration: 'none' }} ><button className='get-btn-link'>Get Started <FaLocationArrow size={20}/> </button></Link>
        </div>
        <div className='gt-cont-img'>
            <img 
                src='https://idejupr.lt/img/best-gif-database-10.gif'
                alt=''
                loading="lazy"
            />
        </div>
      </div>
    </motion.div>
  )
}

export default GetStarted
