import React from 'react'
import ButtonJumpAnimation from './ButtonJumpAnimation'
import { motion } from 'framer-motion'
import VideoEmbed from './VideoEmbed'

const slideRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
}

export default function BigPreviewer() {
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
                <ButtonJumpAnimation text='Посмотреть Каталог' color='gold' />
              </div>
            </motion.section>  

            <div className='bigpreviewer-image'>
              <div className='video-container'>
                <iframe
                  src="https://vk.com/video_ext.php?oid=-211095776&id=456239221&hash=8d6f22975045c475"
                  title="VK Video"
                  frameBorder="0"
                  allow="encrypted-media; fullscreen"
                ></iframe>
              </div>
            </div>
        </div>
    </div>
  )
}
