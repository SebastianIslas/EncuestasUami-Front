import React from "react";

export function Info({ licNombre }) {
  return (<div className="bg-base-200 pb-10">
    <h2 className="text-center">Licenciatura: <b>{licNombre}</b></h2>
    <p className="text-center">Aquí puedes agregar, eliminar, editar y abrir materias/UEAs</p>
  </div>);
}
