import React, { useEffect, useState, useContext } from "react";

import TitleRowTablaMaterias from "../common/table/TitleRowTablaMaterias";
import ModalOpciones from "./ModalOpciones";
import Button from '../common/Button';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalContext } from "../../context/modalContext";


function TablaMateriasEncuesta({ materias, maxMaterias, materiasEncuesta, setMateriasEncuesta }) {
  //Se usan checkbox con una lista que contiene las claves de la encuesta relacionadas al JSON de materias.
  const [listaClavesEncuesta, setListaClavesEncuesta] = useState(Object.keys(materiasEncuesta));
  const {toggleModal } = useContext(ModalContext);
  
  //Desactivar checkbox que no están en la lista de materias seleccionadas
  // y que permita seleccionar solo la cantidad permitida de materias.
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
    let copyArray; // Array para cambiar los datos
    let copyOfMaterias = {...materiasEncuesta}; // Copia de las materias en la encuesta

    // Eliminar la materia de la lista de encuesta
    if (!checked){
      if(listaClavesEncuesta.indexOf(name) >= 0){
        delete copyOfMaterias[name];
        copyArray = [...listaClavesEncuesta];
        copyArray.splice(listaClavesEncuesta.indexOf(name), 1);
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
    }
    // Actualizar el state de los arreglos
    setListaClavesEncuesta(copyArray);
    setMateriasEncuesta(copyOfMaterias);
  }

  // Actualización automática de la lista de claves al agregar materias a materiasEncuesta.
  useEffect(() => {
    setListaClavesEncuesta(Object.keys(materiasEncuesta));
  }, [materiasEncuesta])

   
  return (
    <React.Fragment>
    {/* Container de la tabla */}
    <div id="tabla-materias"
          className="overflow-x-auto rounded-lg">

      <table className="table table-compact md:table-normal w-full">
        <thead>
          <TitleRowTablaMaterias titles={[" ", "Clave", "Nombre", ""]} />
        </thead>

        <tbody>
          {/* Renglón */}
          {materias.map(materia => 
            <tr className="hover" key={materia.clave}>
              {/* Checkbox */}
              <td className='w-8'>
                <div className="flex justify-center">
                  <input type="checkbox"
                        className="checkbox"
                        name={materia.clave.toString()}
                        disabled={handleDisableCheckbox(materia.clave.toString())}
                        // Hacer check si está en la lista de materias
                        checked={listaClavesEncuesta.includes(materia.clave.toString())}
                        // Función que altera la lista de materia
                        onChange={handleCheckbox}/>
                  </div>
              </td>

              <td>
                <p className="text-md opacity-80">
                  {materia.clave}</p>
              </td>

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
                <Button onClick={() => {
                  toggleModal([
                      materia.clave, 
                      materia.nombre,
                      materiasEncuesta[materia.clave] ?
                                  materiasEncuesta[materia.clave].modalidad : null,
                      materiasEncuesta[materia.clave] ?
                                materiasEncuesta[materia.clave].horario : null],
                     "opciones")
                }}
                        disabled={handleDisableCheckbox(materia.clave.toString())}
                        text={<FontAwesomeIcon icon={faEdit} />} />
                </div>
              </th>
            </tr>
          )}
        </tbody>

      </table>

        <ModalOpciones
          materiasEncuesta={materiasEncuesta}
          setMateriasEncuesta={setMateriasEncuesta}
          listaClavesEncuesta={listaClavesEncuesta}
          setListaClavesEncuesta={setListaClavesEncuesta} />
    </div>
    </React.Fragment>
  );
}

export default TablaMateriasEncuesta
