import React from "react";

import Logo24 from "./Logo24";

// Head Board
function HeaderEncuesta({user, maxMaterias}) {
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
      <div class="navbar bg-base-100">
        <div class="flex-1">
          {/*Limiter Option*/}
          <label class="input-group">
                  <span>NUM. UEAS ENCUESTA</span>
                  <input type="number" placeholder="Número" class="input input-bordered" />
          </label>
        </div>
        <div class="flex-none">
          {/*Group Buttons*/}
          <ul class="menu menu-horizontal p-0">
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