import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader';
import api from '../../api/axiosInstance';

const fetchCart = async (ids) => {
  if (!ids) return [];
  const response = await api.post('/product/batch', {productIds: ids});
  return response.data;
}

const Cart = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user?.data);
  const ids = user?.cart.map(item => item.itemId) || [];
  
  
  const {data, error, isLoading} = useQuery({
    queryKey: ['userCart', ids],
    queryFn: () => fetchCart(ids),
    enabled: !!ids.length,
  })

  if (isLoading) return <Loader/>;
  if (error) return <p>Error fetching Cart</p>;
  if (!user) return  <div className='loader-main'><h3>Please <a className='gold-link' href="/login">login</a> to view cart</h3></div>;
    
  const products = data || [];

  const subtotal = 20;
  const shipping = 10;
  const total = 10 + shipping;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p className="cart-count">{products.length} items</p>
        </div>
        
        {products.length > 0 ? (
          <div className="cart-content">
            <div className="cart-items">
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} ₽</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping.toFixed(2)} ₽</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{total.toFixed(2)} ₽</span>
              </div>
              <button className="checkout-button" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
              <button className="continue-shopping" onClick={() => navigate('/')}>
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-empty">
            <span className="material-icons">shopping_cart</span>
            <p>Your cart is empty</p>
            <button className="continue-shopping" onClick={() => navigate('/')}>
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart 
export {fetchCart}