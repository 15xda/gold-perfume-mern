import React, { useState } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import zxcvbn from 'zxcvbn';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';
import { logoutGlobal } from '../../api/logout';
import { replaceUserData, setAddresses } from '../../storage/userSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('profile');
  const [addingAddress, setAddingAddress] = useState(false);
  const user = useSelector((state) => state.user.data);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordStrengthText, setPasswordStrengthText] = useState('❓ Неизвестно');
  const [passwordError, setPasswordError] = useState('');

  const updatePasswordForm = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...passwordForm, [name]: value };
    setPasswordForm(updatedForm);

    if (name === 'newPassword') {
      const result = zxcvbn(value);
      setPasswordScore(result.score);

      switch (result.score) {
        case 0: setPasswordStrengthText('❌ Очень слабый'); break;
        case 1: setPasswordStrengthText('⚠️ Слабый'); break;
        case 2: setPasswordStrengthText('🟡 Средний'); break;
        case 3: setPasswordStrengthText('✅ Хороший'); break;
        case 4: setPasswordStrengthText('💪 Надёжный'); break;
        default: setPasswordStrengthText('❓ Неизвестно');
      }
    }

    if (
      name === 'confirmPassword' && value !== updatedForm.newPassword ||
      name === 'newPassword' && updatedForm.confirmPassword && updatedForm.confirmPassword !== value
    ) {
      setPasswordError('❌ Пароли не совпадают');
    } else {
      setPasswordError('');
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const res = await api.post('/auth/update-password', passwordForm);
      toast.success(res.data.message);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordScore(0);
      setPasswordStrengthText('');
      setPasswordError('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Ошибка при смене пароля');
    }
  };

  const [addressForm, setAddressForm] = useState({
    city: '', 
    street: '',
    house: '', 
    zip: '',
  })

  const handleAddressFieldChange = (e) => {
    const {name, value} = e.target;
    setAddressForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const [userData, setUserData] = useState({
    name: user.name,
    telephone: user.telephone,
  });

  const handleUserDataChange = (e) => {
    const {name, value} = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const updateUserData = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/user/update-user-info', userData);
      dispatch(replaceUserData(res.data.user))
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const saveAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/user/add-address', {
        address: `${addressForm.city}, ${addressForm.street}, ${addressForm.house}, ${addressForm.zip}`, 
        userId: user.id,
      })
      dispatch(setAddresses(res.data.addresses));
      setAddingAddress(false);
      toast.success('Адрес успешно добавлен!')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const deleteAddress = async (address) => {
    try {
      const res = await api.post('/user/delete-address', {address})
      dispatch(setAddresses(res.data.addresses))
      toast.success('Адрес успешно удален')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = async () => {
    await logoutGlobal();
    navigate(0);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="dashboard-content-section">
            <h2>Информация профиля</h2>
            <form onSubmit={updateUserData}>
              <div className="profile-form">
                <div className="form-group">
                  <label>Полное имя</label>
                  <input type="text" required defaultValue={user.name} name='name' onChange={handleUserDataChange} />
                </div>
                <div className="form-group">
                  <label>Телефон</label>
                  <input type="tel" defaultValue={user.telephone} name='telephone' onChange={handleUserDataChange}  placeholder='Пример: +123 456 789 000'/>
                </div>
                <button type='submit' className="dashboard-button">Обновить профиль</button>
                </div>
            </form>
          </div>
        );

      case 'orders':
        return (
          <div className="dashboard-content-section">
            <h2>История заказов</h2>
            <div className="orders-list">
              {user.orders && user.orders.length > 0 ? user.orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <span>Заказ #{order.id}</span>
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p>Дата: {order.date}</p>
                    <p>Итого: ${order.total}</p>
                  </div>
                  <button className="view-order-button">Просмотр деталей</button>
                </div>
              )) : <p>Нет доступных заказов. Сделайте первый заказ, чтобы увидеть его здесь.</p>}
            </div>
          </div>
        );

        case 'addresses':
          return (
            <div className="dashboard-content-section">
              <h2>Сохраненные адреса</h2>
              <div className="addresses-list">
                {!addingAddress && user.addresses && user.addresses.map((address, index) => (
                  <div key={index} className="address-card">
                    <div className="address-type">{address}</div>
                    <div className="address-actions">
                      <button className="delete-button" onClick={() => deleteAddress(address)}>Удалить</button>
                    </div>
                  </div>
                ))}
        
                <div>
                  {addingAddress ? (
                    <div className='add-address-container'>
                      <form className="profile-form" onSubmit={saveAddress}>
                        <div className="form-group">
                          <label>Город</label>
                          <input 
                            type="text" 
                            name="city"
                            onChange={handleAddressFieldChange}
                            placeholder="Введите город"
                          />
                        </div>
                        <div className="form-group">
                          <label>Улица</label>
                          <input 
                            type="text" 
                            name="street"
                            onChange={handleAddressFieldChange}
                            placeholder="Введите улицу"
                          />
                        </div>
                        <div className="form-group">
                          <label>Дом</label>
                          <input 
                            type="text" 
                            name="house"
                            onChange={handleAddressFieldChange}
                            placeholder="Номер дома"
                          />
                        </div>
                        <div className="form-group">
                          <label>Индекс</label>
                          <input 
                            type="text" 
                            name="zip"
                            onChange={handleAddressFieldChange}
                            placeholder="Почтовый индекс"
                          />
                        </div>
                        <div className="address-actions">
                          <button type="submit" className="dashboard-button">Сохранить</button>
                          <button type="button" className="delete-button" onClick={() => setAddingAddress(false)}>Отмена</button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <button 
                      className="add-address-button"
                      onClick={() => setAddingAddress(true)}
                    > 
                      <span className="material-icons">add</span> Добавить адрес 
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        

      case 'security':
        return (
          <div className="dashboard-content-section">
            <h2>Настройки безопасности</h2>
            <div className="security-form">
              <div className="form-group">
                <label>Текущий пароль</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={updatePasswordForm}
                />
              </div>
              <div className="form-group">
                <label>Новый пароль</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={updatePasswordForm}
                />
              </div>
              <div className="form-group">
                <label>Подтвердите новый пароль</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={updatePasswordForm}
                />
              </div>

              {passwordError && <p style={{ color: 'red', fontSize: '14px' }}>{passwordError}</p>}
              <p style={{ margin: '10px 0', fontSize: '14px' }}>Надёжность пароля: {passwordStrengthText}</p>

              <button
                className="dashboard-button"
                disabled={passwordScore < 2 || passwordError !== ''}
                onClick={() => updatePassword(passwordForm.currentPassword, passwordForm.newPassword)}
              >
                Изменить пароль
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="user-info">
            <span className="material-icons user-icon">account_circle</span>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <nav className="dashboard-nav">
            <button
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="material-icons">person</span>
              Профиль
            </button>
            <button
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span className="material-icons">shopping_bag</span>
              Заказы
            </button>
            <button
              className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <span className="material-icons">location_on</span>
              Адреса
            </button>
            <button
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <span className="material-icons">security</span>
              Безопасность
            </button>
            <button
              className="nav-item logout"
              onClick={handleLogout}
            >
              <span className="material-icons">logout</span>
              Выход
            </button>
          </nav>
        </div>
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;