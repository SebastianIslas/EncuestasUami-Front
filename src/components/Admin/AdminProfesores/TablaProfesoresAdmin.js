import React, { useState } from "react";

import ModalOpciones from "../AdminProfesores/ModalOpciones";
import ModalConfirmacion from "../AdminProfesores/ModalConfirmacion";
import RowOptions from "../../common/table/RowOptions";
import Buscador, {filteredData} from "../../common/table/buscador";
import TitleRowTablaMaterias from "../../common/table/TitleRowTablaMaterias";

function TablaProfesoresAdmin({ profesores, setProfesores }) {
  const [query, setQuery] = useState(""); //Variable para buscador
  return (
    <React.Fragment>
    {/* Container de la tabla */}
    <Buscador query={query} setQuery={setQuery}/>
    <div id="tabla-materias" className="overflow-x-auto rounded-lg bg-base-400">
      <table className="table table-compact md:table-normal w-full">
        <thead>
          <TitleRowTablaMaterias titles={["Clave", "Nombre", ""]} />
        </thead>
        <tbody>
          {/* Renglón con ************* BARRA DE BUSQUEDA  */}
          {filteredData(profesores, query,["nombre", "claveEmpleado"]).map(profesor => 
            <tr className="hover" key={profesor.claveEmpleado}>
              <td className="text-md w-10 opacity-80 break-all">
                {profesor.claveEmpleado}
              </td>
              <td className="text-md break-word font-bold">
                  {profesor.nombre}
              </td>
              <th>
                <RowOptions objeto={{clave:profesor.claveEmpleado, nombre:profesor.nombre}}/>
              </th>
            </tr>
          )}
        </tbody>
      </table>

      <ModalOpciones profesores={profesores} setProfesores={setProfesores}/>
      <ModalConfirmacion profesores={profesores} setProfesores={setProfesores}/>
    </div>
    </React.Fragment>
  );
}

export default TablaProfesoresAdmin
