import React from 'react';
import { Link } from 'react-router-dom';

const Preheader = () => {
  return (
    <div className="preheader">
      <div className="preheader-main-container">
        
        <div className="preheader-social-links">
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
              <i className="fa-brands fa-telegram"></i>
            </li>
            <li>
              <a href="https://wa.me/79287580909" target='_blank' rel='noopener noreferrer'>
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </li>
          </ul>
        </div>

        <div className="preheader-contact-list">
          <i class="fa-solid fa-phone"></i>
          <span> +7 (928) 758-09-09</span>
        </div>

        <div className="preheader-quick-links">
          <ul>
            <li>
              <Link to="/search?term=luzi">Luzi</Link>
            </li>
            <li>
              <Link to="/search?term=givaudan">Givaudan</Link>
            </li><li>
              <Link to="/search?term=seluz">Seluz</Link>
            </li><li>
              <Link to="/search?term=symrise">Symrise</Link>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default Preheader;
