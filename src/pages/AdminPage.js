import React, { useEffect, useState } from "react";
import Button from '../components/Button';
import AdminHomeHeader from '../components/Admin/AdminHomeHeader';
import TablaLicsAdmin from "../components/Admin/TablaLicsAdmin";
import ModalAgregar from "../components/Admin/ModalAgregar.js";

import LICENCIATURAS from "../data/LICENCIATURAS.js";

function AdminPage() {

  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  // Lista la licenciatura solo usamos la clave y el nombre
  const [licenciaturas, setLicenciaturas] = useState([]);

  const [showModalAgregar, setShowModalAgregar] = useState(false);


  useEffect(() => {
    document.title = "Panel de Administracion";
    // Peticion a la API (aqui pa, esta linea ^-^)
    console.warn("Se procede a cargar la unica licenciatura")
    setLicenciaturas([{
      "clave": 30,
      "nombre": "Licenciatura en Computación"
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
      <TablaLicsAdmin licenciaturas={licenciaturas}  
                      setLicenciaturas={setLicenciaturas}
      />
      <div class="fixed bottom-4 right-4">
        <Button text={"Agregar Licenciatura"} onClick={toggleModalAgregar} />
      </div>

      {showModalAgregar ? <ModalAgregar
          showModal={showModalAgregar}
          setShowModal={setShowModalAgregar}
          licenciaturas={licenciaturas}
          setLicenciaturas={setLicenciaturas}
           /> : null}

  </div>
  </div>);
}

export default AdminPage
