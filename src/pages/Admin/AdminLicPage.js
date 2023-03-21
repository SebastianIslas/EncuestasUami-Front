import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Componentes
import ModalAgregar from "../../components/AdminLic/ModalAgregar";
import ModalConfirmacion from "../../components/AdminLic/ModalConfirmacion";
import ModalEditar from "../../components/AdminLic/ModalEditar";

// Utils
import { getLicNameByClave } from "../../services/getLicNameByClave";
import AdminHomeHeader from '../../components/Admin/AdminHomeHeader';
import Button from "../../components/Button";
import { TablaUeasByLic } from "../../components/AdminLic/TablaUeasByLic";

// Services
import { getUEASByLic } from "../../services/getUeasByLic.js";

function AdminUeasTablaPage() {

  // Obtenemos los parámetros pasados por URL
  const { claveLic } = useParams();

  // Objeto que contiene los datos del usuario
  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

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
    //setMaterias(getUeasByLic(claveLic));
    getUEASByLic(30).then(setMaterias)
    
    // Obtener el Nombre de la Licenciatura por su clave
    setLicNombre(getLicNameByClave(claveLic));
  }, [claveLic]);

  // useEffect(() => {
  //   console.log(materias)
  // }, [materias]);

  return (
    <div className="bg-base-200">
      <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">
        {/* Header */}
        <AdminHomeHeader user={user} />
        {/* Información */}
        <div className="bg-base-200 pb-10">
          <h2 class="text-2xl">Licenciatura: <b>{licNombre}</b></h2>
          <p>Aquí puedes agregar, eliminar, editar y abrir materias/UEAs</p>
        </div>
        {/* Tabla */}
        <TablaUeasByLic 
          materias={materias} 
          handleCheckbox={handleCheckbox} 
          toggleModalEditar={toggleModalEditar} 
          toggleModalEliminar={toggleModalEliminar}  />

        {/* Botones de enviar y activar */}
        <div className='flex justify-end gap-4 p-6 fixed bottom-4 right-4'>
          <Button onClick={toggleModalAgregar} text={"Agregar UEA"} />
          <Button onClick={activarUeas} text={"Activar UEAs seleccionadas"} />
        </div>

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
    </div>
  );
}


export default AdminUeasTablaPage
