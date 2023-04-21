import React, { useEffect, useState } from "react";

import TitleRowTablaMaterias from "../common/table/TitleRowTablaMaterias";
import ModalOpciones from "./ModalOpciones";
import Button from '../common/Button';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function TablaMateriasEncuesta({ materias, maxMaterias, materiasEncuesta, setMateriasEncuesta }) {
  // Para manejar las checkboxes usamos lista con las claves que tenemos en la
  // encuesta, está ligada al JSON que teníamos de materias en la encuesta
  const [listaClavesEncuesta, setListaClavesEncuesta] = useState(Object.keys(materiasEncuesta));
  // const [listaClavesEncuesta, setListaClavesEncuesta] = useState([]);

  // Controlar si se muestra el modal
  const [showModal, setShowModal] = useState(false);

  // Datos que se tienen dentro del modal, es decir aquellos datos que le
  // pertenecen a la materia que mandó a llamar al modal
  const [modalData, setModalData] = useState({
    clave: null,
    nombre: null,
    modalidad: null,
    horario: null
  });

  // Función para desactivar los checkbox si ya alcanzamos el limite de materias
  // y si también el checkbox no está en la lista de materias seleccionadas. Ya
  // que tenemos que desactivar aquellos que no están checked y dejar activos
  // los que están checked puedan ser unchecked
  const handleDisableCheckbox = (claveMateria) => {
    if((listaClavesEncuesta.length >= maxMaterias) 
          && (listaClavesEncuesta.indexOf(claveMateria) < 0)){
      return true;
    }else{
      return false;
    }
  }

  // Función que agrega o elimina materias elegidas a partir de dar al checkbox
  const handleCheckbox = (e) => {
    // Obtenemos del evento el nombre del row que también es la clave de la
    // materia y el estatus del check después de dar click
    const { name, checked } = e.target

    // Array para cambiar los datos
    let copyArray;

    // Copia de las materias en la encuesta
    let copyOfMaterias = {...materiasEncuesta};

    // Eliminar la materia de la lista de encuesta
    if (!checked){
      if(listaClavesEncuesta.indexOf(name) >= 0){
        // TODO: Agregar mensaje de que se eliminó una materia
        delete copyOfMaterias[name];
        copyArray = [...listaClavesEncuesta];
        copyArray.splice(listaClavesEncuesta.indexOf(name), 1);
        // setListaClavesEncuesta([...copyArray]);
      }
    // Agregar una materia a la encuesta
    }else{
      // Evitar que si se modifica el fuente del html se agreguen más materias
      if (listaClavesEncuesta.length >= maxMaterias) return

      copyOfMaterias[name] = {
        modalidad: "Presencial",
        horario: "Mañana"
      };
      copyArray = [...listaClavesEncuesta, name];
      // setListaClavesEncuesta([...listaClavesEncuesta, name]);
    }

    // Actualizar el state de los arreglos
    setListaClavesEncuesta(copyArray);
    setMateriasEncuesta(copyOfMaterias);
  }

  // Cambiar entre mostrar o no el modal, pero cada que se va a mostrar el
  // modal cargamos los datos de la materia que mandó a llamar al modal para
  // mostrar las opciones elegidas si es que anteriormente ya estaba dentro de
  // las materias seleccionadas para la encuesta.
  const toggleModal = (claveElegida, nombreElegida) => {
    // Vemos el estado de mostrar el modal
    if (!showModal){
      // Cremos un nuevo objeto para guardar los datos a usar en el modal
      let newObject = {
        // La clave de la materia que está en el renglón que mandó a llamar el
        // modal
        clave: claveElegida,
        // Nombre de la materia en el renglón que mandó a llamar el modal
        nombre: nombreElegida,
        // Tratamos de obtener datos del objeto que guarda las materias de la
        // encuesta, si no está la materia en el arreglo materiasEncuesta el
        // campo tiene un valor nulo dentro del modal
        modalidad: materiasEncuesta[claveElegida] ?
                      materiasEncuesta[claveElegida].modalidad : null,
        horario: materiasEncuesta[claveElegida] ?
                    materiasEncuesta[claveElegida].horario : null
      }

      // Actualizamos los valores dentro del modal
      setModalData(newObject);
    }

    // Cambiar el estado del modal
    setShowModal(!showModal);
  }

  // Actualiza automáticamente la lista de claves cada que se insertan materias
  // en el objeto de materiasEncuesta
  useEffect(() => {
    setListaClavesEncuesta(Object.keys(materiasEncuesta));
  }, [materiasEncuesta])

   useEffect(() => {
     console.log(modalData);
   }, [modalData]);

   
  return (
    <React.Fragment>
    {/* Container de la tabla */}
    <div id="tabla-materias"
          className="overflow-x-auto rounded-lg">

      <table className="table table-compact md:table-normal w-full">
        {/* Header de la tabla */}
        <thead>
          <TitleRowTablaMaterias titles={[" ", "Clave", "Nombre", ""]} />
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {/* Renglón */}
          {materias.map(materia => 
            <tr className="hover" key={materia.clave}>
              {/* Checkbox */}
              <td className='w-8'>
                <div className="flex justify-center">
                  <input type="checkbox"
                        className="checkbox"
                        // Nombre de cada checkbox
                        name={materia.clave.toString()}
                        // Desactivar el checkbox
                        disabled={handleDisableCheckbox(materia.clave.toString())}
                        // Hacer check si está en la lista de materias
                        checked={listaClavesEncuesta.includes(materia.clave.toString())}
                        // Función que altera la lista de materia
                        onChange={handleCheckbox}/>
                  </div>
              </td>

              {/* Campo de la clave de la materia */}
              <td>
                <p className="text-md opacity-80">
                  {materia.clave}</p>
              </td>

              {/* Campo del nombre de la materia */}
              <td className="break-words">
                <p className="text-md font-bold whitespace-pre-wrap">{materia.nombre}</p>
                {materiasEncuesta[materia.clave] ? (
                <p className="text-xs break-words text-base-content">
                  Modalidad: {materiasEncuesta[materia.clave].modalidad}
                  <br/>
                  Horario: {materiasEncuesta[materia.clave].horario}
                </p>) : null}
              </td>

              <th>
                {/* Botón Opciones */}
                <div className='flex justify-end'>
                <Button onClick={() => {toggleModal(materia.clave, materia.nombre)}}
                        disabled={handleDisableCheckbox(materia.clave.toString())}
                        text={<FontAwesomeIcon icon={faEdit} />} />
                </div>
              </th>
            </tr>
          )}
        </tbody>

      </table>

      {/* Template del modal de Opciones */}
      {showModal ? <ModalOpciones
          modalData={modalData}
          setModalData={setModalData}
          showModal={showModal}
          setShowModal={setShowModal}
          materiasEncuesta={materiasEncuesta}
          setMateriasEncuesta={setMateriasEncuesta}
          listaClavesEncuesta={listaClavesEncuesta}
          setListaClavesEncuesta={setListaClavesEncuesta} /> : null}

    </div>
    </React.Fragment>
  );
}

export default TablaMateriasEncuesta
