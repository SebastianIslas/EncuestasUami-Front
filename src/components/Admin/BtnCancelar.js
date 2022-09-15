import React from "react";

//Boton con el que se cierra el modal
function BtnCancelar({functionOnClick}){
  return(
    <label className="btn btn-sm btn-circle"
            onClick={functionOnClick}>
      ✕</label>
  )
}

export default BtnCancelar
