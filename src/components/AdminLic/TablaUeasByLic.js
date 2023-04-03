import React, { useState } from "react";
import TitleRowTablaMaterias from "../Admin/TitleRowTablaMaterias";
import Buscador from "../common/buscador";
import RowOptions from "../common/RowOptions.js";
import ModalOpciones from "../AdminLic/ModalOpciones";
import ModalConfirmacion from "../AdminLic/ModalConfirmacion";

export function TablaUeasByLic({
  cursos, setCursos, claveLic
}) {

  console.log("TABLA", claveLic);
    const [materias, setMaterias] = useState([]);

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


    // Controlar si se muestra el modal
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
    // Datos que se tienen dentro del modal, es decir aquellos datos que le
    // pertenecen a la materia que mandó a llamar al modal
    const [modalData, setModalData] = useState({
      clave: null,
      nombre: null,
      profesores: null
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

    <div id="tabla-materias" className="overflow-x-auto rounded-lg pb-10">

      <Buscador query={query} handleInputChange = {handleInputChange} />

      <table className="table table-compact md:table-normal w-full">
        {/* Header de la tabla */}
        <thead>
          <TitleRowTablaMaterias titles={["Clave", "Nombre", "Profesores", ""]} />
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {/* Renglón */}
          {filteredData.map(curso => <tr className="hover" key={curso.clave}>

            {/* Campo de la clave de la materia */}
            <td>
              <p className="text-md opacity-80">
                {curso.clave}</p>
            </td>

            {/* Campo del nombre de la materia */}
            <td className="break-words">
              <p className="text-md font-bold whitespace-pre-wrap">
                {curso.nombre}</p>
            </td>
            
            {/* Campo de profesores de la materia */}
            {/* Campo del nombre del curso */}
            <td>
              <div className="text-md break-word font-bold">
                {curso.profesores}
                {curso.profesores.map(profesor=>{
                  <p>{profesor}</p>                  
                })}
              </div>
            </td>

            <th>
              <RowOptions objeto={{clave:curso.clave, nombre:curso.nombre}}  toggleModal={toggleModal} toggleModalConfirmacion={toggleModalConfirmacion}/>
            </th>
          </tr>)}
        </tbody>
      </table>

      {showModal ? <ModalOpciones
          modalData={modalData}
          setModalData={setModalData}
          showModal={showModal}
          setShowModal={setShowModal}
          claveLic = {claveLic}
           /> : null}
      
      {showModalConfirmacion ? <ModalConfirmacion
          modalData={modalData}
          setShowModal={setShowModalConfirmacion}
          cursos={cursos}
          setCursos={setCursos}
          claveLic = {claveLic}
           /> : null}

    </div>
    </React.Fragment>

  );
}
