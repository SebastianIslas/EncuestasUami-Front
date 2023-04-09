import React, { useState } from "react";

import TitleRowTablaMaterias from "../Admin/TitleRowTablaMaterias";
import ModalOpciones from "../AdminCursos/ModalOpciones";
import RowOptions from "../common/RowOptions.js";
import ModalConfirmacion from "../AdminCursos/ModalConfirmacion";
import Buscador, {filteredData} from "../common/buscador";

function TablaCursosAdmin({ cursos, setCursos }) {
  

  // Controlar si se muestra el modal
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);

  const [query, setQuery] = useState(""); //Variable para buscador


  // Datos que se tienen dentro del modal, es decir aquellos datos que le
  // pertenecen a la materia que mandó a llamar al modal
  const [modalData, setModalData] = useState({
    clave: null,
    nombre: null,
    tipo: null
  });


  const toggleModal = (claveElegida, nombreElegida, tipoElegido) => {
    // Vemos el estado de mostrar el modal
    if (!showModal){
      // Cremos un nuevo objeto para guardar los datos a usar en el modal
      let newObject = {
        // La clave de la materia que está en el renglón que mandó a llamar el
        // modal
        clave: claveElegida,
        // Nombre del curso en el renglón que mandó a llamar el modal
        nombre: nombreElegida,
        tipo: tipoElegido
        
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
          {filteredData(cursos, query,["nombre", "clave"]).map(curso => 
            <tr className="hover" key={curso.clave}>
              <td className="text-md w-10 opacity-80 break-all">
                {curso.clave}
              </td>
              <td className="text-md break-word font-bold">
                {curso.nombre}
              </td>

              <th>
                <RowOptions 
                  objeto={{clave:curso.clave, nombre:curso.nombre, tipo:curso.tipo}} 
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
          cursos={cursos}
          setCursos={setCursos}
           /> : null}
      
      {showModalConfirmacion ? <ModalConfirmacion
          modalData={modalData}
          setShowModal={setShowModalConfirmacion}
          cursos={cursos}
          setCursos={setCursos}
           /> : null}

    </div>
    </React.Fragment>
  );
}

export default TablaCursosAdmin
