import React from "react";

import Logo24 from "../common/Logo24";

function HeaderEncuesta({user, periodoEnc}) {
  return (
    <div className='hero-content flex-col lg:flex-row px-3 pt-10'>
      <div className="text-center">
        <p>
          Bienvenido estudiante <b>{user.matricula}</b> de
          la licenciatura <b>{user.licenciatura}</b>.
          <br />
          Gracias por responder esta encuesta correspondiente al periodo <b>{periodoEnc}</b>.
          <br />
        </p>
      </div>
    </div>
  );
}

export default HeaderEncuesta