import React, { useContext, useEffect, useState } from 'react';
import AddToCartButton from './AddToCartButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { setFavourites, setCart } from '../storage/userSlice';


const ProductCard = ({product}) => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favsState = user.data?.favourites || [];
  const cartState = user.data?.cart || [];

  const averageRating = product.ratingsFromDatabase.length > 0 ? product.ratingsFromDatabase.reduce((acc, rating) => acc + rating.rating, 0) / product.ratingsFromDatabase.length : 0;

  const handleAddToFavourite = async () => {
    try {
      const response = await api.post('/add-to-favorite', { itemId: product.id, userId: user.data.id });
      toast.success(response.data.message);
      dispatch(setFavourites(response.data.favourites))

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add to favourites, please authorize.');
    }
  };

  const handleProductClick = () => {
    navigate(`/product?prId=${product.id}`)
  }


  return (
    <div className='product-container'>
      <div className='product-image-container'>
        <img
          src={'https://media.istockphoto.com/id/1214012618/vector/spray-bottle-with-transparent-cap-mockup-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=mTcNdKvFukD9WPEkoKGfrnBqHhHNDkgoC0i-QZGHqho='}
          alt={product.name}
          className='product-image'
        />
        <div 
            className='product-heart-button' 
            onClick={handleAddToFavourite} 
            style={favsState.includes(product.id) ? {display: 'block'} : {}}
          >
            <span className="material-icons">
              {favsState.includes(product.id) ? 'favorite' : 'favorite_border'}
            </span>
        </div>
      </div>
      <div className='product-details-container'>
        <h1 onClick={handleProductClick}>
          {product.name.length > 20 ? product.name.substring(0, 30) + '...' : product.name}
        </h1>
        <p>{product.salePrices[0].value} ₽</p>
        <p style={{fontSize: '14px'}}>{(averageRating).toString().slice(0, 3)} ★ ({product.ratingsFromDatabase.length} ratings)</p>
      </div>
      <div className='product-buttons-container'>
        <AddToCartButton productId={product.id}/>
      </div>
    </div>
  );
};

export default ProductCard;
