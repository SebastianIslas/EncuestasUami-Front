import React, { useState, useEffect } from "react";
import TitleRowTablaMaterias from "../common/table/TitleRowTablaMaterias";
import RowOptions from "../common/table/RowOptions";
import Buscador, {filteredData} from "../common/table/buscador";
import ModalOpciones from "../AdminLic/ModalOpciones";
import ModalConfirmacion from "../AdminLic/ModalConfirmacion";

//services
import {getProfesores} from "../../services/profesores/getProfesores";

export function TablaUeasByLic({cursos, setCursos, claveLic}) {
  const [query, setQuery] = useState(""); //Variable para buscador
  const [allProfesores, setAllProfesores] = useState("");
useEffect(() => {
  getProfesores().then(res =>{
    setAllProfesores(res)
    console.log("ENTROPROFESORES");
  });
}, []);


  return (
    <React.Fragment>
      <Buscador query={query} setQuery={setQuery}/>
      <div id="tabla-materias" className="overflow-x-auto rounded-lg pb-10">
        <table className="table table-compact md:table-normal w-full">
          <thead>
            <TitleRowTablaMaterias titles={["Clave", "Nombre", ""]} />
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

                {/* 
                  <td className="text-md break-word font-bold">
                      {curso.profesores}
                      {curso.profesores.map(profesor=>{
                        <p>{profesor}</p>
                      })}
                  </td>
                */}

                <th>
                  <RowOptions objeto={{clave:curso.clave, nombre:curso.nombre}}  />
                </th>
              </tr>
            )}
          </tbody>
        </table>
        <ModalOpciones allProfesores={allProfesores} setAllProfesores={setAllProfesores}/>
        <ModalConfirmacion cursos={cursos} setCursos={setCursos} claveLic = {claveLic}/>
      </div>
    </React.Fragment>

  );
}
