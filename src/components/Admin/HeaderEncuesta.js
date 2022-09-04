import React from "react";

import Logo24 from "./Logo24";

function HeaderEncuesta({user, maxMaterias}) {
  return (
    <>
        <div className="navbar bg-base-100 space-x-4">
            
            <div className="flex-none">
              <Logo24/>
            </div>

            <div className="flex-1 space-x-2">
                <h1 className="text-xl">Bienvenido Administrador</h1>
                <h1 className="text-xl"><span className='font-bold'>{user.matricula}</span></h1>
            </div>
        </div>


        <div className="navbar bg-base-100 space-x-4">
        
        
        <label class="input-group">
                <span>NUM. UEAS ENCUESTA</span>
                <input type="number" placeholder="Número" class="input input-bordered" />
        </label>

        <button class="btn">
                Activar encuesta
            </button><button class="btn">
                UEAs abiertas
            </button><button class="btn">
                Estadisticas
            </button>
            
        </div>

    </>
  );
}

export default HeaderEncuesta