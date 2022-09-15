// TODO: tanto el botón, como la clave y el nombre deben enviar a la page de abrir ueas
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo24 from "../components/Logo24";

function AdminUeasPage1() {

  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  // Lista la licenciatura solo usamos la clave y el nombre
  const [licenciaturas, setLicenciaturas] = useState([]);


  useEffect(() => {
    document.title = "Panel de Administracion";

    setLicenciaturas([
      {clave: 11111111, nombre: "Licenciatura en Balsamiq 1"},
      {clave: 22222222, nombre: "Licenciatura en Balsamiq 2"},
      {clave: 33333333, nombre: "Licenciatura en Balsamiq 3"},
      {clave: 44444444, nombre: "Licenciatura en Balsamiq 4"}
    ]);

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
            <h1 className="text-mg md:text-xl">Bienvenido Administrador</h1>
            <h1 className="text-lg md:text-xl"><span className='font-bold'>{user.matricula}</span></h1>
        </div>
    </div>


      {/*Board options*/}
      <div className="grid md:navbar bg-base-100">
        <p>Seleccione la licenciatura que quiere modificar</p>
      </div>
 
      {/* Tabla */}
      <div id="tabla-materias"
           className="overflow-x-auto rounded-lg">

      <table className="table table-compact md:table-normal w-full">
        {/* Header de la tabla */}
        <thead>
          <tr>
            {/* Columna Checkbox */}
            {/* <th><span className="text-xs"></span></th> */}
            {/* Columna Clave de la UEA */}
            <th><span className="text-xs">Clave</span></th>
            {/* Columna Nombre de la UEA */}
            <th><span className="text-xs">Nombre</span></th>
            {/* Columna botón Opciones */}
            <th><span className="text-xs"></span></th>
          </tr>
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {/* Renglón */}
          {licenciaturas.map(licenciatura => <tr className="hover" key={licenciatura.clave}>
            {/* Checkbox */}
            {/* <th className='w-8'> */}
            {/*   <div className="flex justify-center"> */}
            {/*     <input type="checkbox" */}
            {/*           className="checkbox" */}
            {/*           // Nombre de cada checkbox */}
            {/*           name={licenciatura.clave.toString()} */}
            {/*           // Desactivar el checkbox */}
            {/*           // disabled={handleDisableCheckbox(licenciatura.clave.toString())} */}
            {/*           // Hacer check si está en la lista de materias */}
            {/*           // checked={listaClavesEncuesta.includes(licenciatura.clave.toString())} */}
            {/*           // Función que altera la lista de materia */}
            {/*           // onChange={handleCheckbox} */}
            {/*           /> */}
            {/*     </div> */}
            {/* </th> */}

            {/* Campo de la clave de la licenciatura */}
            <td>
              <div className="text-md w-10 opacity-80">
                <p className='break-all'>
                  <Link to={`/admin/ueas1/${licenciatura.clave}`}>
                    {licenciatura.clave}
                  </Link>
                </p>
              </div>
            </td>

            {/* Campo del nombre de la licenciatura */}
            <td>
              <div className="text-md break-word font-bold">
                  <Link to={`/admin/ueas1/${licenciatura.clave}`}>
                    {licenciatura.nombre}
                  </Link>
              </div>
              {/* {materiasEncuesta[licenciatura.clave] ? (
              <div className="text-xs break-word text-base-content">
                Modalidad: {materiasEncuesta[materia.clave].modalidad}
                <br/>
                Horario: {materiasEncuesta[materia.clave].horario}
              </div>) : null} */}

            </td>

            <th>
              {/* Botón Opciones */}
              <div className='flex justify-end'>
                <Link to={`/admin/ueas1/${licenciatura.clave}`}>
                  <button className="btn btn-primary
                                  btn-xs sm:btn-sm md:btn-md
                                  before:content-['✎']
                                  md:before:content-['Abrir_UEAs']
                                  w-8 md:w-24 right-0"
                  ></button>
                </Link>
              </div>
            </th>
          </tr>)}

        </tbody>

        {/* Footer de la tabla */}
        <tfoot>
          <tr>
            {/* Columna Checkbox */}
            {/* <th><span className="text-xs"></span></th> */}
            {/* Columna Clave de la UEA */}
            <th><span className="text-xs">Clave</span></th>
            {/* Columna Nombre de la UEA */}
            <th><span className="text-xs">Nombre</span></th>
            {/* Columna botón Opciones */}
            <th><span className="text-xs"></span></th>
          </tr>
        </tfoot>
      </table>

      {/* Template del modal de Opciones */}
      {/* {showModal ? <ModalOpciones */}
      {/*     modalData={modalData} */}
      {/*     setModalData={setModalData} */}
      {/*     showModal={showModal} */}
      {/*     setShowModal={setShowModal} */}
      {/*     materiasEncuesta={materiasEncuesta} */}
      {/*     setMateriasEncuesta={setMateriasEncuesta} */}
      {/*     listaClavesEncuesta={listaClavesEncuesta} */}
      {/*     setListaClavesEncuesta={setListaClavesEncuesta} /> : null} */}

    </div>
  </div>
  </div>);
}

export default AdminUeasPage1
