import React from 'react'
import { useNavigate } from 'react-router-dom';



const BuyNowButton = ({product}) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/checkout/buy-now', {state: {product}})
  }

  return (
    <div className='buy-now-button' onClick={handleBuyNow}>
        <span>Заказать только этот товар</span>
    </div>
  )
}

export default BuyNowButton