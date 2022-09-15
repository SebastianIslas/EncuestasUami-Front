import React, { useEffect, useState } from "react";
import ButtonAddLic from '../components/Admin/ButtonAddLic.js';
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
    setLicenciaturas(LICENCIATURAS);
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

      <ButtonAddLic onClick={toggleModalAgregar} />

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