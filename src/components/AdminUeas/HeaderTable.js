import React from "react";



export function HeaderTable() {
  return (
    <tr>
      {/* Columna Checkbox */}
      <th><span className="text-xs">Activa</span></th>
      {/* Columna Clave de la UEA */}
      <th><span className="text-xs">Clave</span></th>
      {/* Columna Nombre de la UEA */}
      <th><span className="text-xs">Nombre</span></th>
      {/* Columna de botones */}
      <th><span className="text-xs"></span></th>
    </tr>
  );
}
