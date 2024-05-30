import { useState } from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';

import {Home} from './pages/Home';
import {Auth} from './pages/Auth';
import {CreateData} from './pages/CreateData';
import {IndPerson} from './pages/DetailUserInfo'
import { Register } from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<CreateData />} />
      <Route path='/auth' element={<Auth  />} />
      <Route path='/register' element={<Register  />} />
      <Route path='/person/:id' element={ <IndPerson /> } /> 
    </Routes>
    <Footer />
    </>
    
  )
}

export default App
