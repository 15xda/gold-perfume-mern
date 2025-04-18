import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const FixedFooter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  function checkLocation(loc) {
    if (loc === location.pathname) {
      return true
    }
  }

  return (
    <div className='fixed-footer'>
        <div className='fixed-footer-main-container'>
            <div style={{color : checkLocation('/') ? '#23645c' : '#33312E'}}><span className='material-icons' onClick={() => {navigate('/')}}>home</span></div>
            <div style={{color : checkLocation('/products') ? '#23645c' : '#33312E'}}><span className='material-icons' onClick={() => {navigate('/')}}>grid_view</span></div>
            <div style={{color : checkLocation('/favorites') ? '#23645c' : '#33312E'}}><span className='material-icons' onClick={() => {navigate('/favorites')}}>favorite</span></div>
            <div style={{color : checkLocation('/cart') ? '#23645c' : '#33312E'}}><span className='material-icons' onClick={() => {navigate('/cart')}}>shopping_cart</span></div>
            <div style={{color : checkLocation('/dashboard') ? '#23645c' : '#33312E'}}><span className='material-icons' onClick={() => {navigate('/dashboard')}}>person</span></div>
        </div>
    </div>
  )
}

export default FixedFooter