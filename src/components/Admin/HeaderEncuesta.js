import React from "react";
import Logo24 from "./Logo24";

// Head Board
function HeaderEncuesta({user}) {
  return (
    <>
        {/* Title Welcome */}
        <div className="navbar bg-base-100 space-x-4">
            <div className="flex-none">
              <Logo24/>
            </div>

            <div className="flex-1 space-x-2">
                <h1 className="text-xl">Bienvenido Administrador</h1>
                <h1 className="text-xl"><span className='font-bold'>{user.matricula}</span></h1>
            </div>
        </div>


      {/*Board options*/}
      <div className="navbar bg-base-100">
        
        {/*Limiter Option*/}
        <div className="flex-1">
          <label className="input-group">
                  <span>NUM. UEAS ENCUESTA</span>
                  <input type="number" placeholder="Número" className="input input-bordered" />
          </label>
        </div>

        {/*Group Buttons*/}
        <div className="flex-none">
          <ul className="menu menu-horizontal text-xl p-0">
            <li><a>Activar Encuesta</a></li>
            <li><a>UEAS Abiertas</a></li>
            <li><a>Estadísticas</a></li>
          </ul>
        </div>

      </div>

    </>
  );
}

export default HeaderEncuesta