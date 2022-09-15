import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Componentes
import Logo24 from "../components/Logo24";
import ModalAgregar from "../components/AdminUeas/ModalAgregar";
import ModalConfirmacion from "../components/AdminUeas/ModalConfirmacion";
import ModalEditar from "../components/AdminUeas/ModalEditar";

// Utils
import { getUeasByLic } from "../services/getUeasByLic";
import { getLicNameByClave } from "../services/getLicNameByClave";

function AdminUeasTablaPage() {

  // Obtenemos los parámetros pasados por URL
  const { claveLic } = useParams();

  // Objeto que contiene los datos del usuario
  let user = Object();
  user.id = 2183011316;

  // Lista de materias en la licenciatura elegida
  const [materias, setMaterias] = useState([]);

  // Nombre de la licenciatura
  const [licNombre, setLicNombre] = useState("Nombre Licenciaturas");

  // Estado de los modales
  // Modal de Agregar Materia
  const [showModalAgregar, setShowModalAgregar] = useState(false);
  // Modal de Eliminar Materia
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  // Modal de Editar Materia
  const [showModalEditar, setShowModalEditar] = useState(false);

  // Datos que se tienen dentro del modal, es decir aquellos datos que le
  // pertenecen a la materia que mandó a llamar al modal
  const [modalData, setModalData] = useState({
    clave: null,
    nombre: null
  });

  // Mostrar/Ocultar el modal de Agregar
  const toggleModalAgregar = () => {
    setShowModalAgregar(!showModalAgregar);
  }

  // Mostrar/Ocultar el modal de Eliminar, pero antes le pasa datos al modal
  const toggleModalEliminar = (clave, nombre) => {
    // Datos para el modal, la clave y nombre de la materia
    let newModalData = {
      clave: clave,
      nombre: nombre
    }

    // Cambia estado de la información en el modal
    setModalData({...newModalData});

    // Cambia el estado del Modal Eliminar
    setShowModalConfirmacion(!showModalConfirmacion);
  }

  // Mostrar/Ocultar el modal de Editar
  const toggleModalEditar = (clave, nombre) => {
    // Datos para el modal, la clave y nombre de la materia
    let newModalData = {
      clave: clave,
      nombre: nombre,
      activa: true
    }

    // Cambia estado de la información en el modal
    setModalData({...newModalData});

    // Cambia el estado del Modal Editar
    setShowModalEditar(!showModalEditar);
  }

  // Cambiar el estado de Activa de una materia
  const handleCheckbox = (clave, nombre) => {
    // Array para cambiar los datos
    let newArray = [];

    // Recorremos las materias para encontrar la que tenemos que cambiar
    for (let i = 0; i < materias.length; i++){
      if (materias[i].clave === clave && materias[i].nombre === nombre){
        // Si la materia es la que cambiamos, actualizar el campo de Activa
        newArray.push({
          clave: clave,
          nombre: nombre,
          activa: !materias[i].activa
        })
      } else {
        // Si no es la materia que buscamos la pasamos sin cambiar
        newArray.push(materias[i]);
      }
    }

    // Actualiza la lista de materias
    setMaterias(newArray);
  }

  // Función a ejecutar al presionar el botón Activar Ueas
  // Se va enviar toda la lista de "materias"
  const activarUeas = () => {
    // TODO: aquí debe haber un servicio que envie todas las materias a la API
    // De paso poner un mensajito via un modal de que se activaron las UEAs.
    console.log("Se activaron las UEAs seleccionadas");
  }

  // Obtener datos
  useEffect(() => {
    // Cambiar el nombre en la pestaña del navegador
    document.title = "Panel de Administracion";

    // Función que obtiene los datos de la API
    setMaterias(getUeasByLic(claveLic));

    // Obtener el Nombre de la Licenciatura por su clave
    setLicNombre(getLicNameByClave(claveLic));
  }, [claveLic]);

  // useEffect(() => {
  //   console.log(materias)
  // }, [materias]);

  return (
  <div className="bg-base-200">
  <div className="min-h-screen bg-base-200 max-w-4xl container px-2 md:px-10 mx-auto">

    {/* Header */}
    <Header user={user} />

    {/* Información */}
    <Info licNombre={licNombre} />
 
    {/* Botones de enviar y activar */}
    <div className='flex justify-end gap-4 p-6'>
      {/* Botón Agregar */}
      <Btn btnFunction={toggleModalAgregar}
           text={"Agregar UEA"} />
      {/* Botón Activar Ueas */}
      <Btn btnFunction={activarUeas}
           text={"Activar UEAs seleccionadas"} />
    </div>

    {/* Tabla */}
    <TablaUeasByLic 
      materias={materias} 
      handleCheckbox={handleCheckbox} 
      toggleModalEditar={toggleModalEditar} 
      toggleModalEliminar={toggleModalEliminar}  />

    {/* Modal de Agregar */}
    {showModalAgregar ? <ModalAgregar
        setShowModalAgregar={setShowModalAgregar}
        materias={materias}
        setMaterias={setMaterias}
          /> : null}

    {/* Modal de Eliminar */}
    {showModalConfirmacion ? <ModalConfirmacion
        modalData={modalData}
        setShowModalConfirmacion={setShowModalConfirmacion}
        materias={materias}
        setMaterias={setMaterias}
        /> : null}

    {/* Modal de Editar */}
    {showModalEditar ? <ModalEditar
        modalData={modalData}
        setShowModalEditar={setShowModalEditar}
        materias={materias}
        setMaterias={setMaterias}
        /> : null}

  </div>
  </div>);
}


function Header({ user }) {
  return (<div className="hero-content flex-col lg:flex-row px-3 pt-10">
  <Logo24 />

  <div className="text-center">
    <h1 className="text-mg md:text-xl">Bienvenido Administrador <b>{user.id}</b></h1>
  </div>
</div>);
}


function Info({licNombre}) {
  return (<div className="bg-base-200 pb-10">
  <h2 className="text-center">Licenciatura: <b>{licNombre}</b></h2>
  <p className="text-center">Aquí puedes agregar, eliminar, editar y abrir materias/UEAs</p>
</div>);
}


function Btn({btnFunction, text}) {
  return (
    <button className="btn btn-primary
                       btn-xs sm:btn-sm md:btn-md"
            onClick={() => { btnFunction(); }}>
      { text }</button>);
}


function TablaUeasByLic({
  materias,
  handleCheckbox,
  toggleModalEditar,
  toggleModalEliminar
}) {
  return (
    <div id="tabla-materias" className="overflow-x-auto rounded-lg pb-10">
      <table className="table table-compact md:table-normal w-full">
        { /* Header de la tabla */ }
        <thead>
          <HeaderTable />
        </thead>

        { /* Cuerpo de la tabla */ }
        <tbody>
          { /* Renglón */ }
          {materias.map(materia => <tr className="hover" key={materia.clave}>
            { /* Checkbox */ }
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

            { /* Campo de la clave de la materia */ }
            <td>
              <p className="text-md opacity-80">
                {materia.clave}</p>
            </td>

            { /* Campo del nombre de la materia */ }
            <td className="break-words">
              <p className="text-md font-bold whitespace-pre-wrap">
                {materia.nombre}</p>
            </td>

            { /* Botones */ }
            <th>
              <div className='flex justify-end gap-2'>
                { /* Botón Editar */ }
                <button 
                  className="btn btn-primary
                              btn-xs sm:btn-sm md:btn-md
                              before:content-['✎']
                              md:before:content-['Editar']
                              w-8 md:w-24 right-0"
                  onClick={() => { toggleModalEditar(materia.clave, materia.nombre); }}>
                </button>
                { /* Botón Eliminar */ }
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

        { /* Footer de la tabla */ }
        <tfoot>
          <HeaderTable />
        </tfoot>
      </table>
    </div>
  );
}

function HeaderTable({}) {
  return (
    <tr>
      { /* Columna Checkbox */ }
      <th><span className="text-xs">Activa</span></th>
      { /* Columna Clave de la UEA */ }
      <th><span className="text-xs">Clave</span></th>
      { /* Columna Nombre de la UEA */ }
      <th><span className="text-xs">Nombre</span></th>
      { /* Columna de botones */ }
      <th><span className="text-xs"></span></th>
    </tr>
  );
}
        export default AdminUeasTablaPage