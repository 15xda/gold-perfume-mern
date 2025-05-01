import React from 'react'
import ButtonJumpAnimation from './ButtonJumpAnimation'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const slideRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
}

export default function BigPreviewer() {
  const navigate = useNavigate();
  return (
    <div className='bigpreviewer'>
        <div className='bigpreviewer-main-container'>
            <motion.section 
              initial='hidden' 
              whileInView='visible' 
              variants={slideRight} 
              viewport={{once:true}}>

              <div className='bigpreviewer-text'>
                <h1>Магазин Эксклюзивных Парфюмерных Масел</h1>
                <p>Высококачественные масла от мировых производителей для оптовых закупок и создания уникальных брендов.</p>
                <ButtonJumpAnimation text='Посмотреть Каталог' color='gold' onClick={() => navigate('/products')}/>
              </div>
            </motion.section>  

            <div className='bigpreviewer-image'>
              <div className='video-container'>
                <video src="/videos/intro.mp4" controls></video>
              </div>
            </div>
        </div>
    </div>
  )
}
