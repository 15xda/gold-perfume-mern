import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutGlobal } from '../api/logout';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.data);

  const handleLogout = async () => {
    await logoutGlobal();
    navigate(0);
  };

  return (
    <div className={`side-bar ${open ? 'open' : ''}`}>
      <div className="side-bar-container">
        <div className="side-bar-header">
          <h3>Меню</h3>
          <span className="material-icons close-icon" onClick={onClose}>close</span>
        </div>

        <nav className="side-bar-nav">
          <ul>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/products" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Товары
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                О нас
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/how-to-order" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Как заказать
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Контакты
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="side-bar-auth">
          {user ? (
            <>
              <div className="user-info">
                <span className="material-icons">person</span>
                <span>{user.name}</span>
              </div>
              <button onClick={() => navigate('/dashboard')} className="dashboard-btn">
                <span className="material-icons">dashboard</span>
                Личный кабинет
              </button>
              <button onClick={handleLogout} className="logout-btn">
                <span className="material-icons">logout</span>
                Выйти
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="login-btn">
                <span className="material-icons">person</span>
                Вход
              </button>
              <button onClick={() => navigate('/register')} className="register-btn">
                Регистрация
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;