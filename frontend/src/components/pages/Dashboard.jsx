import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const user = useSelector((state) => state.user.data);

  const userData = {
    name: user ? user.name : '',
    email: user ?  user.email : '',
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
  };

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
                <input type="password" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" />
              </div>
              <button className="dashboard-button">Change Password</button>
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
  )
}

export default Dashboard