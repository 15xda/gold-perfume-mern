import React from 'react'
import BigPreviewer from '../BigPreviewer'
import ProductRecommender from '../ProductRecommender'
import FourBlockContent from '../FourBlockContent'
import BrandSection from '../BrandSection'
import FAQ from '../FAQ';
import { motion } from 'framer-motion'



const Home = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <>
      <motion.section initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeUp}>
        <BigPreviewer />
      </motion.section>

      <motion.section initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeUp}>
        <ProductRecommender />
      </motion.section>

      <motion.section initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeUp}>
        <FourBlockContent text='Lorem ipsum dolor sit amet.' />
      </motion.section>

      <motion.section initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeUp}>
        <BrandSection />
      </motion.section>
      <motion.section initial='hidden' whileInView='visible' viewport={{ once: true }} variants={fadeUp}>
        <FAQ />
      </motion.section>    
    </>
  )
}

export default Home