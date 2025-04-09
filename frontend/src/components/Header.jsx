import React, { useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import { logoutGlobal } from '../api/logout';

const Header = () => {
  const navigate = useNavigate();
  const searchRef = useRef();

  const user = useSelector((state) => state.user?.data);
  const dispatch = useDispatch();
  

  return (
    <div className='header'>
        
        <div className='header-main-container'>

                <div className='header-logo-container' onClick={() => navigate('/')}>
                    <img src="src/images/logo.png" alt="" />
                </div>

                <SearchBar />
                
                {user ?  

                (<div className='header-auth-buttons'>
                  <Link to='/dashboard'><span className="material-icons" >person</span><div className='logged-in'>
                  {user.name.length > 15 ? user.name.slice(0, 14) + '...' : user.name}</div></Link>
                  <span title='Log Out' className="material-icons logout" onClick={() => logoutGlobal()}>logout</span>
                </div>) :

                (<div className='header-auth-buttons'>
                  <Link to="/login">
                    <span className="material-icons">person</span> Login
                  </Link>
                  <span className="auth-divider">|</span>
                  <Link to="/register">Register</Link>
                </div>)}

                <div className='header-shopping-interactions'>
                  <div onClick={() => navigate('/favorites')}>
                      <span className="material-icons">favorite</span>
                  </div>
                  <div onClick={() => navigate('/cart')}>
                    <span className="material-icons">shopping_cart</span>
                  </div>
                </div>
            
        </div>

        <div className='header-link-list-container'>
            <div className='header-link-list'>
              <ul>
                <li><NavLink style={({isActive}) => ({color: isActive ? '#DAAC61' : 'white'})} to="/">Home</NavLink></li>
                <li><NavLink style={({isActive}) => ({color: isActive ? '#DAAC61' : 'white'})} to="/about">About</NavLink></li>
                <li><NavLink style={({isActive}) => ({color: isActive ? '#DAAC61' : 'white'})} to="/products">Products</NavLink></li>
                <li><NavLink style={({isActive}) => ({color: isActive ? '#DAAC61' : 'white'})} to="/contact">Contact</NavLink></li>
              </ul>
            </div>
        </div>

    </div>
  )
}

export default Header