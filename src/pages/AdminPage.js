import React, { useEffect, useState } from "react";
import ButtonAddLic from '../components/Admin/ButtonAddLic.js';
import AdminHomeHeader from '../components/Admin/AdminHomeHeader';
import TablaLicsAdmin from "../components/Admin/TablaLicsAdmin";


function AdminPage() {

  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  // Lista la licenciatura solo usamos la clave y el nombre
  const [licenciaturas, setLicenciaturas] = useState([]);

  const [licenciaturasEncuesta, setLicenciaturasEncuesta] = useState({});

  useEffect(() => {
    document.title = "UEAncuestas UAMI";

    setLicenciaturas([
      {clave: 11111111, nombre: "Licenciatura en Balsamiq 1"},
      {clave: 22222222, nombre: "Licenciatura en Balsamiq 2"},
      {clave: 33333333, nombre: "Licenciatura en Balsamiq 3"},
      {clave: 44444444, nombre: "Licenciatura en Balsamiq 4"}
    ]);

  }, []);

  // Aqui Valdo Guarda la seleccion de las opciones del usuario
  useEffect(() => {
    console.log(licenciaturasEncuesta);
  }, [licenciaturasEncuesta]);

  return (
  <div className="bg-base-200">
  <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">

      <AdminHomeHeader user={user} />
 
      {/* Tabla */}
      <TablaLicsAdmin licenciaturas={licenciaturas}  
                             licenciaturasEncuesta={licenciaturasEncuesta}
                             setLicenciaturasEncuesta={setLicenciaturasEncuesta}
      />

      <ButtonAddLic />


  </div>
  </div>);
}

export default AdminPage
