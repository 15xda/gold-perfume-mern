import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../storage/userSlice';
import { setAccessToken } from '../../storage/authSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, formData, { withCredentials: true });
      dispatch(setUser(response.data.userData));
      dispatch(setAccessToken(response.data.accessToken));
      toast.success(response.data.message);

      // After login, redirect to the page the user was trying to access, or home by default
      const from = location.state?.from || '/'; // Default to home if no redirect path stored
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo"><img src="src/images/logo-dark-font.png" alt="" /></div>
        <h1>Добро пожаловать</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Электронная почта"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-submit" disabled={isLoading || !formData.email || !formData.password}>  
            {isLoading ? <div className="loader-small"></div> : 'Войти'}
          </button>
        </form>
        <div className="auth-links">
          <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
          <p className="forgot-password"><Link to="/forgot-password">Забыли пароль?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
