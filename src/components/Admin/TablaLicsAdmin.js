import React, { useState } from "react";

import TitleRowTablaMaterias from "./TitleRowTablaMaterias";
import ModalOpciones from "./ModalOpciones";
import RowOptions from "../RowOptions.js";
import ModalConfirmacion from "./ModalConfirmacion";



function TablaLicsAdmin({ licenciaturas, setLicenciaturas }) {
  

  // Controlar si se muestra el modal
  const [showModal, setShowModal] = useState(false);

  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);

 

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
    <div id="tabla-materias"
          className="overflow-x-auto rounded-lg bg-base-400">

      <table className="table table-compact md:table-normal w-full">
        {/* Header de la tabla */}
        <thead>
          <TitleRowTablaMaterias />
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {/* Renglón */}
          {licenciaturas.map(licenciatura => <tr className="hover" key={licenciatura.clave}>

            {/* Campo de la clave de la licenciatura */}
            <td>
              <div className="text-md w-10 opacity-80">
                <p className='break-all'>
                  {licenciatura.clave}
                </p>
              </div>
            </td>

            {/* Campo del nombre de la licenciatura */}
            <td>
              <div className="text-md break-word font-bold">
                {licenciatura.nombre}
              </div>
            </td>

            <th>
              <RowOptions objeto={{clave:licenciatura.clave, nombre:licenciatura.nombre, btnVer:`/admin/licenciatura/${licenciatura.clave}`}} 
              toggleModal={toggleModal} toggleModalConfirmacion={toggleModalConfirmacion}/>
            </th>
          </tr>)}

        </tbody>

        {/* Footer de la tabla */}
        <tfoot>
          <TitleRowTablaMaterias />
        </tfoot>
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
