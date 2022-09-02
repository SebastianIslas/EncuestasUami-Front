import React from "react";

import Logo24 from "./Logo24";

function HeaderEncuesta({user, maxMaterias}) {
  return (
    <div id="logo-info"
         className='hero-content flex-col lg:flex-row px-3 pt-10'>

      <Logo24 />

      <div className="text-center">
        <p>
          Bienvenido estudiante <span className='font-bold'>{user.matricula}</span> de
          la licenciatura <span className='font-bold'>{user.licenciatura}</span>.
          <br />
          Gracias por llenar esta encuesta.
          <br />
          Puedes elegir hasta <span className='font-bold'>{maxMaterias}</span> materias/UEAs.
        </p>
      </div>
    </div>
  );
}

export default HeaderEncuesta