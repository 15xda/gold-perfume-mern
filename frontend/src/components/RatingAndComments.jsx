import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RatingAndComments = ({ product, productComments }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await api.post('/rating', {
        productId: product.id,
        userId: user.data.id,
        userName: user.data.name,
        comment,
        rating,
      });

      toast.success(response.data.message);
      setComment('');
      navigate(0);
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error(error.response?.data?.message || 'Error submitting rating');
    }
  };

  const handleCommentDelete = async () => {
    try {
      const response = await api.post('/delete-rating', {
          productId: product.id,
          userId: user.data.id,
        });

      toast.success(response.data.message);
      navigate(0);
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error(error.response?.data?.message || 'Error deleting comment');
    }
  }

  if (!user.data) {
    return (
      <div className="rating-and-comments">
        <h3>Please log in to leave a comment.</h3>
      </div>
    );
  }
    

  // Check if the current user already commented
  const userComment = productComments.find(
    (comment) => comment.userId === user.data.id
  );

  return (
    <div className="rating-and-comments">
      {userComment ? (
        <>
          <h3>You have already rated this item:</h3>
          <div className="user-note">
            <div className="user-note-text">
              <h4>Your Note:</h4>
              <p>{userComment.comment}</p>
            </div>
            <div className="user-note-rating">
              <h4>Rating: {'★ '.repeat(userComment.rating)}</h4>
            </div>
            <div className="delete-rating" onClick={() => handleCommentDelete()}>
              <span className="material-icons">close</span>
            </div>
          </div>
        </>
      ) : (
        <div className="rating-and-comments-main">
          <div className="rating">
            <span>Rate this product:</span>
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
              placeholder="Leave a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={100}
              rows={4}
            />
            <button
              onClick={handleCommentSubmit}
              disabled={!comment || rating === 0}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const AllRatingsAndComments = ({productComments}) => {
    const user = useSelector(state => state.user);
    return (
        <div className="all-ratings-and-comments">
            <div className="all-ratings-and-comments-inner">
                <h3>All Ratings and Comments</h3>
                {productComments.length > 0 ? (
                    <div className="all-ratings-boxes">
                        {productComments.map((comment, index) => (
                            <div key={index} id={index} className="side-user-note">
                                <div className="user-note-text">
                                    <h4>
                                        <span className="material-icons">person</span>
                                        {comment.userName}
                                    </h4>
                                    <p>{comment.comment}</p>
                                </div>
                                <div className="side-user-note-rating">
                                    <h4>Rating: {'★ '.repeat(comment.rating)}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-comments">
                        <h4>No comments yet</h4>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RatingAndComments;
