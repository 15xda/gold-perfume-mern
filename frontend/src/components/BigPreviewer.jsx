import React from 'react'
import ButtonJumpAnimation from './ButtonJumpAnimation'

export default function BigPreviewer() {
  return (
    <div className='bigpreviewer'>
        <div className='bigpreviewer-main-container'>
            <div className='bigpreviewer-text'>
                <h1>Big Text</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                <ButtonJumpAnimation text='Shop Now' color='gold' />
            </div>
            <div className='bigpreviewer-image'>
                <div className='square-image-container'>
                  <div className='square-image-container-image'>
                    <img src='https://placehold.co/200x200' />
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}
