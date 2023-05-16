import React from 'react'

import Hero from '../components/Home/Hero.js'
import Footer from '../components/Home/Footer.js'

export default function HomePage() {
  return (
    <>
    <div className="drawer text-xl">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        
        <div className="drawer-content flex flex-col">        
            <Hero />
            <Footer />
        </div>
    </div>

    </>
  )
}