import React, { useState } from "react";

import ModalOpciones from "../AdminProfesores/ModalOpciones";
import ModalConfirmacion from "../AdminProfesores/ModalConfirmacion";
import RowOptions from "../common/table/RowOptions";
import Buscador, {filteredData} from "../common/table/buscador";
import TitleRowTablaMaterias from "../common/table/TitleRowTablaMaterias";

function TablaProfesoresAdmin({ profesores, setProfesores }) {
  

  // Controlar si se muestra el modal
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);

  const [query, setQuery] = useState(""); //Variable para buscador




  // Datos que se tienen dentro del modal, es decir aquellos datos que le
  // pertenecen a la materia que mandó a llamar al modal
  const [modalData, setModalData] = useState({
    claveEmpleado: null,
    nombre: null
  });


  const toggleModal = (claveElegida, nombreElegida) => {
    // Vemos el estado de mostrar el modal
    if (!showModal){
      // Cremos un nuevo objeto para guardar los datos a usar en el modal
      let newObject = {
        // La clave de la materia que está en el renglón que mandó a llamar el
        // modal
        claveEmpleado: claveElegida,
        // Nombre del profesor en el renglón que mandó a llamar el modal
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
        claveEmpleado: claveElegida,
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
          {filteredData(profesores, query,["nombre", "claveEmpleado"]).map(profesor => 
            <tr className="hover" key={profesor.claveEmpleado}>
              <td className="text-md w-10 opacity-80 break-all">
                {profesor.claveEmpleado}
              </td>
              <td className="text-md break-word font-bold">
                  {profesor.nombre}
              </td>
              <th>
                <RowOptions objeto={{clave:profesor.claveEmpleado, nombre:profesor.nombre}} toggleModal={toggleModal} toggleModalConfirmacion={toggleModalConfirmacion}/>
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
          profesores={profesores}
          setProfesores={setProfesores}
           /> : null}
      
      {showModalConfirmacion ? <ModalConfirmacion
          modalData={modalData}
          setShowModal={setShowModalConfirmacion}
          profesores={profesores}
          setProfesores={setProfesores}
           /> : null}

    </div>
    </React.Fragment>
  );
}

export default TablaProfesoresAdmin
