// TODO: tanto el botón, como la clave y el nombre deben enviar a la page de abrir ueas
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getUeasByLic } from "../utils/getUeasByLic";
import Logo24 from "../components/Logo24";

function AdminUeasTablaPage() {

  // Obtenemos los parámetros pasados por URL
  const { claveLic } = useParams();

  // Objeto que contiene los datos del usuario
  let user = Object();
  user.id = 2183011316;

  // Lista de materias en la licenciatura elegida
  const [materias, setMaterias] = useState([]);

  // Nombre de la licenciatura
  const [licenciatura, setLicenciatura] = useState([]);

  useEffect(() => {
    // Cambiar el nombre en la pestaña del navegador
    document.title = "Panel de Administracion";

    // Función que obtiene los datos de la API
    setMaterias(getUeasByLic(claveLic));
  }, []);

  return (
  <div className="bg-base-200">
  <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">

    {/* Title Welcome */}
    <div className="navbar bg-base-100 space-x-4">
      <div className="flex-none">
        <Logo24/>
      </div>

      <div className="flex-1 space-x-2">
        <h1 className="text-mg md:text-xl">Bienvenido Administrador <b>{ user.id }</b></h1>
      </div>
    </div>

    {/*Board options*/}
    {/* TODO: Poner el nombre de la licenciatura */}
    <div className="bg-base-100 p-4">
      <p className="block mx-auto">Editando materias/UEAs de la licenciatura <b>{ claveLic }</b></p>
    </div>
 
    {/* Tabla */}
    <div id="tabla-materias"
          className="overflow-x-auto rounded-lg">

    <table className="table table-compact md:table-normal w-full">
      {/* Header de la tabla */}
      <thead>
        <tr>
          {/* Columna Checkbox */}
          <th><span className="text-xs"></span></th>
          {/* Columna Clave de la UEA */}
          <th><span className="text-xs">Clave</span></th>
          {/* Columna Nombre de la UEA */}
          <th><span className="text-xs">Nombre</span></th>
        </tr>
      </thead>

      {/* Cuerpo de la tabla */}
      <tbody>
        {/* Renglón */}
        {materias.map(materia => <tr className="hover" key={materia.clave}>
            {/* Checkbox */}
            <th className='w-8'>
              <div className="flex justify-center">
                <input type="checkbox"
                       className="checkbox"
                       // Nombre de cada checkbox
                      //  name={licenciatura.clave.toString()}
                       // Desactivar el checkbox
                       // disabled={handleDisableCheckbox(licenciatura.clave.toString())}
                       // Hacer check si está en la lista de materias
                       // checked={listaClavesEncuesta.includes(licenciatura.clave.toString())}
                       // Función que altera la lista de materia
                       // onChange={handleCheckbox}
                       /> 
                 </div>
            </th>
          {/* Campo de la clave de la materia */}
          <td>
            <div className="text-md w-10 opacity-80">
              <p className='break-all'>
                <Link to={'admin/abrir-ueas1/${id}'}>
                  {materia.clave}
                </Link>
              </p>
            </div>
          </td>

          {/* Campo del nombre de la materia */}
          <td>
            <div className="text-md break-word font-bold">
              {materia.nombre}
            </div>
          </td>
        </tr>)}
      </tbody>

      {/* Footer de la tabla */}
      <tfoot>
        <tr>
          {/* Columna Checkbox */}
          <th><span className="text-xs"></span></th>
          {/* Columna Clave de la UEA */}
          <th><span className="text-xs">Clave</span></th>
          {/* Columna Nombre de la UEA */}
          <th><span className="text-xs">Nombre</span></th>
        </tr>
      </tfoot>
    </table>
    </div>
  </div>
  </div>);
}

export default AdminUeasTablaPage