// TODO: implementar el onChange del checkbox
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getUeasByLic } from "../utils/getUeasByLic";
import Logo24 from "../components/Logo24";
import ModalAgregar from "../components/AdminUeas1/ModalAgregar";
import ModalConfirmacion from "../components/AdminUeas1/ModalConfirmacion";
import ModalEditar from "../components/AdminUeas1/ModalEditar";

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

  // Estado de los modales
  const [showModalAgregar, setShowModalAgregar] = useState(false);
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);

  // Datos que se tienen dentro del modal, es decir aquellos datos que le
  // pertenecen a la materia que mandó a llamar al modal
  const [modalData, setModalData] = useState({
    clave: null,
    nombre: null
  });

  const toggleModalAgregar = () => {
    setShowModalAgregar(!showModalAgregar);
  }

  const toggleModalEliminar = (clave, nombre) => {
    let newModalData = {
      clave: clave,
      nombre: nombre
    }

    setModalData({...newModalData});
    setShowModalConfirmacion(!showModalConfirmacion);
  }

  const toggleModalEditar = (clave, nombre) => {
    let newModalData = {
      clave: clave,
      nombre: nombre,
      activa: true
    }

    setModalData({...newModalData});
    setShowModalEditar(!showModalEditar);
  }

  const handleCheckbox = (clave, nombre) => {
    // Array para cambiar los datos
    let newArray = [];

    for (let i = 0; i < materias.length; i++){
      if (materias[i].clave == clave && materias[i].nombre == nombre){
        // Actualizar el campo
        newArray.push({
          clave: clave,
          nombre: nombre,
          activa: !materias[i].activa
        })
      } else {
        newArray.push(materias[i]);
      }
    }

    // Actualiza la lista de materias
    setMaterias(newArray);
  }

  const activarUeas = () => {
    // TODO: aquí debe haber un servicio que envie todas las materias a la API
    // De paso poner un mensajito via un modal de que se activaron las UEAs.
    console.log("Se activaron las UEAs seleccionadas");
  }

  useEffect(() => {
    // Cambiar el nombre en la pestaña del navegador
    document.title = "Panel de Administracion";

    // Función que obtiene los datos de la API
    setMaterias(getUeasByLic(claveLic));
  }, []);

  useEffect(() => {
    console.log(materias)
  }, [materias]);

  return (
  <div className="bg-base-200">
  <div className="min-h-screen bg-base-200 max-w-4xl container px-2 md:px-10 mx-auto">

    {/* Title Welcome */}
    <div className="hero-content flex-col lg:flex-row px-3 pt-10">
      <Logo24/>

      <div className="text-center">
        <h1 className="text-mg md:text-xl">Bienvenido Administrador <b>{ user.id }</b></h1>
      </div>
    </div>

    {/*Board options*/}
    {/* TODO: Poner el nombre de la licenciatura */}
    <div className="bg-base-200 pb-10">
      <h2 className="text-center">Licenciatura: <b>{ claveLic }</b></h2>
      <p className="text-center">Aquí puedes agregar, eliminar, editar y abrir materias/UEAs</p>
    </div>
 
    <div className='flex justify-end gap-4 p-6'>
      {/* Botón Editar */}
      <button className="btn btn-primary
                        btn-xs sm:btn-sm md:btn-md"
              onClick={() => {
                  toggleModalAgregar() }}
      >Agregar UEA</button>
      <button className="btn btn-primary
                        btn-xs sm:btn-sm md:btn-md"
              onClick={() => {
                  activarUeas() }}
      >Activar UEAs</button>
    </div>

    {/* Tabla */}
    <div id="tabla-materias"
         className="overflow-x-auto rounded-lg pb-10">
      <table className="table table-compact md:table-normal w-full">
        {/* Header de la tabla */}
        <thead>
          <tr>
            {/* Columna Checkbox */}
            <th><span className="text-xs">Activa</span></th>
            {/* Columna Clave de la UEA */}
            <th><span className="text-xs">Clave</span></th>
            {/* Columna Nombre de la UEA */}
            <th><span className="text-xs">Nombre</span></th>
            {/* Columna de botones */}
            <th><span className="text-xs"></span></th>
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
                      name={materia.clave.toString()}
                      // Hacer check si está en la lista de materias
                      checked={materia.activa}
                      // Función que altera la lista de materia
                      onChange={() => {
                        handleCheckbox(materia.clave, materia.nombre)}}
                      /> 
                </div>
            </th>

            {/* Campo de la clave de la materia */}
            <td>
              <p className="text-md opacity-80">
                {materia.clave}</p>
            </td>

            {/* Campo del nombre de la materia */}
            {/* TODO: faltan botón de agregar, editar y eliminar ueas */}
            <td className="break-words">
              <p className="text-md font-bold whitespace-pre-wrap">
                {materia.nombre}</p>
            </td>

            {/* Botones */}
            <th>
              <div className='flex justify-end gap-2'>
                {/* Botón Editar */}
                <button className="btn btn-primary
                                  btn-xs sm:btn-sm md:btn-md
                                  before:content-['✎']
                                  md:before:content-['Editar']
                                  w-8 md:w-24 right-0"
                        onClick={() => {
                            toggleModalEditar(materia.clave, materia.nombre) }}
                ></button>
                {/* Botón Eliminar */}
                <button className="btn btn-primary
                                  btn-xs sm:btn-sm md:btn-md
                                  before:content-['✖']
                                  md:before:content-['Eliminar']
                                  w-8 md:w-24 right-0"
                        onClick={() => {
                            toggleModalEliminar(materia.clave, materia.nombre) }}
                ></button>
              </div>
            </th>
          </tr>)}
        </tbody>

        {/* Footer de la tabla */}
        <tfoot>
          <tr>
            {/* Columna Checkbox */}
            <th><span className="text-xs">Activa</span></th>
            {/* Columna Clave de la UEA */}
            <th><span className="text-xs">Clave</span></th>
            {/* Columna Nombre de la UEA */}
            <th><span className="text-xs">Nombre</span></th>
            {/* Columna de botones */}
            <th><span className="text-xs"></span></th>
          </tr>
        </tfoot>
      </table>
    </div>

    {showModalAgregar ? <ModalAgregar
        setShowModalAgregar={setShowModalAgregar}
        materias={materias}
        setMaterias={setMaterias}
          /> : null}

    {showModalConfirmacion ? <ModalConfirmacion
        modalData={modalData}
        setShowModalConfirmacion={setShowModalConfirmacion}
        materias={materias}
        setMaterias={setMaterias}
        /> : null}

    {showModalEditar ? <ModalEditar
        modalData={modalData}
        setShowModalEditar={setShowModalEditar}
        materias={materias}
        setMaterias={setMaterias}
        /> : null}
  </div>
  </div>);
}

export default AdminUeasTablaPage