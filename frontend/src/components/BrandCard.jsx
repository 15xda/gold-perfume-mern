import React from 'react'

const BrandCard = ({title, image, onClick}) => {
  return (
    <div>
        <div className='brand-card-container' onClick={onClick}>
            <div className='brand-card-image'>
                <img src={image} alt={title} />
            </div>
            <div className='brand-card-content'>
                <h3>{title}</h3>
            </div>
        </div>
    </div>
  )
}

export default BrandCard