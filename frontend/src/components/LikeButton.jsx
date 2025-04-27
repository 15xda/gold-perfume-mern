import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../api/axiosInstance'
import { toast } from 'react-toastify';
import { setFavourites } from '../storage/userSlice'

const LikeButton = ({productId}) => {


    const user = useSelector(state => state.user?.data);
    const dispatch = useDispatch()
    const userFavourites = user ? user.favourites : [];
    const productInFavourites = userFavourites.some((item) => item === productId);

    const handleAddToFavourite = async () => {
        try {
          const response = await api.post('/cart/add-to-favourite', { itemId: productId, userId: user.id});
          toast.success(response.data.message);
          dispatch(setFavourites(response.data.favourites))
    
        } catch (error) {
            console.error(error)
            toast.error(error?.response?.data?.message || 'Failed to add to favourites, please authorize.');
        }
    };

    return (
        <div className='heart-button' onClick={handleAddToFavourite}>
            <span className='material-icons' style={{backgroundColor: 'emerald'}}>{productInFavourites ? "favorite" : "favorite_border"}</span>
        </div>
    )
}

export default LikeButton