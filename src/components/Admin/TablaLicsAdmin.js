import React, { useEffect, useState } from "react";

import TitleRowTablaMaterias from "./TitleRowTablaMaterias";
import ModalOpciones from "./ModalOpciones";
import RowOptions from "./RowOptions.js";


function TablaLicsAdmin({ licenciaturas, licenciaturasEncuesta, setLicenciaturasEncuesta }) {
  
  // Para manejar las checkboxes usamos lista con las claves que tenemos en la
  // encuesta, está ligada al JSON que teníamos de licenciaturas en la encuesta
  const [listaClavesEncuesta, setListaClavesEncuesta] = useState(Object.keys(licenciaturasEncuesta));
  // const [listaClavesEncuesta, setListaClavesEncuesta] = useState([]);

  // Controlar si se muestra el modal
  const [showModal, setShowModal] = useState(false);

  // Datos que se tienen dentro del modal, es decir aquellos datos que le
  // pertenecen a la materia que mandó a llamar al modal
  const [modalData, setModalData] = useState({
    clave: null,
    nombre: null
  });

  // Cambiar entre mostrar o no el modal, pero cada que se va a mostrar el
  // modal cargamos los datos de la materia que mandó a llamar al modal para
  // mostrar las opciones elegidas si es que anteriormente ya estaba dentro de
  // las licenciaturas seleccionadas para la encuesta.
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

  // Actualiza automáticamente la lista de claves cada que se insertan licenciaturas
  // en el objeto de licenciaturasEncuesta
  useEffect(() => {
    setListaClavesEncuesta(Object.keys(licenciaturasEncuesta));
  }, [licenciaturasEncuesta])


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
              <RowOptions licenciatura={licenciatura} toggleModal={toggleModal} />
            </th>
          </tr>)}

        </tbody>

        {/* Footer de la tabla */}
        <tfoot>
          <TitleRowTablaMaterias />
        </tfoot>
      </table>

      {/* Template del modal de Opciones */}
      {showModal ? <ModalOpciones
          modalData={modalData}
          setModalData={setModalData}
          showModal={showModal}
          setShowModal={setShowModal}
          licenciaturasEncuesta={licenciaturasEncuesta}
          setLicenciaturasEncuesta={setLicenciaturasEncuesta}
          listaClavesEncuesta={listaClavesEncuesta}
          setListaClavesEncuesta={setListaClavesEncuesta} /> : null}

    </div>
    </React.Fragment>
  );
}

export default TablaLicsAdmin
