import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Componentes
import ModalAgregar from "../../components/AdminLic/ModalAgregar";
import ModalConfirmacion from "../../components/AdminLic/ModalConfirmacion";
import ModalEditar from "../../components/AdminLic/ModalEditarUea";


import AdminHomeHeader from '../../components/Admin/AdminHomeHeader';
import Button from '../../components/common/Button';
import { TablaUeasByLic } from "../../components/AdminLic/TablaUeasByLic";

// Services
import { getLicNameByClave } from "../../services/licenciaturas/getLicNameByClave";
import { getCursos } from "../../services/cursos/getCursos";

function AdminUeasTablaPage() {

  // Obtenemos los parámetros pasados por URL
  const { claveLic } = useParams();

  // Objeto que contiene los datos del usuario
  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  // Lista de materias en la licenciatura elegida
  const [materias, setMaterias] = useState([]);
  //Lista de cursos completa para agregar a la lic.
  const [cursosAgregar, setCursosAgregar] = useState([]);
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
    getCursos().then(setCursosAgregar);
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

  // Obtener datos
  useEffect(() => {
    // Cambiar el nombre en la pestaña del navegador
    document.title = "Panel de Administracion";
    // Obtener el Nombre de la Licenciatura por su clave
    getLicNameByClave(claveLic).then(lic =>{
      setLicNombre(lic.nombre);
      setMaterias(lic.cursos);
    });
  }, [claveLic]);

  return (
    <div className="bg-base-200">
      <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">
        {/* Header */}
        <AdminHomeHeader _user={user} />
        {/* Información */}
        <div className="bg-base-200 pb-10">
          <h2 className="text-2xl">Licenciatura: <b>{licNombre}</b></h2>
          <p>Aquí puedes agregar, eliminar, editar y abrir materias/UEAs</p>
        </div>
        {/* Tabla */}
        <TablaUeasByLic cursos={materias} 
          toggleModalEditar={toggleModalEditar} 
          toggleModalEliminar={toggleModalEliminar}
          claveLic={claveLic}  />

        {/* Botones de enviar y activar */}
        <div className='flex justify-end gap-4 p-6 fixed bottom-4 right-4'>
          <Button onClick={toggleModalAgregar} text={"Agregar UEA"} />
        </div>

        {/* Modal de Agregar */}
        {showModalAgregar ? <ModalAgregar
          setShowModalAgregar={setShowModalAgregar}
          cursosLic={materias}  //Cursos de la lic
          setCursosLic={setMaterias}
          materias={cursosAgregar}  //Todos los cursos
          setMaterias={setCursosAgregar}
          claveLic={claveLic}
            /> : null}

        {/* Modal de Eliminar */}
        {showModalConfirmacion ? <ModalConfirmacion
          modalData={modalData}
          setShowModalConfirmacion={setShowModalConfirmacion}
          materias={materias}
          setMaterias={setMaterias}
          claveLic ={claveLic}
          /> : null}

        {/* Modal de Editar UEA (Profesores)*/}
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
