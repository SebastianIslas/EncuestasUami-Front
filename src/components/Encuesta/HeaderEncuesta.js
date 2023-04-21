import React from "react";

import Logo24 from "../common/Logo24";

function HeaderEncuesta({user}) {
  return (
    <div className='hero-content flex-col lg:flex-row px-3 pt-10'>
      <div className="text-center">
        <p>
          Bienvenido estudiante <span className='font-bold'>{user.matricula}</span> de
          la licenciatura <span className='font-bold'>{user.licenciatura}</span>.
          <br />
          Gracias por responder esta encuesta.
          <br />
        </p>
      </div>
    </div>
  );
}

export default HeaderEncuesta