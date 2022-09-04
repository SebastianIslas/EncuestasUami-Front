import React, { useState } from "react";

import TitleRowTablaMaterias from "./TitleRowTablaMaterias";
import Modal from "../Modal";

// TODO: creo no se necesita
// import { MateriasEncuestaContext } from "../../pages/EncuestaPage";

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

  // Función a ejecutar al presionar el botón dentro del modal, se encargar de
  // guardar los datos en el objeto materiasEncuesta y cierra el modal
  const closeModal = () => {
    // Copiamos el objeto de materiasEncuesta
    let copyMateriasEncuesta = {...materiasEncuesta};

    // Copía de la lista de claves de materias elegidas para ser usadas en los
    // checkbox
    let copyListaClavesEncuesta;

    // Agregamos la clave dentro del modal a la lista de claves de
    // materiasEncuesta
    copyListaClavesEncuesta = [...listaClavesEncuesta,
                                modalData.clave.toString()]

    // Checamos si la clave existe en el objeto de la encuesta
    if (copyMateriasEncuesta[modalData.clave] == null){
      copyMateriasEncuesta[modalData.clave] = {};
    }

    // Actualizamos la copia del objeto con los nuevos valores
    copyMateriasEncuesta[modalData.clave].modalidad = modalData.modalidad;
    copyMateriasEncuesta[modalData.clave].horario = modalData.horario;

    // Actualizamos los valores de cada variable
    setListaClavesEncuesta(copyListaClavesEncuesta);
    setMateriasEncuesta(copyMateriasEncuesta);

    // Cerramo el modal
    setShowModal(false);
  }

  // Función para cambiar el estilo de los botones del modal dependiendo si
  // están dentro de las opciones elegidas anteriormente por el usuario. Se
  // basa en tomar una propiedad (modalidad o horario) y también considera el
  // valor de esa proiedad
  const handleClassNameButtonModal = (propiedad, valor) => {
    // Si la opción en esa propiedad ha sido elegida activamos el botón
    if (modalData[propiedad] === valor){
      return "btn btn-active btn-accent";
    // Desactivamos el botón si no está elegida esa opción
    } else {
      return "btn btn-active btn-ghost";
    }
  }

  // Dentro del modal, si no se han elegido las dos propiedades que se piden no
  // se deja pulsar el botón de guardar opciones elegidas.
  const handleBtnAceptar = () => {
    if (modalData["modalidad"] == null
         || modalData["horario"] == null){
      return true;
    } else {
      return false;
    }
  }

  // Función que permite cambiar dentro del modal los valores de cada propiedad
  // o campo relacionado con la encuesta
  const changePropModal = (propiedad, valor) => {
    let copyObjectModalData = {...modalData};

    copyObjectModalData[propiedad] = valor;
    setModalData(copyObjectModalData);
  }

  // useEffect(() => {
  //   console.log(modalData);
  // }, [modalData]);

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
              {materiasEncuesta[materia.clave] ? (
              <div className="text-xs break-word text-base-content">
                Modalidad: {materiasEncuesta[materia.clave].modalidad}
                <br/>
                Horario: {materiasEncuesta[materia.clave].horario}
              </div>) : null}

            </td>

            {/* Botón Opciones */}
            <th>
              <div className='flex flex-row-reverse'>
                <button className="btn btn-primary
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

      {/* Template del modal de Opciones */}
      {showModal ? (<Modal>
        {/* div que cubre toda la pantalla del modal */}
        <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
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

          {/* Primera propiedad: modalidad */}
          <p className="text-sm pb-2">¿En qué modalidad te gustaría que se abriera esta UEA?</p>

          {/* Grupo de botones relacionados con la modalidad del curso */}
          <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
            <button className={handleClassNameButtonModal("modalidad", "Presencial")}
                      onClick={() => {
                        changePropModal("modalidad", "Presencial")}}>
                  Presencial</button>
            <button className={handleClassNameButtonModal("modalidad", "Virtual")}
                      onClick={() => {
                        changePropModal("modalidad", "Virtual")}}>
                  Virtual</button>
          </div>
          <br/>

          {/* Segunda propiedad: horario */}
          <p className="text-sm pb-2">¿En qué horario te gustaría llevar esta UEA?</p>

          {/* Grupo de botones relacionados con el horario del curso */}
          <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
            <button className={handleClassNameButtonModal("horario", "Mañana")}
                      onClick={() => {
                        changePropModal("horario", "Mañana")}}>
              Mañana</button>
            <button className={handleClassNameButtonModal("horario", "Tarde")}
                      onClick={() => {
                        changePropModal("horario", "Tarde")}}>
              Tarde</button>
            <button className={handleClassNameButtonModal("horario", "Tarde-noche")}
                      onClick={() => {
                        changePropModal("horario", "Tarde-noche")}}>
                  Tarde-noche</button>
            <button className={handleClassNameButtonModal("horario", "Sin preferencia")}
                      onClick={() => {
                        changePropModal("horario", "Sin preferencia")}}>
                  Sin preferencia</button>
          </div>

          <div className="modal-action justify-between">
            {/* Alguna información de ayuda para el usuario */}
            <div>
            <p className="text-xs font-normal text-slate-500">Mañana: 8:00 a 12:00</p>
            <p className="text-xs font-normal text-slate-500">Tarde: 12:00 a 16:00</p>
            <p className="text-xs font-normal text-slate-500">Tarde-noche: 16:00 a 21:00</p>
            </div>
            {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
            <label className="btn btn-primary"
                      onClick={closeModal}
                      disabled={handleBtnAceptar()}>Guardar elección</label>
          </div>
        </div>
        </div>
      </Modal>) : null}

    </div>
    </React.Fragment>
  );
}

export default TablaMateriasEncuesta
