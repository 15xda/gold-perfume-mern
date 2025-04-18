import React from 'react'
import BrandCard from './BrandCard'
import { useNavigate } from 'react-router-dom'

const BrandSection = () => {
  const navigate = useNavigate();
  return (
      <div className='brand-section'>
        <div className='brand-section-title'>
            <span>Наши бренды</span>
        </div>
        <div className='brand-section-container'>
            <BrandCard title='LUZI' onClick={() => navigate('/luzi')} image='https://static.wixstatic.com/media/7c5edf_672ddff4258449f1b3d2b102dec3e880~mv2.png/v1/fit/w_2500,h_1330,al_c/7c5edf_672ddff4258449f1b3d2b102dec3e880~mv2.png' />
            <BrandCard title='Givaudan' onClick={() => navigate('/givaudan')} image='https://www.givaudan.com/sites/givaudanweb.int/files/styles/convert_to_jpg/public/2022-01/GIV_LT_B_RGB_685x685.jpg?itok=e76igyAq' />
            <BrandCard title='Seluz' onClick={() => navigate('/seluz')} image='https://yt3.googleusercontent.com/ytc/AIdro_nEhqF6pfefGzyhem05Di7aJI4voK-EGf-Mdk-NqhE-Eg=s900-c-k-c0x00ffffff-no-rj' />
            <BrandCard title='Firmenich' onClick={() => navigate('/firmenich')} image='https://www.firmenich.com/sites/default/files/dam-medias/2020-17/Firmenich%20For%20Good%20Naturally%20Logo_blue_wobaseline.png' />
            <BrandCard title='Symrise' onClick={() => navigate('/symrise')} image='https://yt3.googleusercontent.com/ytc/AIdro_lU4jPGObstHDXAPr2ORb4iwLRwq97oJZBZn6eNgmWXOQ=s900-c-k-c0x00ffffff-no-rj' />
        </div>
      <div/>
    </div>
  )
}

export default BrandSection