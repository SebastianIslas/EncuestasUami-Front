import React, { useState } from "react";

import TitleRowTablaMaterias from "./TitleRowTablaMaterias";
import ModalOpciones from "./ModalOpciones";

// TODO: creo no se necesita
// import { MateriasEncuestaContext } from "../../pages/EncuestaPage";

function TablaMateriasEncuesta({ materias, maxMaterias, materiasEncuesta, setMateriasEncuesta }) {
  // Para manejar las checkboxes usamos lista con las claves que tenemos en la
  // encuesta, está ligada al JSON que teníamos de materias en la encuesta
  const [listaClavesEncuesta, setListaClavesEncuesta] = useState(Object.keys(materiasEncuesta));
  // const [listaClavesEncuesta, setListaClavesEncuesta] = useState([]);

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
      copyOfMaterias[name] = {
        "modalidad": "Presencial",
        "horario": "Sin preferencia"
      };
      copyArray = [...listaClavesEncuesta, name];
      // setListaClavesEncuesta([...listaClavesEncuesta, name]);
    }

    // Actualizar el state de llos arreglos
    setListaClavesEncuesta(copyArray);
    setMateriasEncuesta(copyOfMaterias);
  }

  return (
    // Container de la tabla
    <div id="tabla-materias"
          className="overflow-x-auto rounded-lg">

      <table className="table table-compact md:table-normal w-full">
        {/* Header de la tabla */}
        <thead>
          <TitleRowTablaMaterias />
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {/* Renglón */}
          {materias.map(materia => <tr className="hover" key={materia.clave}>
            {/* Checkbox */}
            <th className='w-6'>
              <label>
                <input type="checkbox"
                      className="checkbox"
                      // Nombre de cada checkbox
                      name={materia.clave.toString()}
                      // Desactivar el checkbox
                      disabled={handleDisableCheckbox(materia.clave.toString())} 
                      // Hacer check si está en la lista de materias
                      checked={listaClavesEncuesta.includes(materia.clave.toString())} 
                      // Función que altera la lista de materias
                      onChange={handleCheckbox}/>
              </label>
            </th>

            {/* Campo de la clave de la materia */}
            <td>
              <div className="text-md w-10 opacity-80">
                <p className='break-all'>
                  {materia.clave}
                </p>
              </div>
            </td>

            {/* Campo del nombre de la materia */}
            <td>
              <div className="text-md break-word font-bold">
                {materia.nombre}
              </div>
            </td>

            {/* Botón Opciones */}
            <th>
              {/* <div className='flex flex-row-reverse'>
                <button className="btn btn-accent
                                  btn-xs sm:btn-sm md:btn-md
                                  before:content-['+']
                                  md:before:content-['Opciones']
                                  w-8 md:w-24"
                        disabled={handleDisableCheckbox(materia.clave.toString())}>
                </button>
              </div> */}
              <ModalOpciones clave={materia.clave} 
                                nombreMateria={materia.nombre}
                                isDisabled={handleDisableCheckbox(materia.clave.toString())}/>
            </th>
          </tr>)}

        </tbody>

        {/* Footer de la tabla */}
        <tfoot>
          <TitleRowTablaMaterias />
        </tfoot>
      </table>
    </div>
  );
} 

export default TablaMateriasEncuesta