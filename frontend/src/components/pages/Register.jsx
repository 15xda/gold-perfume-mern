import React, { useState } from 'react';
import { Link, replace, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import zxcvbn from 'zxcvbn';

const apiUrl = import.meta.env.VITE_API_URL;



const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [psStrengthStyle, setPsStrengthStyle] = useState({ display: 'none' });
  const [passwordScore, setPasswordScore] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordScore(zxcvbn(value).score);
      setPsStrengthStyle({ margin: '15px 0', fontSize: '14px', display: 'block' });

      switch (passwordScore) {
        case 0: setPasswordStrength('❌ Очень слабый'); break;
        case 1: setPasswordStrength('⚠️ Слабый'); break;
        case 2: setPasswordStrength('🟡 Средний'); break;
        case 3: setPasswordStrength('✅ Хороший'); break;
        case 4: setPasswordStrength('💪 Надёжный'); break;
        default: setPasswordStrength('❓ Неизвестно'); break;
      }
    }

    if (name === 'confirmPassword' || name === 'password') {
      if (
        name === 'confirmPassword' && value !== formData.password ||
        name === 'password' && formData.confirmPassword && formData.confirmPassword !== value
      ) {
        setPasswordMatchError('❌ Пароли не совпадают');
      }
       else {
        setPasswordMatchError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, formData);
      toast.success(response.data.message);
      navigate('/login', replace);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Ошибка при регистрации');
      console.error('Ошибка при регистрации:', error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
      <div className='auth-logo'><img src="/images/logo-dark-font.png" alt="" /></div>
        <h1>Создать аккаунт</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Полное имя"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Подтвердите пароль"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {passwordMatchError && <p style={{ color: 'red', fontSize: '14px' }}>{passwordMatchError}</p>}
          <p style={psStrengthStyle}>Надёжность пароля: {passwordStrength}</p>

          <button type="submit" className="auth-submit" disabled={isLoading || passwordScore < 2}>
            {isLoading ? <div className='loader-small'></div> : 'Зарегистрироваться'}
          </button>
        </form>
        <div className="auth-links">
          <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
