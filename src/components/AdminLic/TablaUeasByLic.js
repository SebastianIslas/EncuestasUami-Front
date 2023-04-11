import React, { useState } from "react";
import TitleRowTablaMaterias from "../common/table/TitleRowTablaMaterias";
import RowOptions from "../common/table/RowOptions";
import Buscador, {filteredData} from "../common/table/buscador";
import ModalOpciones from "../AdminLic/ModalOpciones";
import ModalConfirmacion from "../AdminLic/ModalConfirmacion";

export function TablaUeasByLic({cursos, setCursos, claveLic}) {
  const [query, setQuery] = useState(""); //Variable para buscador
  return (
    <React.Fragment>
      <Buscador query={query} setQuery={setQuery}/>
      <div id="tabla-materias" className="overflow-x-auto rounded-lg pb-10">
        <table className="table table-compact md:table-normal w-full">
          <thead>
            <TitleRowTablaMaterias titles={["Clave", "Nombre", "Profesores", ""]} />
          </thead>
          <tbody>
            {/* Renglón con ************* BARRA DE BUSQUEDA  */}
            {filteredData(cursos, query,["nombre", "clave"]).map(curso => 
              <tr className="hover" key={curso.clave}>
                <td className="text-md opacity-80">
                    {curso.clave}
                </td>
                <td className="text-md break-word font-bold">
                    {curso.nombre}
                </td>              
                {/* Campo de profesores de la materia */}
                <td className="text-md break-word font-bold">
                    {curso.profesores}
                    {curso.profesores.map(profesor=>{
                      <p>{profesor}</p>                  
                    })}
                </td>
                <th>
                  <RowOptions objeto={{clave:curso.clave, nombre:curso.nombre}}  />
                </th>
              </tr>
            )}
          </tbody>
        </table>
        
  {/*}
        {showModal ? <ModalOpciones
            modalData={modalData}
            setModalData={setModalData}
            showModal={showModal}
            setShowModal={setShowModal}
            claveLic = {claveLic}
            /> : null}
        
        {showModalConfirmacion ? <ModalConfirmacion
            modalData={modalData}
            setShowModal={setShowModalConfirmacion}
            cursos={cursos}
            setCursos={setCursos}
            claveLic = {claveLic}
            /> : null}
        {*/}
      </div>
    </React.Fragment>

  );
}
