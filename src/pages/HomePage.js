import React from 'react'

import Hero from '../components/Home/Hero.js'
import Footer from '../components/Home/Footer.js'
import HomeHeader from "../components/HomeHeader";

import Opciones from '../components/Home/Opciones.js'
import Navbar from '../components/Home/Navbar.js'
import NavLateral from '../components/Home/NavLateral.js'

export default function HomePage() {
  return (
    <>
    <div className="drawer text-xl">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        
        <div className="drawer-content flex flex-col">
          <HomeHeader/>
{/*
            <Navbar>
                <Opciones />
            </Navbar>
          */}
        
            <Hero />
            <Footer />
        </div> 
        {/*
        <NavLateral>
            <Opciones />
        </NavLateral>
      */}

    </div>

    </>
  )
}