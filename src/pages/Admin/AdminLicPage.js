import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Componentes
import ModalAgregar from "../../components/AdminLic/ModalAgregar";
import ModalConfirmacion from "../../components/AdminLic/ModalConfirmacion";
import ModalEditar from "../../components/AdminLic/ModalEditarUea";
import { ModalProvider } from "../../context/modalContext";
import AdminHomeHeader from '../../components/Admin/AdminHomeHeader';
import { TablaUeasByLic } from "../../components/AdminLic/TablaUeasByLic";

// Services
import { getLicNameByClave } from "../../services/licenciaturas/getLicNameByClave";

function AdminUeasTablaPage() {

  // Obtenemos los parámetros pasados por URL
  const { claveLic } = useParams();
  // Lista de materias en la licenciatura elegida
  const [materias, setMaterias] = useState([]);
  // Nombre de la licenciatura
  const [licNombre, setLicNombre] = useState("Nombre Licenciaturas");

  // Objeto que contiene los datos del usuario
  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  //Valores para el context del modal
  const dataModal = {
    clave: "",
    nombre: "",
    profesores: null
  }

  useEffect(() => {
    document.title = "Panel de Administracion";
    getLicNameByClave(claveLic).then(lic =>{
      setLicNombre(lic.nombre);
      setMaterias(lic.cursos);
    });
  }, [claveLic]);

  return (
    <div className="bg-base-200">
      <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">
        <AdminHomeHeader _user={user} />
        {/* Información */}
        <div className="bg-base-200 pb-10">
          <h2 className="text-2xl">Licenciatura: <b>{licNombre}</b></h2>
          <p>Aquí puedes agregar, eliminar, editar y abrir materias/UEAs</p>
        </div>

        <ModalProvider initialModalData={dataModal}>
          <TablaUeasByLic cursos={materias} setCursos={setMaterias} claveLic={claveLic}/>
          <ModalAgregar setCursosLic={setMaterias} claveLic={claveLic}/> 
        </ModalProvider>

        {/* Modal de Editar UEA (Profesores)}
        
        <TablaUeasByLic cursos={materias} 
          toggleModalEditar={toggleModalEditar} 
          toggleModalEliminar={toggleModalEliminar}
            />

            
        {showModalEditar ? <ModalEditar
          modalData={modalData}
          setShowModalEditar={setShowModalEditar}
          materias={materias}
          setMaterias={setMaterias}
          /> : null}
        {*/}
      </div>
    </div>
  );
}


export default AdminUeasTablaPage
