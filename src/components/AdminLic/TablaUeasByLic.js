import React, { useState } from "react";
import TitleRowTablaMaterias from "../common/table/TitleRowTablaMaterias";
import RowOptions from "../common/table/RowOptions";
import Buscador, {filteredData} from "../common/table/buscador";
import ModalOpciones from "../AdminLic/ModalOpciones";
import ModalConfirmacion from "../AdminLic/ModalConfirmacion";

export function TablaUeasByLic({
  cursos, setCursos, claveLic
}) {

  console.log("TABLA", claveLic);
    const [materias, setMaterias] = useState([]);

    const [query, setQuery] = useState(""); //Variable para buscador

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

    <Buscador query={query} setQuery={setQuery}/>
    <div id="tabla-materias" className="overflow-x-auto rounded-lg pb-10">
      <table className="table table-compact md:table-normal w-full">
        <thead>
          <TitleRowTablaMaterias titles={["Clave", "Nombre", "Profesores", ""]} />
        </thead>
        <tbody>
          {/* Renglón con ************* BARRA DE BUSQUEDA  */}
          {filteredData(cursos, query,["nombre", "clave"]).map(curso => 
            <tr className="hover" key={curso.clave}>
              <td className="text-md opacity-80">
                  {curso.clave}
              </td>
              <td className="text-md break-word font-bold">
                  {curso.nombre}
              </td>              
              {/* Campo de profesores de la materia */}
              <td className="text-md break-word font-bold">
                  {curso.profesores}
                  {curso.profesores.map(profesor=>{
                    <p>{profesor}</p>                  
                  })}
              </td>

              <th>
                <RowOptions 
                  objeto={{clave:curso.clave, nombre:curso.nombre}}  
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
