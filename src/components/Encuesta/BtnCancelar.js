import React from "react";

function BtnCancelar({functionOnClick}){
  return(
    <label className="btn btn-sm btn-circle"
            onClick={functionOnClick}>
      ✕</label>
  )
}

export default BtnCancelar
