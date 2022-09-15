import React from "react";
import { HeaderTable } from "./HeaderTable";

export function TablaUeasByLic({
  materias, handleCheckbox, toggleModalEditar, toggleModalEliminar
}) {
  return (
    <div id="tabla-materias" className="overflow-x-auto rounded-lg pb-10">
      <table className="table table-compact md:table-normal w-full">
        {/* Header de la tabla */}
        <thead>
          <HeaderTable />
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {/* Renglón */}
          {materias.map(materia => <tr className="hover" key={materia.clave}>
            {/* Checkbox */}
            <th className='w-8'>
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  className="checkbox" // Nombre de cada checkbox
                  name={materia.clave.toString()} // Hacer check si está en la lista de materias
                  checked={materia.activa} // Función que altera la lista de materia
                  onChange={() => { handleCheckbox(materia.clave, materia.nombre); }} />
              </div>
            </th>

            {/* Campo de la clave de la materia */}
            <td>
              <p className="text-md opacity-80">
                {materia.clave}</p>
            </td>

            {/* Campo del nombre de la materia */}
            <td className="break-words">
              <p className="text-md font-bold whitespace-pre-wrap">
                {materia.nombre}</p>
            </td>

            {/* Botones */}
            <th>
              <div className='flex justify-end gap-2'>
                {/* Botón Editar */}
                <button
                  className="btn btn-primary
                              btn-xs sm:btn-sm md:btn-md
                              before:content-['✎']
                              md:before:content-['Editar']
                              w-8 md:w-24 right-0"
                  onClick={() => { toggleModalEditar(materia.clave, materia.nombre); }}>
                </button>
                {/* Botón Eliminar */}
                <button
                  className="btn btn-primary
                              btn-xs sm:btn-sm md:btn-md
                              before:content-['✖']
                              md:before:content-['Eliminar']
                              w-8 md:w-24 right-0"
                  onClick={() => { toggleModalEliminar(materia.clave, materia.nombre); }}>

                </button>
              </div>
            </th>
          </tr>)}
        </tbody>

        {/* Footer de la tabla */}
        <tfoot>
          <HeaderTable />
        </tfoot>
      </table>
    </div>
  );
}
