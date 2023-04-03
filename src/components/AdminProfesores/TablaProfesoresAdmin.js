import React, { useState } from "react";

import TitleRowTablaMaterias from "../Admin/TitleRowTablaMaterias";
import ModalOpciones from "../AdminProfesores/ModalOpciones";
import RowOptions from "../common/RowOptions";
import ModalConfirmacion from "../AdminProfesores/ModalConfirmacion";
import Buscador from "../common/buscador";


function TablaProfesoresAdmin({ profesores, setProfesores }) {
  

  // Controlar si se muestra el modal
  const [showModal, setShowModal] = useState(false);

  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);



   ///************* BARRA DE BUSQUEDA *************/
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredData = Object.keys(profesores).filter((key) => {
    const profesor = profesores[key];
    return (
      profesor.nombre.toLowerCase().includes(query.toLowerCase()) ||
      profesor.claveEmpleado.toString().includes(query.toLowerCase())
    );
  }).map((key) => profesores[key]);
  ///************* BARRA DE BUSQUEDA *************/



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
          {filteredData.map(profesor => 
          <tr className="hover" key={profesor.claveEmpleado}>

            {/* Campo de la clave del profesor */}
            <td>
              <div className="text-md w-10 opacity-80">
                <p className='break-all'>
                  {profesor.claveEmpleado}
                </p>
              </div>
            </td>

            {/* Campo del nombre del profesor */}
            <td>
              <div className="text-md break-word font-bold">
                {profesor.nombre}
              </div>
            </td>

            <th>
              <RowOptions objeto={{clave:profesor.claveEmpleado, nombre:profesor.nombre}} toggleModal={toggleModal} toggleModalConfirmacion={toggleModalConfirmacion}/>
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
