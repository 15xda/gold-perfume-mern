import React from 'react'

const ButtonJumpAnimation = ({text, color, onClick}) => {
  


  return (
    <div className='golden-button' >
        <button onClick={onClick}>{text}</button>
    </div>
  )
}

export default ButtonJumpAnimation