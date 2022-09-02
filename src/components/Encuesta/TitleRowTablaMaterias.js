import React from "react";

function TitleRowTablaMaterias() {
  return (<>
      <tr>
        {/* Columna Checkbox */}
        <th><span className="text-xs"></span></th>
        {/* Columna Clave de la UEA */}
        <th><span className="text-xs">Clave</span></th>
        {/* Columna Nombre de la UEA */}
        <th><span className="text-xs">Nombre</span></th>
        {/* Columna botón Opciones */}
        <th><span className="text-xs"></span></th>
      </tr>
    </>
  );
}

export default TitleRowTablaMaterias