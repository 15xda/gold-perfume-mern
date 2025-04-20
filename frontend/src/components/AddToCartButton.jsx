import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../api/axiosInstance'
import { toast } from 'react-toastify';
import { setCart } from '../storage/userSlice'


const AddToCartButton = ({productId, quantity}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user?.data);
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
        setIsLoading(true)
        const response = await api.post('/add-to-cart', { itemId: productId, quantity: quantity || 1 });
        toast.success(response.data.message);
        dispatch(setCart(response.data.cart))
        setIsLoading(false);
    } catch (error) {
        console.error(error)
        toast.error(error.response?.data?.message || 'Пожалуйста, войдите, чтобы добавить в корзину');
        setIsLoading(false);
    }
  }

  const productInCart = user && user.cart?.some((item) => item === productId);

  return (
    <div className='add-to-cart-button' onClick={handleAddToCart}>
        {isLoading ? <div className='loader-small'></div>
        : 
        <>
          <span className='material-icons'>shopping_cart</span>
          <span>Add to Cart</span>
        </>
        }
    </div>
  )
}

export default AddToCartButton