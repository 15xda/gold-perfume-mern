import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';
import {jwtDecode} from 'jwt-decode';
import { useDispatch } from 'react-redux';
import zxcvbn from 'zxcvbn';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Get token from URL
  const decodedToken = token ? jwtDecode(token) : null;
  const [passwordStrength, setPasswordStrength] = useState();
  const [passwordScore, setPasswordScore] = useState(0);
  const [style, setStyle] = useState({ display: 'none' });

  console.log('Decoded token:', decodedToken);

  useEffect(() => {
    if (!token) {
      toast.error('Недопустимая ссылка сброса пароля');
      navigate('/login');
    }
  }, [token, navigate]);



  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
        setPasswordScore(zxcvbn(value).score);
        setStyle({ margin: '15px 0', fontSize: '14px', display: 'block' });
    
        switch (passwordScore) {
            case 0: setPasswordStrength('❌ Очень слабый'); break;
            case 1: setPasswordStrength('⚠️ Слабый'); break;
            case 2: setPasswordStrength('🟡 Средний'); break;
            case 3: setPasswordStrength('✅ Хороший'); break;
            case 4: setPasswordStrength('💪 Надёжный'); break;
            default: setPasswordStrength('❓ Неизвестно'); break;
        }
        }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Пароли не совпадают');
    }

    try {
      setIsLoading(true);
      const response = await api.post('/reset-password/confirm', {
        token,
        password: formData.password,
      });

      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error('Reset error:', error);
      toast.error(error.response?.data?.message || 'Ошибка при сбросе пароля');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Сброс пароля</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Новый пароль"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Повторите пароль"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
            <p style={style}>Password Strength: {passwordStrength}</p>
          <button type="submit" className="auth-submit" disabled={isLoading || passwordScore < 2}>
            {isLoading ? '⏳ Сохраняем...' : 'Сбросить пароль'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
