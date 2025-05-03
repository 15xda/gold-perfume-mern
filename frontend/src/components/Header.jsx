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
  const totalItemsInCart = user ?  user.cart.length : 0;

  const handleLogout = async () => {
    await logoutGlobal(); 
    navigate(0);  
  };
  
  return (
    <div className='header'>
        
        <div className='header-main-container'>

                <div className='header-logo-container' onClick={() => navigate('/')}>
                    <img src="/images/logo-dark-font.png" alt="" />
                </div>

                <SearchBar />
                
                {user ?  

                (<div className='header-auth-buttons'>
                  <Link to='/dashboard'><span className="material-icons" >person</span><div className='logged-in'>
                  {user.name.length > 15 ? user.name.slice(0, 14) + '...' : user.name}</div></Link>
                  <span title='Log Out' className="material-icons logout" onClick={handleLogout}>logout</span>
                </div>) :

                (<div className='header-auth-buttons'>
                  <Link to="/login">
                    <span className="material-icons">person</span> Вход
                  </Link>
                  <span className="auth-divider">|</span>
                  <Link to="/register">Регистрация</Link>
                </div>)}

                <div className='header-shopping-interactions'>
                  <div onClick={() => navigate('/favorites')}>
                      <span className="material-icons">favorite</span>
                  </div>
                  <div className='header-cart-button' onClick={() => navigate('/cart')}>
                    <span className="material-icons">shopping_cart</span>
                    {user && <div className='cart-count-header'>{totalItemsInCart}</div>}
                  </div>
                </div>
            
        </div>

        <div className='header-link-list-container'>
            <div className='header-link-list'>
              <ul>
                <li><NavLink style={({isActive}) => ({color: isActive ? '#23645c' : '#33312E'})} to="/">Главная</NavLink></li>
                <li><NavLink style={({isActive}) => ({color: isActive ? '#23645c' : '#33312E'})} to="/products">Товары</NavLink></li>
                <li><NavLink style={({isActive}) => ({color: isActive ? '#23645c' : '#33312E'})} to="/about">О нас</NavLink></li>
                <li><NavLink style={({isActive}) => ({color: isActive ? '#23645c' : '#33312E'})} to="/how-to-order">Как заказать</NavLink></li>
                <li><NavLink style={({isActive}) => ({color: isActive ? '#23645c' : '#33312E'})} to="/contact">Контакты</NavLink></li>
              </ul>
            </div>
        </div>

    </div>
  )
}

export default Header