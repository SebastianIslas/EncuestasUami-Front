import React, { useEffect, useState } from "react";

import TitleRowTablaMaterias from "./TitleRowTablaMaterias";
import Modal from "../Modal";

// TODO: creo no se necesita
// import { MateriasEncuestaContext } from "../../pages/EncuestaPage";

function TablaMateriasEncuesta({ materias, maxMaterias, materiasEncuesta, setMateriasEncuesta }) {
  // Para manejar las checkboxes usamos lista con las claves que tenemos en la
  // encuesta, está ligada al JSON que teníamos de materias en la encuesta
  const [listaClavesEncuesta, setListaClavesEncuesta] = useState(Object.keys(materiasEncuesta));
  // const [listaClavesEncuesta, setListaClavesEncuesta] = useState([]);

  const [showModal, setShowModal] = useState(false);
  // Datos que se tienen dentro del modal
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
      copyOfMaterias[name] = {
        modalidad: "Presencial",
        horario: "Sin preferencia"
      };
      copyArray = [...listaClavesEncuesta, name];
      // setListaClavesEncuesta([...listaClavesEncuesta, name]);
    }

    // Actualizar el state de los arreglos
    setListaClavesEncuesta(copyArray);
    setMateriasEncuesta(copyOfMaterias);
  }

  const toggleModal = (claveElegida, nombreElegida) => {
    if (!showModal){
      let newObject = {
        clave: claveElegida,
        nombre: nombreElegida,
        modalidad: materiasEncuesta[claveElegida] ?
                      materiasEncuesta[claveElegida].modalidad : null,
        horario: materiasEncuesta[claveElegida] ?
                    materiasEncuesta[claveElegida].horario : null
      }

      setModalData(newObject);
    }

    setShowModal(!showModal);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  // Función que cambia los datos de la encuesta según los cambios en el modal
  const setEncuestaFromModal = (claveMateria, propiedad, valorPropiedad) => {
    let copyOfMateriasEncuesta = {...materiasEncuesta};
    copyOfMateriasEncuesta[propiedad] = valorPropiedad;
    setMateriasEncuesta(copyOfMateriasEncuesta);

    let copyOfModalData = {...modalData};
    copyOfModalData[propiedad] = valorPropiedad;
    setModalData(copyOfModalData);
  }

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
              {/* <ModalOpciones clave={materia.clave} 
                              nombreMateria={materia.nombre}
                              isDisabled={handleDisableCheckbox(materia.clave.toString())}
                              // Manda un objeto que contiene la materia si está en la encuesta
                              materiaElegidaEncuesta={materiasEncuesta[materia.clave]}/> */}

              <div className='flex flex-row-reverse'>
                <button className="btn btn-accent
                                  btn-xs sm:btn-sm md:btn-md
                                  before:content-['+']
                                  md:before:content-['Opciones']
                                  w-8 md:w-24"
                        onClick={() => {
                            toggleModal(materia.clave, materia.nombre)
                        }}
                        disabled={handleDisableCheckbox(materia.clave.toString())}
                ></button>

              </div>
            </th>
          </tr>)}

        </tbody>

        {/* Footer de la tabla */}
        <tfoot>
          <TitleRowTablaMaterias />
        </tfoot>
      </table>

      {/* TODO: terminar el estilo y funcionalidad del modal */}
      {showModal ? (<Modal>
        <div className="absolute w-full h-screen z-50">
        {/* Botón para cerrar el modal */}
        <div className="modal-box bg-base-300 mx-auto">
          <label className="btn btn-sm btn-circle absolute right-2 top-2"
                  onClick={closeModal}>
            ✕
          </label>
          {/* El título del modal es el nombre de la materia */}
          <h2 className="font-bold text-lg">{modalData.nombre}</h2>
          {/* También mostramos la clave de la materia */}
          <p className="text-sm font-normal text-slate-500">({modalData.clave})</p>
          <br/>

          <p className="text-sm pb-2">¿En qué modalidad te gustaría que se abriera esta UEA?</p>
          <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
            <input type="radio" name="modalidad" id="Presencial" checked hidden/>
            <label htmlFor="Presencial">
              <button className="btn btn-active btn-ghost">Presencial</button>
            </label>

            <input type="radio" name="modalidad" id="Virtual" hidden/>
            <label htmlFor="Virtual">
              <button className="btn btn-active btn-ghost">Virtual</button>
            </label>
          </div>
          <br/>

          <p className="text-sm pb-2">¿En qué horario te gustaría llevar esta UEA?</p>
          <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
            <input type="radio" name="horario" id="Manana" checked hidden/>
            <label htmlFor="Manana">
              <button className="btn btn-active btn-ghost">Mañana</button>
            </label>

            <input type="radio" name="horario" id="Tarde" hidden/>
            <label htmlFor="Tarde">
              <button className="btn btn-active btn-ghost">Tarde</button>
            </label>
           <label htmlFor="Tade-noche">
              <button className="btn btn-active btn-ghost">Tarde-noche</button>
            </label>

            <input type="radio" name="horario" id="Sin-preferencia" hidden/>
            <label htmlFor="Sin-preferencia">
              <button className="btn btn-active btn-ghost">Sin preferencia</button>
            </label>
          </div>

          <div className="modal-action justify-between">
            <div>
            <p className="text-xs font-normal text-slate-500">Mañana: 8:00 a 12:00</p>
            <p className="text-xs font-normal text-slate-500">Tarde: 12:00 a 16:00</p>
            <p className="text-xs font-normal text-slate-500">Tarde-noche: 16:00 a 21:00</p>
            </div>
            <label className="btn">Aceptar</label>
          </div>
        </div>
        </div>
      </Modal>) : null}

    </div>
    </React.Fragment>
  );
} 

export default TablaMateriasEncuesta
