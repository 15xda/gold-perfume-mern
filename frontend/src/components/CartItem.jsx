import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { setCart } from "../storage/userSlice";
import { toast } from "react-toastify";



export const CartItem = ({ product }) => {
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.user?.data)
  const userCart = user?.cart;
  const productFromState = userCart.find(item => item.itemId === product.id);
  const [productCount, setProductCount] = useState(productFromState?.quantity || 1);
  

  const updateQuantity = async (newQuantity) => {
    setProductCount(newQuantity);
  
    try {
      const response = await api.put('/update-cart', {
        itemId: product.id,
        userId: user.id,
        quantity: newQuantity
      });
      dispatch(setCart(response.data.cart));
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleRemoveItem = async () => {
    try {
      const response = await api.put('/delete-from-cart', {itemId: product.id, userId: user.id})
      console.log(response.data);
      dispatch(setCart(response.data.cart))
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="cart-item-details">
        <h3>{product.name}</h3>
        <p className="cart-item-price">{product.price} ₽</p>
      </div>
      <div className="cart-item-quantity">
        <button onClick={() => productCount > 1 && updateQuantity(productCount - 1)}>-</button>
        <input type="number" value={productCount} readOnly/>
        <button onClick={() => productCount < 100 && updateQuantity(productCount + 1)}>+</button>
      </div>
      <div className="cart-item-total">
        {product.salePrices[0].value * productCount} ₽
      </div>
      <button className="cart-item-remove" onClick={handleRemoveItem}>
        <span className="material-icons">close</span>
      </button>
    </div>
  );
  }