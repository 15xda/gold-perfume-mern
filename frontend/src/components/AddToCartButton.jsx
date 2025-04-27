import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../api/axiosInstance'
import { toast } from 'react-toastify';
import { setCart } from '../storage/userSlice'


const AddToCartButton = ({product, addAmount}) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [addQuantity, setAddQuantity] = useState(1);


  useEffect(() => {
    const productUOM = product.uom?.name || '';

    if (productUOM === 'шт') {
        setAddQuantity(1)
    } else if (productUOM === 'г') {
        setAddQuantity(30)
    }
  }, [product]);


  const handleAddToCart = async () => {
    try {
        setIsLoading(true)
        const response = await api.post('/cart/add-to-cart', { itemId: product.id, quantity: addAmount ? addAmount : addQuantity});
        toast.success(response.data.message);
        dispatch(setCart(response.data.cart))
        setIsLoading(false);
    } catch (error) {
        console.error(error)
        toast.error(error.response?.data?.message || 'Пожалуйста, войдите, чтобы добавить в корзину');
        setIsLoading(false);
    }
  }

  return (
    <div className='add-to-cart-button' onClick={handleAddToCart}>
        {isLoading ? <div className='loader-small'></div>
        : 
        <>
          <span className='material-icons'>shopping_cart</span>
          <span>Добавить в корзину</span>
        </>
        }
    </div>
  )
}

export default AddToCartButton