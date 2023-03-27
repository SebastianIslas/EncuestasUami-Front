import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo24 from "./Logo24";
import ModalActEnc from "./ModalActEnc";

// Head Board


function AdminHomeHeader({_user}) {
  const {pathname, hash} = useLocation()
  const [showModalActEnc, setShowModalActEnc] = useState(false);
  
  // Datos que se tienen dentro del modal, es decir aquellos datos que le
  // pertenecen a la materia que mandó a llamar al modal
  const [modalData, setModalData] = useState({
    clave: null,
    nombre: null
  });
  
  const toggleModalActEnc = (claveElegida, nombreElegida) => {
    console.log("ENTRO");
    if (!showModalActEnc){
      let newObject = {
        clave: claveElegida,
        nombre: nombreElegida,  
      }
      setModalData(newObject);
    }
    setShowModalActEnc(!showModalActEnc);
  }

  return (
    <>
      {/* Title Welcome */}
      <div className="navbar bg-base-100 space-x-4">
        <div className="flex-none">
          <Logo24/>
        </div>

        <div className="flex-1 space-x-2">
          <h1 className="text-mg md:text-xl">Bienvenido Administrador</h1>
          <h1 className="text-lg md:text-xl"><span className='font-bold'>{_user.matricula}</span></h1>
        </div>
      </div>

      {/*Board options*/}
      <div className="grid md:navbar bg-base-100">        
        {/*Group Buttons*/}
        <div className="flex-none">
          <ul className="menu menu-horizontal text-ml w-fit md:text-xl p-0">
            <li><Link className={(pathname === '/admin' && !hash) ? 'active' : ''} to='/admin'>Inicio</Link></li>
            <li><Link className={pathname === '/admin/cursos' ? 'active' : ''} to="/admin/cursos">Cursos</Link></li>
            <li><Link className={pathname === '/admin/profesores' ? 'active' : ''} to="/admin/profesores">Profesores</Link></li>
            <li><Link className={hash === '#ActivarEncuesta' ? 'active' : ''} to="/admin#ActivarEncuesta">Activar Encuesta</Link></li>
            {/* Luis: se accede a esto a través de el Botón *Ver* */}
            {/* <li><a>Abrir UEAs</a></li> */}
            <li><Link className={hash === '#Estadisticas' ? 'active' : ''} to="/admin#Estadisticas">Estadísticas</Link></li>
          </ul>
        </div>
      </div>
      
      {showModalActEnc ? <ModalActEnc
        modalData={modalData}
        setShowModal={setShowModalActEnc}
//        licenciaturas={licenciaturas}
  //      setLicenciaturas={setLicenciaturas}
          /> : null}
    </>
  );
}

export default AdminHomeHeader
