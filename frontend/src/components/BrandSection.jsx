import React from 'react'
import BrandCard from './BrandCard'
import { useNavigate } from 'react-router-dom'

const BrandSection = () => {
  const navigate = useNavigate();
  return (
      <div className='brand-section'>
        <div className='brand-section-title'>
            <span>Наши производители</span>
        </div>
        <div className='brand-section-container'>
            <BrandCard title='LUZI' onClick={() => navigate('/luzi')} image='src/images/logos/luzi-logo.png' />
            <BrandCard title='Givaudan' onClick={() => navigate('/givaudan')} image='src/images/logos/givaudan-logo.png' />
            <BrandCard title='Seluz' onClick={() => navigate('/seluz')} image='src/images/logos/seluz-logo.png' />
            <BrandCard title='Iberchem' onClick={() => navigate('/iberchem')} image='src/images/logos/iberchem-logo.png' />
            <BrandCard title='Symrise' onClick={() => navigate('/symrise')} image='src/images/logos/symrise-logo.png' />
        </div>
      <div/>
    </div>
  )
}

export default BrandSection