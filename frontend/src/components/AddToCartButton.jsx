import React from 'react'

const AddToCartButton = ({onClick}) => {
  return (
    <div className='add-to-cart-button' onClick={onClick}>
        <span className='material-icons'>shopping_cart</span>
        <span>Add to Cart</span>
    </div>
  )
}

export default AddToCartButton