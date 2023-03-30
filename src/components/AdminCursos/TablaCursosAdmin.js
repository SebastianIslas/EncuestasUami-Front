import React, { useState } from "react";

import TitleRowTablaMaterias from "../Admin/TitleRowTablaMaterias";
import ModalOpciones from "../AdminCursos/ModalOpciones";
import RowOptions from "../../components/RowOptions.js";
import ModalConfirmacion from "../AdminCursos/ModalConfirmacion";
import Buscador from "../common/buscador";


function TablaCursosAdmin({ cursos, setCursos }) {
  

  // Controlar si se muestra el modal
  const [showModal, setShowModal] = useState(false);

  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);


  ///************* BARRA DE BUSQUEDA *************/
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredData = Object.keys(cursos).filter((key) => {
    const curso = cursos[key];
    return (
      curso.nombre.toLowerCase().includes(query.toLowerCase()) ||
      curso.clave.toString().includes(query.toLowerCase())
    );
  }).map((key) => cursos[key]);
  ///************* BARRA DE BUSQUEDA *************/


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
    <div id="tabla-materias"
          className="overflow-x-auto rounded-lg bg-base-400">
   
      <Buscador query={query} handleInputChange = {handleInputChange} />

      <table className="table table-compact md:table-normal w-full">
        {/* Header de la tabla */}
        <thead>
          <TitleRowTablaMaterias titles={["Clave", "Nombre", ""]} />
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {/* Renglón con ************* BARRA DE BUSQUEDA  */}
          {filteredData.map(curso => 
          <tr className="hover" key={curso.clave}>
            {/* Campo de la clave del curso */}
            <td>
              <div className="text-md w-10 opacity-80">
                <p className='break-all'>
                  {curso.clave}
                </p>
              </div>
            </td>

            {/* Campo del nombre del curso */}
            <td>
              <div className="text-md break-word font-bold">
                {curso.nombre}
              </div>
            </td>

            <th>
              <RowOptions objeto={{clave:curso.clave, nombre:curso.nombre, tipo:curso.tipo}} toggleModal={toggleModal} toggleModalConfirmacion={toggleModalConfirmacion}/>
            </th>
          </tr>)}

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
