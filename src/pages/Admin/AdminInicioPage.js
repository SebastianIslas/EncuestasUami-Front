import React, { useEffect, useState } from "react";
import TablaLicsAdmin from "../../components/Admin/TablaLicsAdmin";
import ModalAgregar from "../../components/Admin/ModalAgregar.js";
import { ModalProvider } from "../../context/modalContext";

//Services
import { getLics } from "../../services/licenciaturas/getLics";


function AdminInicioPage() {
  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  // Lista la licenciatura solo usamos la clave y el nombre
  const [licenciaturas, setLicenciaturas] = useState([]);

  //Valores para el context del modal de licenciaturas
  const dataModal = {
    clave: "",
    nombre: ""
  }

  useEffect(() => {
    document.title = "Panel de Administracion";
    // Peticion a la API (aqui pa, esta linea ^-^)
    getLics().then(setLicenciaturas);
  }, []);

  return (
    <div className="bg-base-200">
      <div className="min-h-screen bg-base-200 px-2 md:px-10 mx-auto">
        <ModalProvider initialModalData={dataModal}>
          <TablaLicsAdmin licenciaturas={licenciaturas} setLicenciaturas={setLicenciaturas}/>
          <ModalAgregar licenciaturas={licenciaturas} setLicenciaturas={setLicenciaturas}/> 
        </ModalProvider>
      </div>
    </div>
  );
}

export default AdminInicioPage
