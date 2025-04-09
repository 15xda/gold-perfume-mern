import React from 'react'
import BrandCard from './BrandCard'
import { useNavigate } from 'react-router-dom'

const BrandSection = () => {
  const navigate = useNavigate();
  return (
      <div className='brand-section'>
        <div className='brand-section-title'>
            <span>Our Brands</span>
        </div>
        <div className='brand-section-container'>
            <BrandCard title='LUZI' onClick={() => navigate('/brand/luzi')} image='https://static.wixstatic.com/media/7c5edf_672ddff4258449f1b3d2b102dec3e880~mv2.png/v1/fit/w_2500,h_1330,al_c/7c5edf_672ddff4258449f1b3d2b102dec3e880~mv2.png' />
            <BrandCard title='Givaudan' onClick={() => navigate('/brand/givaudan')} image='https://www.givaudan.com/sites/givaudanweb.int/files/styles/convert_to_jpg/public/2022-01/GIV_LT_B_RGB_685x685.jpg?itok=e76igyAq' />
            <BrandCard title='Brand 3' image='https://placehold.co/200x200' />
            <BrandCard title='Brand 4' image='https://placehold.co/200x200' />
            
        </div>
      <div/>
    </div>
  )
}

export default BrandSection