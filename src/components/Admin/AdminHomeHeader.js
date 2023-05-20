import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo24 from "../common/Logo24";
import ModalEncuesta from "./ModalEncuesta";
import { ModalContext } from "../../context/modalContext";
import { AuthContext } from '../../context/AuthContext.js'

// Head Board


function AdminHomeHeader({}) {

  const {user, logout} = useContext(AuthContext)
  const {pathname, hash} = useLocation()
  const {modalData, toggleModal} = useContext(ModalContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Title Welcome */}
      <div className="navbar bg-base-100 space-x-4 flex flex-col md:flex-row">
        <div className="flex-none">
          <Logo24/>
        </div>

        <div className="flex-1 space-x-2">
          <h1 className="text-mg md:text-xl">Bienvenido Administrador</h1>
          <h1 className="text-lg md:text-xl"><span className='font-bold'>{user.matricula}</span></h1>
        </div>
      </div>

      {/*Board options*/}
      <div className="grid md:navbar bg-base-100">        
        {/*Group Buttons*/}
        <div className="flex justify-end">
          <div className="dropdown md:hidden relative">
            <div className="btn" onClick={() => {toggleMenu()}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul className={`menu bg-base-100 shadow-lg rounded-md py-1 w-48 absolute right-0 z-10 ${menuOpen ? 'block' : 'hidden'}`}>
              <li><Link className={(pathname === '/admin' && !hash) ? 'active' : ''} to='/admin'>Inicio</Link></li>
              <li><Link className={pathname === '/admin/cursos' ? 'active' : ''} to="/admin/cursos">Cursos</Link></li>
              <li><Link className={pathname === '/admin/profesores' ? 'active' : ''} to="/admin/profesores">Profesores</Link></li>

              <li><Link className={pathname === '/admin/estadisticas' ? 'active' : ''} to="/admin/estadisticas">Estadísticas</Link></li>
  
              <li><Link className={pathname === '#ActivarEncuesta' ? 'active' : ''} to="/admin#ActivarEncuesta" onClick={() => {toggleModal([modalData.periodo, modalData.maxMaterias], "opciones")}}>Encuesta</Link></li>
              <li><Link to='/admin/login' onClick={()=> logout()}>Cerrar sesión</Link></li>
            </ul>
          </div>
        </div>
        <ul className="menu hidden md:flex items-center md:menu-horizontal text-ml w-fit md:text-xl p-0">
          <li><Link className={(pathname === '/admin' && !hash) ? 'active' : ''} to='/admin'>Inicio</Link></li>
          <li><Link className={pathname === '/admin/cursos' ? 'active' : ''} to="/admin/cursos">Cursos</Link></li>
          <li><Link className={pathname === '/admin/profesores' ? 'active' : ''} to="/admin/profesores">Profesores</Link></li>
          <li><Link className={pathname === '/admin/estadisticas' ? 'active' : ''} to="/admin/estadisticas">Estadísticas</Link></li>
          <li><Link className={pathname === '#ActivarEncuesta' ? 'active' : ''} to="/admin#ActivarEncuesta" onClick={() => {toggleModal([modalData.periodo, modalData.maxMaterias], "opciones")}}>Encuesta</Link></li>
          <li><Link to='/admin/login' onClick={()=> logout()}>Cerrar sesión</Link></li>
        </ul>
      </div>
      
      <ModalEncuesta/>
    </>
  );
}

export default AdminHomeHeader
