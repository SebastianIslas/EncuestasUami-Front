// TODO: separar los botones en más componentes
import React from "react";

import Modal from "../Modal";
import BtnCancelar from "./BtnCancelar";
import ContainerOpciones from "./ContainerOpciones";

function ModalOpciones({
  modalData,
  setModalData,
  showModal,
  setShowModal,
  licenciaturasEncuesta,
  setLicenciaturasEncuesta,
  listaClavesEncuesta,
  setListaClavesEncuesta
}) {
  
  // Función a ejecutar al presionar el botón dentro del modal, se encargar de
  // guardar los datos en el objeto licenciaturasEncuesta y cierra el modal
  const closeModal = () => {
    // Copiamos el objeto de licenciaturasEncuesta
    let copyLicenciaturasEncuesta = {...licenciaturasEncuesta};

    // Copía de la lista de claves de licenciaturas elegidas para ser usadas en los
    // checkbox
    let copyListaClavesEncuesta;

    if (modalData["clave"] != null || modalData["nombre"] != null){
      // Agregamos la clave dentro del modal a la lista de claves de
      // licenciaturasEncuesta
      copyListaClavesEncuesta = [...listaClavesEncuesta,
                                  modalData.clave.toString()]

      // Checamos si la clave existe en el objeto de la encuesta
      if (copyLicenciaturasEncuesta[modalData.clave] == null){
        copyLicenciaturasEncuesta[modalData.clave] = {};
      }
      // POSIBLEMENTE LO BORREMOS
      // Actualizamos la copia del objeto con los nuevos valores
      console.log(modalData)
      copyLicenciaturasEncuesta[modalData.clave].nombre = modalData.nombre;
      copyLicenciaturasEncuesta[modalData.clave].clave = modalData.clave;

      // Actualizamos los valores de cada variable
      setListaClavesEncuesta(copyListaClavesEncuesta);
      setLicenciaturasEncuesta(copyLicenciaturasEncuesta);
    }

    // Cerramos el modal
    setShowModal(false);
  }

  // Función para cambiar el estilo de los botones del modal dependiendo si
  // están dentro de las opciones elegidas anteriormente por el usuario. Se
  // basa en tomar una propiedad (modalidad o horario) y también considera el
  // valor de esa proiedad

  const handleClassBtnModal = (propiedad, valor) => {
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
    if (modalData["clave"] == null || modalData["nombre"] == null){
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
  return (
    <Modal>
      {/* Div que cubre toda la pantalla del modal */}
      <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
      {/* Div que contiene la ventana del modal */}
      <div className="modal-box bg-base-300 mx-auto">
        {/* Botón cerrar/cancelar */}
        <div className="absolute right-2 top-2">
          <BtnCancelar functionOnClick={closeModal} />
        </div>

        {/* El título del modal es el nombre de la licenciatura */}
        <h2 className="font-bold text-lg">
          {modalData.nombre}</h2>
        {/* También mostramos la clave de la licenciatura */}
        <p className="text-sm font-normal text-slate-500">
          ({modalData.clave})</p>
        <br/>


        {/* Primera propiedad: modalidad  --> nombre  */}
        <ContainerOpciones 
            text={"Ingrese el nombre correcto de la Licenciatura"}
            prop={"nombre"}
            inputValue={modalData.nombre}
            handleClassBtnModal={handleClassBtnModal}
            changePropModal={changePropModal}
            />

        {/* Segunda propiedad: horario --> id */}
        <ContainerOpciones 
            text={"Ingrese el ID correcto de la Licenciatura"}
            prop={"clave"}
            inputValue={modalData.clave}
            handleClassBtnModal={handleClassBtnModal}
            changePropModal={changePropModal}
            />

        <div className="modal-action justify-between">
          {/* Alguna información de ayuda para el usuario */}
          <div className="text-xs font-normal text-slate-500">
            <p>Va a cambiar el nombre de la UEA</p>
            <p>Debe seleccionar el botón editar </p>
          </div>

          {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
          <label className="btn btn-primary"
                    onClick={closeModal}
                    disabled={handleBtnAceptar()}>Editar nombre</label>
        </div>
      </div>
      </div>
    </Modal>
  )
}

export default ModalOpciones
