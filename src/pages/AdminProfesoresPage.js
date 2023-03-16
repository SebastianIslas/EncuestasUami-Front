import React, { useEffect, useState } from "react";
import Button from '../components/Button';
import AdminHomeHeader from '../components/Admin/AdminHomeHeader';
import TablaCursosProfesores from "../components/AdminProfesores/TablaProfesoresAdmin";
import ModalAgregar from "../components/Admin/ModalAgregar.js";

//import PROFESORES from "../data/PROFESORES.js";

function AdminProfesoresPage() {

  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  // Lista la licenciatura solo usamos la clave y el nombre
  const [profesores, setProfesores] = useState([]);

  const [showModalAgregar, setShowModalAgregar] = useState(false);


  useEffect(() => {
    document.title = "Panel de Administracion";
    // Peticion a la API (aqui pa, esta linea ^-^)
    console.warn("Se procede a cargar la unica licenciatura")
    setProfesores([{
      "claveEmpleado": 22211536,
      "nombre": "Valdo valdo "
    }]);
  }, []);


  
  const toggleModalAgregar = () => {
    setShowModalAgregar(!showModalAgregar);
  }

  return (
  <div className="bg-base-200">
  <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">

      <AdminHomeHeader user={user} />
 
      {/* Tabla */}
      <TablaCursosProfesores profesores={profesores}  
                      setProfesores={setProfesores}
      />

      <Button text={"Agregar Profesor"} onClick={toggleModalAgregar} />

      {showModalAgregar ? <ModalAgregar
          showModal={showModalAgregar}
          setShowModal={setShowModalAgregar}
          profesores={profesores}
          setProfesores={setProfesores}
           /> : null}

  </div>
  </div>);
}

export default AdminProfesoresPage
