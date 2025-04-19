import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import zxcvbn from 'zxcvbn';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const user = useSelector((state) => state.user.data);

  const [passwordForm, setPasswordForm] = useState({
    email: user.email,
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
      const res = await api.post('/update-password', passwordForm);
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

  const [userData, setUserData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    phone: "",
    orders: [
      { id: '1', date: '2024-03-15', status: 'Delivered', total: 129.99 },
      { id: '2', date: '2024-03-10', status: 'Processing', total: 89.99 },
    ],
    addresses: [
      {
        id: 1,
        type: 'Home',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001'
      }
    ]
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="dashboard-content-section">
            <h2>Profile Information</h2>
            <div className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" defaultValue={userData.name} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue={userData.email} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" defaultValue={userData.phone} />
              </div>
              <button className="dashboard-button">Update Profile</button>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="dashboard-content-section">
            <h2>Order History</h2>
            <div className="orders-list">
              {userData.orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <span>Order #{order.id}</span>
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p>Date: {order.date}</p>
                    <p>Total: ${order.total}</p>
                  </div>
                  <button className="view-order-button">View Details</button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="dashboard-content-section">
            <h2>Saved Addresses</h2>
            <div className="addresses-list">
              {userData.addresses.map(address => (
                <div key={address.id} className="address-card">
                  <div className="address-type">{address.type}</div>
                  <div className="address-details">
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zip}</p>
                  </div>
                  <div className="address-actions">
                    <button className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
                  </div>
                </div>
              ))}
              <button className="add-address-button">
                <span className="material-icons">add</span>
                Add New Address
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="dashboard-content-section">
            <h2>Security Settings</h2>
            <div className="security-form">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={updatePasswordForm}
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={updatePasswordForm}
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
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
                Change Password
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
            <h3>{userData.name}</h3>
            <p>{userData.email}</p>
          </div>
          <nav className="dashboard-nav">
            <button
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="material-icons">person</span>
              Profile
            </button>
            <button
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span className="material-icons">shopping_bag</span>
              Orders
            </button>
            <button
              className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <span className="material-icons">location_on</span>
              Addresses
            </button>
            <button
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <span className="material-icons">security</span>
              Security
            </button>
            <button
              className="nav-item logout"
              onClick={() => navigate('/login')}
            >
              <span className="material-icons">logout</span>
              Logout
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
