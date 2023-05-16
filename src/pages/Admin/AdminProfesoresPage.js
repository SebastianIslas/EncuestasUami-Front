import React, { useEffect, useState } from "react";
import TablaProfesoresAdmin from "../../components/Admin/AdminProfesores/TablaProfesoresAdmin";
import ModalAgregar from "../../components/Admin/AdminProfesores/ModalAgregar.js";
import { ModalProvider } from "../../context/modalContext";

//Services
import { getProfesores } from "../../services/profesores/getProfesores";


function AdminProfesoresPage() {

  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  // Lista la licenciatura solo usamos la clave y el nombre
  const [profesores, setProfesores] = useState([]);

  //Valores para el context del modal de profesores
  const dataModal = {
    claveEmpleado: "",
    nombre: "",
  }

  useEffect(() => {
    document.title = "Panel de Administracion";
    // Peticion a la API (aqui pa, esta linea ^-^)
    getProfesores().then(setProfesores);
  }, []);

  return (
    <div className="bg-base-200">
      <div className="min-h-screen bg-base-200 px-2 md:px-10 mx-auto">

        <ModalProvider initialModalData={dataModal}>
          <TablaProfesoresAdmin profesores={profesores} setProfesores={setProfesores}/>
          <ModalAgregar profesores={profesores} setProfesores={setProfesores}/> 
        </ModalProvider>

      </div>
    </div>
  );
}

export default AdminProfesoresPage
