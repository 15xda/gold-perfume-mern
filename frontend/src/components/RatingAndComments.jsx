import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RatingAndComments = ({ product }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await api.post('/products/rating', {
        productId: product.id,
        comment,
        rating,
      });

      toast.success(response.data.message);
      setComment('');
      navigate(0);
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error(error.response?.data?.message || 'Ошибка при отправке рейтинга');
    }
  };

  const handleCommentDelete = async () => {
    try {
      const response = await api.post('/products/delete-rating', {
          productId: product.id,
        });

      toast.success(response.data.message);
      navigate(0);
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error(error.response?.data?.message || 'Ошибка при удалении комментария');
    }
  }

  if (!user.data) {
    return (
      <div className="rating-and-comments">
        <h4>Пожалуйста, <a href="/login">войдите в систему</a>, чтобы оставить комментарий.</h4>
      </div>
    );
  }
    
  // Check if the current user already commented
  const userComment = product.productComments.find(
    (comment) => comment.userId === user.data.id
  );

  return (
    <div className="rating-and-comments">
      {userComment ? (
        <>
          <h3>Вы уже оценили этот товар:</h3>
          <div className="user-note">
            <div className="user-note-text">
              <h4>Ваш отзыв:</h4>
              <p>{userComment.comment}</p>
            </div>
            <div className="user-note-rating">
              <h4>Рейтинг: {'★ '.repeat(userComment.rating)}</h4>
            </div>
            <div className="delete-rating" onClick={() => handleCommentDelete()}>
              <span className="material-icons">close</span>
            </div>
          </div>
        </>
      ) : (
        <div className="rating-and-comments-main">
          <div className="rating">
            <span>Оцените этот товар:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'selected' : ''}`}
                onClick={() => handleRatingClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <div className="comments">
            <textarea
              placeholder="Оставьте комментарий..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={100}
              rows={4}
            />
            <button
              onClick={handleCommentSubmit}
              disabled={!comment || rating === 0}
            >
              Отправить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const AllRatingsAndComments = ({product}) => {
    const user = useSelector(state => state.user);
    return (
        <div className="all-ratings-and-comments">
            <div className="all-ratings-and-comments-inner">
                <h3>Все рейтинги и комментарии</h3>
                {product.productComments.length > 0 ? (
                    <div className="all-ratings-boxes">
                        {product.productComments.map((comment, index) => (
                            <div key={index} id={index} className="side-user-note">
                                <div className="user-note-text">
                                    <h4>
                                        <span className="material-icons">person</span>
                                        {comment.userName}
                                    </h4>
                                    <p>{comment.comment}</p>
                                </div>
                                <div className="side-user-note-rating">
                                    <h4>Рейтинг: {'★ '.repeat(comment.rating)}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', margin: '50px auto'}}> 
                    <div className="no-comments">
                        <h4>Пока нет комментариев</h4>
                    </div>
                  </div>
                )}
            </div>
        </div>
    )
}

export default RatingAndComments;