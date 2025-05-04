import React, { useEffect, useRef, useState } from 'react';
import api from '../../api/axiosInstance';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { setVerification } from '../../storage/userSlice';
import { useDispatch } from 'react-redux';

const EmailConfirmation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const dispatch = useDispatch();
  let decodedToken = null;
  const confirmationAttempted = useRef(false);

  useEffect(() => {

    if (confirmationAttempted.current) {
      return;
    }

    try {
      decodedToken = token ? jwtDecode(token) : null;
    } catch (e) {
      toast.error('Недопустимый токен');
      navigate('/');
      return;
    }

    const confirmEmail = async () => {
      confirmationAttempted.current = true;
      try {
        const response = await api.post('/auth/confirm-email-verification', { token });
        toast.success(response.data.message);
        dispatch(setVerification(true))
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Ошибка при подтверждении');
        navigate('/');
        console.log(error?.response?.data)
      } finally {
        setIsLoading(false);
      }
    };

    confirmEmail();
  }, [token, navigate, dispatch]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Подтверждение Email: {decodedToken?.email}</h1>
        {isLoading ? (
          <div className='loader'></div>
        ) : (
          <div className="auth-success">
            <span className="material-icons success-icon">check_circle</span>
            <p>Email успешно подтверждён</p>
            <Link to='/' className="back-home-link">На главную</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmation;
