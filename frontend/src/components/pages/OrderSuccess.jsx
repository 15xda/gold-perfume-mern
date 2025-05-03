import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderForm } = location.state || {};

  if (!orderForm) {
    return navigate('/');
  }

  console.log(orderForm);

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
            Заказ успешно оформлен!
          </h2>
          <p className="success-message">
            Спасибо за ваш заказ! Мы скоро с вами свяжемся.
          </p>
        </div>

        <div className="order-section">
          <h3 className="section-title">
            Детали заказа
          </h3>

          <div className="details-grid">
            <div className="detail-row">
              <span className="detail-label">Номер заказа:</span>
              <span className="detail-value">{orderForm.orderId}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Дата оформления:</span>
              <span className="detail-value">
                {new Date(orderForm.date).toLocaleDateString()}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Сумма заказа:</span>
              <span className="detail-value">{orderForm.orderTotal} ₽</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Товаров в заказе:</span>
              <span className="detail-value">{orderForm.totalItems}</span>
            </div>
          </div>
        </div>

        <div className="order-section">
          <h3 className="section-title">
            Информация о клиенте
          </h3>

          <div className="details-grid">
            <div className="detail-row">
              <span className="detail-label">Имя:</span>
              <span className="detail-value">{orderForm.userInfo.name}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{orderForm.userInfo.email}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Телефон:</span>
              <span className="detail-value">{orderForm.userInfo.telephone}</span>
            </div>
          </div>
        </div>

        <div className="order-section">
          <h3 className="section-title">
            Адрес доставки
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
                <h4 className="note-title">Комментарий к заказу:</h4>
                <p className="note-content">{orderForm.userInfo.comment}</p>
              </div>
            )}
          </div>
        </div>

        <div className="order-section">
          <h3 className="section-title">
            Состав заказа
          </h3>

          <div className="order-items">
            {orderForm.products.map((product, index) => (
              <div key={index} className="product-item">
                <span className="product-name">{product.name}</span>
                <span className="product-quantity">{product.quantity} {product.uom}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button
            onClick={() => navigate('/dashboard')}
            className="primary-button"
          >
            Перейти к заказам
          </button>
          <button
            onClick={() => navigate('/')}
            className="secondary-button"
          >
            Продолжить покупки
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
