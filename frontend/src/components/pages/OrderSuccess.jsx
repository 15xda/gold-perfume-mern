import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {orderForm} = location.state || {} ;

  if (!orderForm) {
    return navigate('/');
  }

  console.log(orderForm)

  return (
    <div className="order-success-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="order-success-card"
      >
        <div className="order-success-header">
          
          <h2 className="success-title">
            Order Placed Successfully!
          </h2>
          <p className="success-message">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        <div className="order-section">
          <h3 className="section-title">
            Order Details
          </h3>
          
          <div className="details-grid">
            <div className="detail-row">
              <span className="detail-label">Order ID:</span>
              <span className="detail-value">{orderForm.orderId}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Order Date:</span>
              <span className="detail-value">
                {new Date(orderForm.date).toLocaleDateString()}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Total Amount:</span>
              <span className="detail-value">{orderForm.orderTotal} R</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Total Items:</span>
              <span className="detail-value">{orderForm.totalItems}</span>
            </div>
          </div>
        </div>

        <div className="order-section">
          <h3 className="section-title">
            Customer Information
          </h3>
          
          <div className="details-grid">
            <div className="detail-row">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{orderForm.userInfo.name}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{orderForm.userInfo.email}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Telephone:</span>
              <span className="detail-value">{orderForm.userInfo.telephone}</span>
            </div>
          </div>
        </div>

        <div className="order-section">
          <h3 className="section-title">
            Shipping Information
          </h3>
          
          <div className="shipping-info">
            <p className="shipping-text">
              {orderForm.userInfo.address}
            </p>
            {orderForm.userInfo.customAddress && (
              <p className="shipping-text">
                {orderForm.userInfo.customAddress}
              </p>
            )}
            {orderForm.userInfo.comment && (
              <div className="note-section">
                <h4 className="note-title">Additional Comments:</h4>
                <p className="note-content">{orderForm.userInfo.comment}</p>
              </div>
            )}
          </div>
        </div>

        <div className="order-section">
          <h3 className="section-title">
            Order Items
          </h3>
          
          <div className="order-items">
            {orderForm.products.map((product, index) => (
              <div key={index} className="product-item">
                <span className="product-name">{product.name}</span>
                <span className="product-quantity">x{product.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button
            onClick={() => navigate('/dashboard')}
            className="primary-button"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate('/')}
            className="secondary-button"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess; 