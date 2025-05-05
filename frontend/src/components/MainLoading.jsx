import React from 'react'

const MainLoading = () => {
  return (
    <div className='main-loading' style={{position: 'absolute', width: '100%', 
        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#ECE6D9', zIndex: '100', 
    }}>
        <div className='loader'></div>
    </div>
  )
}

export default MainLoading