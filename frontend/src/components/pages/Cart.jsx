import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../CartItem';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader';
import api from '../../api/axiosInstance';

export const fetchCart = async (ids) => {
  if (!ids) return [];
  const response = await api.post('/products/batch', { productIds: ids });
  return response.data;
};

const Cart = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.data);
  const cart = user?.cart || [];
  const ids = cart.map((item) => item.itemId);
  const [cartTotal, setCartTotal] = useState(0);

  const { data: products, error, isLoading } = useQuery({
    queryKey: ['userCart', ids],
    queryFn: () => fetchCart(ids),
    enabled: Array.isArray(ids) && ids.length > 0,
  });

  useEffect(() => {
    if (products && cart.length) {
      const total = cart.reduce((sum, cartItem) => {
        const product = products.find((p) => p.id === cartItem.itemId);
        if (!product) return sum;
        return sum + product.salePrices * cartItem.quantity;
      }, 0);
      setCartTotal(total);
    }
  }, [products, cart]);

  const shipping = 10;

  if (isLoading) return <Loader />;
  if (error) return <p>Ошибка при загрузке корзины</p>;
  if (!user) {
    return (
      <div className="loader-main">
        <h3>
          Пожалуйста, <a className="gold-link" href="/login">войдите</a>, чтобы просматривать корзину
        </h3>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Корзина покупок</h1>
          <p className="cart-count">{products?.length || 0} товаров</p>
        </div>

        {products?.length > 0 ? (
          <div className="cart-content">
            <div className="cart-items">
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>
            <div className="cart-summary">
              <h2>Итог заказа</h2>
              <div className="summary-row">
                <span>Промежуточный итог</span>
                <span>{cartTotal.toFixed(2)} ₽</span>
              </div>
              <div className="summary-row total">
                <span>Итого</span>
                <span>{cartTotal.toFixed(2)} ₽</span>
              </div>
              <button className="checkout-button" onClick={() => navigate('/checkout')}>
                Перейти к оформлению заказа
              </button>
              <button className="continue-shopping" onClick={() => navigate('/')}>
                Продолжить покупки
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-empty">
            <span className="material-icons">shopping_cart</span>
            <p>Ваша корзина пуста</p>
            <button className="continue-shopping" onClick={() => navigate('/')}>
              Начать покупки
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
