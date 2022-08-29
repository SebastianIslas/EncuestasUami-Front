import React from 'react'
import { Link } from 'react-router-dom'

import Trolleando from './Trolleando.js'
import Hero from './Hero.js'
import Footer from './Footer.js'

export default function NavBarDaisy() {
  return (
    <>
    <div className="drawer text-xl">
    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
    <div className="drawer-content flex flex-col">
    
        <div className="w-full min-h-max navbar bg-base-300">
            <div className="flex-none lg:hidden">
                <label for="my-drawer-3" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div> 
            <div className="flex-1 px-2 mx-2 text-5xl"><strong>Encuestas UAMI</strong></div>
            <div className="flex-none hidden lg:block">
                <ul className="menu menu-horizontal">
        
                <li><Link to="/login">Login</Link></li>
                <li><a>Estadísticas</a></li>
                <li><a>UEAs Abiertas</a></li>
                </ul>
            </div>
        </div>

       
        <Trolleando />
        <Footer />

    </div> 
    <div className="drawer-side">
        <label for="my-drawer-3" className="drawer-overlay"></label> 
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
       
            <li><Link to="/login">Login</Link></li>
            <li><a>Estadísticas</a></li>
            <li><a>UEAs Abiertas</a></li>
        
        </ul>
    </div>

    </div>

    </>
  )
}
