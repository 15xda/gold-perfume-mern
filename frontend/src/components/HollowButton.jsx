import React from 'react'

const HollowButton = ({text}) => {
  return (
    <div className='hollow-button'>
        <button>
            <span>{text}</span>
        </button>
    </div>
  )
}

export default HollowButton