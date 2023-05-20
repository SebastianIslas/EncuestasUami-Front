import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo24 from "../components/common/Logo24";
import {AuthContextAlumnos} from "../context/AuthContextAlumnos.js";

// Head Board


function HomeHeader({}) {
  const {logout, state} = useContext(AuthContextAlumnos)
  const {pathname, hash} = useLocation()
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  console.log("login", state);
  return (
    <>
      <div>
        <div className="navbar bg-base-100 space-x-4 flex flex-col md:flex-row">
          <div className="flex-none">
            <Logo24/>
          </div>
          <div className="px-2 mx-2 text-4xl"><strong>Encuestas UAMI</strong></div>

          
          {/*Board options*/}
          <div className="grid md:navbar bg-base-100">        
            {/*Vista movil*/}
            <div className="flex justify">
              <div className="dropdown md:hidden relative">
                <div className="btn" onClick={() => {toggleMenu()}}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <ul className={`menu bg-base-100 shadow-lg rounded-md py-1 w-48 absolute right-0 z-10 ${menuOpen ? 'block' : 'hidden'}`}>
                  <li><Link className={(pathname === '/' && !hash) ? 'active' : ''} to='/'>Inicio</Link></li>
                  <li><Link className={pathname === '/encuesta' ? 'active' : ''} to="/encuesta">Encuesta</Link></li>
                  <li><Link className={pathname === '/estadisticas' ? 'active' : ''} to="/estadisticas">Estadísticas</Link></li>
                  {!state.isLoggedIn ? 
                    <li><Link className={(pathname === '/login' && !hash) ? 'active' : ''} to='/login'>Login</Link></li>
                  : 
                    <li><Link to='/' onClick={()=> logout()}>Cerrar sesión</Link></li>
                  }
                </ul>
              </div>
            </div>
            
            <ul className="menu hidden md:flex items-center md:menu-horizontal text-ml w-fit md:text-xl p-0">
              <li><Link className={(pathname === '/' && !hash) ? 'active' : ''} to='/'>Inicio</Link></li>
              <li><Link className={pathname === '/encuesta' ? 'active' : ''} to="/encuesta">Encuesta</Link></li>
              <li><Link className={pathname === '/estadisticas' ? 'active' : ''} to="/estadisticas">Estadísticas</Link></li>
              {!state.isLoggedIn ? 
                <li><Link className={(pathname === '/login' && !hash) ? 'active' : ''} to='/login'>Login</Link></li>
              : 
                <li><Link to='/' onClick={()=> logout()}>Cerrar sesión</Link></li>
              }
            </ul>
          </div>
        </div>

      </div>
    </>
  );
}

export default HomeHeader
