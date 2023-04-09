import React, { useEffect, useState } from "react";
import Button from '../../components/common/Button';
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

  const [showModalAgregar, setShowModalAgregar] = useState(false);

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
  
  const toggleModalAgregar = () => {
    setShowModalAgregar(!showModalAgregar);
  }

  return (
  <div className="bg-base-200">
    <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">

      <AdminHomeHeader _user={user} />
      <TablaCursosAdmin cursos={cursos} setCursos={setCursos}/>

      <div className="fixed bottom-4 left-4">
        <Button text={"Agregar Curso"} onClick={toggleModalAgregar} />
      </div>
      {showModalAgregar ? 
      <ModalProvider initialModalData={dataModalAgregar}>
        <ModalAgregar
          showModal={showModalAgregar} setShowModal={setShowModalAgregar}
          cursos={cursos} setCursos={setCursos}
        /> 
      </ModalProvider>
      : null}
    </div>
  </div>);
}

export default AdminCursosPage
