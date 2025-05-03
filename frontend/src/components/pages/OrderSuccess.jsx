import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const orderDetails = useSelector((state) => state.order?.orderDetails);

  useEffect(() => {
    if (!orderDetails) {
      navigate('/');
    }
  }, [orderDetails, navigate]);

  if (!orderDetails) {
    return null;
  }

  return (
    <div className="order-success-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="order-success-card"
      >
        <div className="order-success-header">
          <FaCheckCircle className="success-icon" />
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
              <span className="detail-label">Order Number:</span>
              <span className="detail-value">{orderDetails.orderNumber}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Order Date:</span>
              <span className="detail-value">
                {new Date(orderDetails.orderDate).toLocaleDateString()}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Total Amount:</span>
              <span className="detail-value">${orderDetails.totalAmount}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Payment Method:</span>
              <span className="detail-value">{orderDetails.paymentMethod}</span>
            </div>
          </div>
        </div>

        <div className="order-section">
          <h3 className="section-title">
            Shipping Information
          </h3>
          
          <div className="shipping-info">
            <p className="shipping-text">
              {orderDetails.shippingAddress.street}
            </p>
            <p className="shipping-text">
              {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}
            </p>
            <p className="shipping-text">
              {orderDetails.shippingAddress.country}
            </p>
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