import React, { useState } from "react";

import TitleRowTablaMaterias from "../common/table/TitleRowTablaMaterias";
import ModalOpciones from "./ModalOpciones";
import ModalConfirmacion from "./ModalConfirmacion";
import RowOptions from "../common/table/RowOptions";
import Buscador, {filteredData} from "../common/table/buscador";



function TablaLicsAdmin({ licenciaturas, setLicenciaturas }) {
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
          {filteredData(licenciaturas, query,["nombre", "clave"]).map(licenciatura => 
            <tr className="hover" key={licenciatura.clave}>
              <td className="text-md w-10 opacity-80 break-all">
                {licenciatura.clave}
              </td>
              <td className="text-md break-word font-bold">
                  {licenciatura.nombre}
              </td>
              <th>
                <RowOptions 
                  objeto={{clave:licenciatura.clave, nombre:licenciatura.nombre, btnVer:`/admin/licenciatura/${licenciatura.clave}`}} />
              </th>
            </tr>
          )}
        </tbody>
      </table>

      <ModalOpciones licenciaturas={licenciaturas} setLicenciaturas={setLicenciaturas}/>
      <ModalConfirmacion licenciaturas={licenciaturas} setLicenciaturas={setLicenciaturas}/>
    </div>
    </React.Fragment>
  );
}

export default TablaLicsAdmin
