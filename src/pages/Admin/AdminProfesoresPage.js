import React, { useEffect, useState } from "react";
import Button from '../../components/Button';
import AdminHomeHeader from '../../components/Admin/AdminHomeHeader';
import TablaCursosProfesores from "../../components/AdminProfesores/TablaProfesoresAdmin";
import ModalAgregar from "../../components/AdminProfesores/ModalAgregar.js";

//Services
import { getProfesores } from "../../services/profesores/getProfesores";


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
    getProfesores().then(setProfesores);
  }, []);


  
  const toggleModalAgregar = () => {
    setShowModalAgregar(!showModalAgregar);
  }

  return (
    <div className="bg-base-200">
      <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">

        <AdminHomeHeader user={user} />
  
        {/* Tabla */}
        <TablaCursosProfesores profesores={profesores} setProfesores={setProfesores}/>

        <div class="fixed bottom-4 right-4">
          <Button text={"Agregar Profesor"} onClick={toggleModalAgregar} />
        </div>

        {showModalAgregar ? <ModalAgregar
          showModal={showModalAgregar}
          setShowModal={setShowModalAgregar}
          profesores={profesores}
          setProfesores={setProfesores}
            /> : null}

      </div>
    </div>
  );
}

export default AdminProfesoresPage
