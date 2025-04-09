import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
const date = new Date().getFullYear();
const navigate = useNavigate();
  return (
    <footer>
        <div className='footer-main-container'>
                <div className='footer-logo-container' onClick={() => navigate('/')}>
                    <img src='src/images/logo-dark-font.png' alt='logo' />
                </div>
                <div className='footer-links-container'>
                    <ul>
                        <li><a href='#'>Home</a></li>
                        <li><a href='#'>About</a></li>
                        <li><a href='#'>Contact</a></li>
                        <li><a href='#'>Terms</a></li>
                    </ul>
                    <ul>
                        <li><a href='#'>Home</a></li>
                        <li><a href='#'>About</a></li>
                        <li><a href='#'>Contact</a></li>
                        <li><a href='#'>Terms</a></li>
                    </ul>
                </div>
                <div className='social-media-container'>
                    <ul>
                        <li><i className='fab fa-facebook'></i></li>
                        <li><i className='fab fa-instagram'></i></li>
                        <li><i className='fab fa-telegram'></i></li>
                        <li><i className='fab fa-whatsapp'></i></li>
                    </ul>
                </div>
        </div>
        <div className='footer-copyright-container'>
            <p>Copyright © Gold Perfume {date} All rights reserved</p>
        </div>
    </footer>
 
  )
}

export default Footer