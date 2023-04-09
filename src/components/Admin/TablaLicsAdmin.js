import React, { useState } from "react";

import TitleRowTablaMaterias from "./TitleRowTablaMaterias";
import ModalOpciones from "./ModalOpciones";
import RowOptions from "../common/RowOptions";
import ModalConfirmacion from "./ModalConfirmacion";
import Buscador, {filteredData} from "../common/buscador";



function TablaLicsAdmin({ licenciaturas, setLicenciaturas }) {
  

  // Controlar si se muestra el modal
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);

  const [query, setQuery] = useState(""); //Variable para buscador

 

  // Datos que se tienen dentro del modal, es decir aquellos datos que le
  // pertenecen a la materia que mandó a llamar al modal
  const [modalData, setModalData] = useState({
    clave: null,
    nombre: null
  });


  const toggleModal = (claveElegida, nombreElegida) => {
    // Vemos el estado de mostrar el modal
    if (!showModal){
      // Cremos un nuevo objeto para guardar los datos a usar en el modal
      let newObject = {
        // La clave de la materia que está en el renglón que mandó a llamar el
        // modal
        clave: claveElegida,
        // Nombre de la licenciatura en el renglón que mandó a llamar el modal
        nombre: nombreElegida,
        
        
      }

      // Actualizamos los valores dentro del modal
      setModalData(newObject);
    }

    // Cambiar el estado del modal
    setShowModal(!showModal);
  }

  const toggleModalConfirmacion = (claveElegida, nombreElegida) => {
    if (!showModalConfirmacion){
      let newObject = {
        clave: claveElegida,
        nombre: nombreElegida,  
      }
      setModalData(newObject);
    }
    setShowModalConfirmacion(!showModalConfirmacion);
  }


  return (

    <React.Fragment>
    {/* Container de la tabla */}
    <Buscador query={query} setQuery={setQuery}/>
    <div id="tabla-materias" className="overflow-x-auto rounded-lg bg-base-400">
      <table className="table table-compact md:table-normal w-full">
        <thead>
          <TitleRowTablaMaterias titles={["Clave", "Nombre", ""]} />
        </thead>
        <tbody>
          {/* Renglón con ************* BARRA DE BUSQUEDA  */}
          {filteredData(licenciaturas, query,["nombre", "clave"]).map(licenciatura => 
            <tr className="hover" key={licenciatura.clave}>
              <td className="text-md w-10 opacity-80 break-all">
                {licenciatura.clave}
              </td>
              <td className="text-md break-word font-bold">
                  {licenciatura.nombre}
              </td>
              <th>
                <RowOptions 
                  objeto={{clave:licenciatura.clave, nombre:licenciatura.nombre, btnVer:`/admin/licenciatura/${licenciatura.clave}`}} 
                  toggleModal={toggleModal} toggleModalConfirmacion={toggleModalConfirmacion}/>
              </th>
            </tr>
          )}
        </tbody>
      </table>

      {showModal ? <ModalOpciones
          modalData={modalData}
          setModalData={setModalData}
          showModal={showModal}
          setShowModal={setShowModal}
          licenciaturas={licenciaturas}
          setLicenciaturas={setLicenciaturas}
           /> : null}
      
      {showModalConfirmacion ? <ModalConfirmacion
          modalData={modalData}
          setShowModal={setShowModalConfirmacion}
          licenciaturas={licenciaturas}
          setLicenciaturas={setLicenciaturas}
           /> : null}

    </div>
    </React.Fragment>
  );
}

export default TablaLicsAdmin
