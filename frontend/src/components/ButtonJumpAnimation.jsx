import React from 'react'

const ButtonJumpAnimation = ({text, color, onClick}) => {
  


  return (
    <div className='golden-button' >
        <button onClick={onClick} style={color === 'gold' ? {backgroundColor: '#DAAC61', boxShadow: '0 0 10px 0 rgba(218, 172, 97, 0.5)'} : {backgroundColor: '#0A5E55', boxShadow: '0 0 10px 0 rgba(10, 94, 85, 0.5)'}}>{text}</button>
    </div>
  )
}

export default ButtonJumpAnimation