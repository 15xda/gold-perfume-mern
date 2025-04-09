import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='not-found-container'>
        <div className='not-found-content'>
            <h1>404</h1>
            <p>Page Not Found</p>
        </div>
    </div>
  )
}

export default NotFound