import React, { useState } from "react";

import ModalOpciones from "../AdminCursos/ModalOpciones";
import ModalConfirmacion from "../AdminCursos/ModalConfirmacion";
import TitleRowTablaMaterias from "../../common/table/TitleRowTablaMaterias";
import RowOptions from "../../common/table/RowOptions";
import Buscador, {filteredData} from "../../common/table/buscador";

function TablaCursosAdmin({ cursos, setCursos }) {
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
            {filteredData(cursos, query,["nombre", "clave"]).map(curso => 
              <tr className="hover" key={curso.clave}>
                <td className="text-md w-10 opacity-80 break-all">
                  {curso.clave}
                </td>
                <td className="text-md break-word font-bold">
                  {curso.nombre}
                </td>

                <th>
                  <RowOptions objeto={{clave:curso.clave, nombre:curso.nombre, tipo:curso.tipo}}/>
                </th>
              </tr>
            )}
          </tbody>
        </table>

        <ModalOpciones cursos={cursos} setCursos={setCursos}/>
        <ModalConfirmacion cursos={cursos} setCursos={setCursos}/>

      </div>
    </React.Fragment>
  );
}
export default TablaCursosAdmin