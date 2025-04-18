import React from 'react'
import ButtonJumpAnimation from './ButtonJumpAnimation'
import { motion } from 'framer-motion'

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
                <div className='square-image-container'>
                  <div className='square-image-container-image'>
                    <img src='https://cdn.aromo.ru/upload/users_accounts_news_pictures/2c8/5asrg5z905uwlhcxdp660gmolk2esw4d/424661503-701634372152634-1530270099222053251-n.jpg' />
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}
