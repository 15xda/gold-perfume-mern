import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../storage/userSlice';
import { setAccessToken } from '../../storage/authSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:4004/login', formData, {withCredentials: true});
      dispatch(setUser(response.data.userData));
      dispatch(setAccessToken(response.data.accessToken));

      console.log(response.data);
      toast.success(response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} className="auth-page">
      <div className="auth-container">
        <div className='auth-logo'><img src="src/images/logo.png" alt="" /></div>
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
            {isLoading ? '⏳ Входим...' : 'Войти'}
          </button>
        </form>
        <div className="auth-links">
          <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
          <p className="forgot-password"><Link to="/forgot-password">Забыли пароль?</Link></p>
        </div>
      </div>
    </motion.section>
  );
};

export default Login;
