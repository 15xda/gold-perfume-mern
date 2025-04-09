import React from 'react'

const FourBlockContent = (text, image) => {
  return (
    <div className='four-block-content'>
        <div className='four-block-content-text'>
            <span>Lorem ipsum dolor sit amet.</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>
        <div className='four-block-content-image'>
            <img src='https://placehold.co/600x200' alt='image' />
        </div>
        <div className='four-block-content-image'>
            <img src='https://placehold.co/600x200' alt='image' />
        </div>
        <div className='four-block-content-text'>
            <span>Lorem ipsum dolor sit amet.</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>
        
    </div>
  )
}

export default FourBlockContent