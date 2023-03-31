import React, { useState } from "react";
import TitleRowTablaMaterias from "../Admin/TitleRowTablaMaterias";
import Buscador from "../common/buscador";
import RowOptions from "../../components/RowOptions.js";

export function TablaUeasByLic({
  cursos, setCursos
}) {

    ///************* BARRA DE BUSQUEDA *************/
    const [query, setQuery] = useState("");

    const handleInputChange = (event) => {
      setQuery(event.target.value);
    };
  
    const filteredData = Object.keys(cursos).filter((key) => {
      const curso = cursos[key];
      return (
        curso.nombre.toLowerCase().includes(query.toLowerCase()) ||
        curso.clave.toString().includes(query.toLowerCase())
      );
    }).map((key) => cursos[key]);
    ///************* BARRA DE BUSQUEDA *************/


  return (
    <div id="tabla-materias" className="overflow-x-auto rounded-lg pb-10">

      <Buscador query={query} handleInputChange = {handleInputChange} />

      <table className="table table-compact md:table-normal w-full">
        {/* Header de la tabla */}
        <thead>
          <TitleRowTablaMaterias titles={["Clave", "Nombre", "Profesores", ""]} />
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {/* Renglón */}
          {filteredData.map(curso => <tr className="hover" key={curso.clave}>

            {/* Campo de la clave de la materia */}
            <td>
              <p className="text-md opacity-80">
                {curso.clave}</p>
            </td>

            {/* Campo del nombre de la materia */}
            <td className="break-words">
              <p className="text-md font-bold whitespace-pre-wrap">
                {curso.nombre}</p>
            </td>
            
            {/* Campo de profesores de la materia */}
            {/* Campo del nombre del curso */}
            <td>
              <div className="text-md break-word font-bold">
                {curso.profesores.map(profesor=>{
                  <p>profesor.nombre</p>                  
                })}
              </div>
            </td>

            <th>
              <RowOptions objeto={{clave:curso.clave, nombre:curso.nombre}}/>
            </th>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}
