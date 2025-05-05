import React from 'react'
import Preheader from '../Preheader'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import FixedFooter from '../FixedFooter'
import { motion } from 'framer-motion';
import ConfirmHeader from '../ConfirmHeader'

const fadeUp = {
  hidden: { opacity: 0,},
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const Layout = () => {
  return (
    <div>
        
        <ConfirmHeader/>
        <Preheader />
        <Header />
        <main><Outlet /></main>
        <FixedFooter />
        <Footer />
    </div>
  )
}

export default Layout