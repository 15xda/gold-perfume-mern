import React from 'react'
import Preheader from '../Preheader'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import FixedFooter from '../FixedFooter'
const Layout = () => {
  return (
    <div>
        <Preheader />
        <Header />
        <main><Outlet /></main>
        <FixedFooter />
        <Footer />
    </div>
  )
}

export default Layout