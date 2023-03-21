import React from "react";
import Logo24 from "./Logo24";

// Head Board
function AdminHomeHeader({user}) {
  return (
    <>
      {/* Title Welcome */}
      <div className="navbar bg-base-100 space-x-4">
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
          {/*Limiter Option PASAR A MODAL DENTRO DE "ACTIVAR ENCUESTA"
          <div className="flex-1">
            <label className="input-group mx-2 w-fit" >
                    <span className="text-xs md:text-base" >NUM. UEAS ENCUESTA</span>
                    <input type="number" placeholder="Número" className="input input-bordered" />
            </label>
          </div>
        */}
        {/*Group Buttons*/}
        <div className="flex-none">
          <ul className="menu menu-horizontal text-ml w-fit md:text-xl p-0">
            <li><a href="/admin/">Inicio</a></li>
            <li><a href="/admin/cursos/">Cursos</a></li>
            <li><a href="/admin/profesores/">Profesores</a></li>
            <li><a href=".">Activar Encuesta</a></li>
            {/* Luis: se accede a esto a través de el Botón *Ver* */}
            {/* <li><a>Abrir UEAs</a></li> */}
            <li><a href=".">Estadísticas</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminHomeHeader
