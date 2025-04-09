import React from 'react'

export default function HeartButton({color}) {
  return (
    <div className='heart-button'>
        <span className='material-icons' style={{backgroundColor: color === 'gold' ? 'gold' : 'emerald'}}>favorite_border</span>
        
    </div>
  )
}

