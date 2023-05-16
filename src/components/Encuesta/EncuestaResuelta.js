import React from "react";

import TitleRowTablaMaterias from "../common/table/TitleRowTablaMaterias";


function EncuestaResuelta({ periodoEnc, encRes }) {

  console.log("EncuestaResuelta", periodoEnc, encRes);

   
  return (
    <React.Fragment>
      <div className="hero min-h-max bg-base-200">
        <div className="lg:pb-8 lg:pt-16 text-center">
          <h1 className="text-3xl font-bold">
            Encuesta resuelta correspondiente al periodo {periodoEnc}
          </h1>
          <p className="py-6">Has seleccionado los sigientes cursos:</p>
        </div>
      </div>
      <div id="tabla-materias"
        className="overflow-x-auto rounded-lg">

        <table className="table table-compact md:table-normal w-full">
          <thead>
            <TitleRowTablaMaterias titles={["Clave", "Nombre", "Horario", "Modalidad", "Profesor"]} />
          </thead>

          <tbody>
            {/* Renglón */}
            {encRes.cursosSeleccionados.map(curso => 
              <tr className="hover" key={curso.curso.clave}>
                {/* Campo de la clave de la materia */}
                <td className="text-md opacity-80">{curso.curso.clave}</td>
                <td className="text-md opacity-80">{curso.curso.nombre}</td>
                <td className="text-md opacity-80">{curso.turno}</td>
                <td className="text-md opacity-80">{curso.modalidad}</td>
                <td className="text-md opacity-80">{curso.profesor ? curso.profesor.nombre : ''}</td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

    </React.Fragment>
  );
}

export default EncuestaResuelta
