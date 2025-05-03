import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Footer = () => {
const date = new Date().getFullYear();
const navigate = useNavigate();
  return (
    <footer>
        <div className='footer-main-container'>
                <div className='footer-logo-container' onClick={() => navigate('/')}>
                    <img src='/images/logo.png' alt='logo' />
                </div>
                <div className="footer-links-container">
                    <ul>
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/products">Товары</Link></li>
                        <li><Link to="/favorites">Избранное</Link></li>
                        <li><Link to="/cart">Корзина</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/about">О нас</Link></li>
                        <li><Link to="/contact">Контакты</Link></li>
                        <li><Link to="/luzi">Luzi</Link></li>
                        <li><Link to="/givaudan">Givaudan</Link></li>
                    </ul>
                </div>
                <div className='social-media-container'>
                <ul>
                    <li>
                        <a href="https://vk.com/goldparfum09" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-vk"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/goldparfum.opt/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-instagram"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://wa.me/79287580909" target='_blank' rel='noopener noreferrer'>
                        <i className="fa-brands fa-whatsapp"></i>
                        </a>
                    </li>
                </ul>

                </div>
        </div>
        <div className='footer-copyright-container'>
            <p>© Gold Perfume {date} | Все права защищены</p>
        </div>
    </footer>
 
  )
}

export default Footer