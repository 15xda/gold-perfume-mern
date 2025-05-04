import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../api/axiosInstance';
import  { toast } from 'react-toastify';

const ConfirmHeader = () => {
  const user = useSelector((state) => state.user?.data);
  const isVerified = user && user.isVerified;
  const [hide, setHide] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const shouldHide =  !user || isVerified || hide;

  const handleConfirmEmailRequest = async () => {
    setIsloading(true);
    try {
        const response = await api.post('/auth/request-email-confirm-link', {email: user && user.email})
        toast.success(response.data?.message || 'Ссылка для подтверждения отправлена ​​на электронную почту.')
        setIsloading(false);
        setHide(true);
    } catch (error) {
        console.log(error)
        setIsloading(false);
    }
  }

  return (
    <div
      style={{ display: shouldHide ? 'none' : 'flex' }}
      className="confirm-header"
    >
      <span>Подтвердите свой Email для размещения заказов</span>

      <button 
        disabled={isLoading} 
        onClick={handleConfirmEmailRequest}>
          {isLoading ? <div className='loader-small'></div> 
          : "Отправить ссылку" }
      </button>

      <span className="material-icons" onClick={() => setHide(true)}>
        close
      </span>
    </div>
  );
};

export default ConfirmHeader;
