import React, { useEffect, useState } from "react";
import Button from '../../components/Button';
import AdminHomeHeader from '../../components/Admin/AdminHomeHeader';
import TablaCursosAdmin from "../../components/AdminCursos/TablaCursosAdmin";
import ModalAgregar from "../../components/Admin/ModalAgregar.js";

//Services
import { getCursos } from "../../services/cursos/getCursos";


const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;

function AdminCursosPage() {

  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  // Lista los cursos solo usamos la clave y el nombre
  const [cursos, setCursos] = useState([]);

  const [showModalAgregar, setShowModalAgregar] = useState(false);


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

      <AdminHomeHeader user={user} />
 
      {/* Tabla */}
      <TablaCursosAdmin cursos={cursos}  
                      setCursos={setCursos}
      />

      <Button text={"Agregar Curso"} onClick={toggleModalAgregar} />

      {showModalAgregar ? <ModalAgregar
          showModal={showModalAgregar}
          setShowModal={setShowModalAgregar}
          cursos={cursos}
          setCursos={setCursos}
           /> : null}

  </div>
  </div>);
}

export default AdminCursosPage
