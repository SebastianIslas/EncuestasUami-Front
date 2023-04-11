import React, { useEffect, useState, useContext } from "react";
import AdminHomeHeader from '../../components/Admin/AdminHomeHeader';
import TablaCursosAdmin from "../../components/AdminCursos/TablaCursosAdmin";
import ModalAgregar from "../../components/AdminCursos/ModalAgregar.js";
import { ModalProvider } from "../../context/modalContext";

//Services
import { getCursos } from "../../services/cursos/getCursos";



function AdminCursosPage() {
  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  // Lista los cursos solo usamos la clave y el nombre
  const [cursos, setCursos] = useState([]);

  //Valores para el context del modal de agregar curso
  const dataModalAgregar = {
    clave: "",
    nombre: "",
    tipo: ""
  }

  useEffect(() => {
    document.title = "Panel de Administracion";
    // Peticion a la API (aqui pa, esta linea ^-^)
    getCursos().then(setCursos);
  }, []);

  return (
  <div className="bg-base-200">
    <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">

      <AdminHomeHeader _user={user} />
      <ModalProvider initialModalData={dataModalAgregar}>
        <TablaCursosAdmin cursos={cursos} setCursos={setCursos}/>
        <ModalAgregar cursos={cursos} setCursos={setCursos}/> 
      </ModalProvider>
    </div>
  </div>);
}
export default AdminCursosPage