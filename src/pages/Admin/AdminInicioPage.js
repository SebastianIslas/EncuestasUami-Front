import React, { useEffect, useState } from "react";
import Button from '../../components/common/Button';
import AdminHomeHeader from '../../components/Admin/AdminHomeHeader';
import TablaLicsAdmin from "../../components/Admin/TablaLicsAdmin";
import ModalAgregar from "../../components/Admin/ModalAgregar.js";

//Services
import { getLics } from "../../services/licenciaturas/getLics";


function AdminInicioPage() {

  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  // Lista la licenciatura solo usamos la clave y el nombre
  const [licenciaturas, setLicenciaturas] = useState([]);

  const [showModalAgregar, setShowModalAgregar] = useState(false);


  useEffect(() => {
    document.title = "Panel de Administracion";
    // Peticion a la API (aqui pa, esta linea ^-^)
    getLics().then(setLicenciaturas);
  }, []);


  
  const toggleModalAgregar = () => {
    setShowModalAgregar(!showModalAgregar);
  }

  return (
    <div className="bg-base-200">
      <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">

        <AdminHomeHeader _user={user} />
        {/* Tabla */}
        <TablaLicsAdmin licenciaturas={licenciaturas} setLicenciaturas={setLicenciaturas}/>

        <div className="fixed bottom-4 right-4">
          <Button text={"Agregar Licenciatura"} onClick={toggleModalAgregar} />
        </div>

        {showModalAgregar ? <ModalAgregar
          showModal={showModalAgregar}
          setShowModal={setShowModalAgregar}
          licenciaturas={licenciaturas}
          setLicenciaturas={setLicenciaturas}
            /> : null}

      </div>
    </div>
  );
}

export default AdminInicioPage
