// TODO: separar los botones en más componentes
import React, { useEffect, useContext } from "react";

import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Btn from "../common/Button";
import ContainerOpciones from "./ContainerOpciones";
import { ModalContext } from "../../context/modalContext";

//services
import {getProfByCurso} from "../../services/encuestas/getProfByCurso";


function ModalOpciones({
  materiasEncuesta, setMateriasEncuesta,
  listaClavesEncuesta, setListaClavesEncuesta
}) {
  const {modalData, setModalData, showModal, setShowModal, handleBtnAceptar, handleClassBtnModal, changePropModal } = useContext(ModalContext);
  
  
  useEffect(() => {
    getProfByCurso(modalData.clave).then((prof) => {
      console.log("Prof", prof);
    })

  }, [])
  useEffect(() => {
    console.log("modalData", modalData);
  }, [modalData])

  //Guarda el estado del modal, el fetch se hace de otro boton
  const guardarModal = () => {
    // Copia de materiasEncuesta
    let copyMateriasEncuesta = {...materiasEncuesta};
    // Copía de la lista de claves de materias elegidas para ser usadas en los checkbox
    let copyListaClavesEncuesta;

    if (modalData["modalidad"] != null
         || modalData["horario"] != null){
      // Agregar clave dentro del modal a la lista de claves de materiasEncuesta
      copyListaClavesEncuesta = [...listaClavesEncuesta, modalData.clave.toString()]

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
    }
    // Cerramo el modal
    setShowModal({...showModal, opciones: false})
  }

  return (
    <React.Fragment>
    {showModal.opciones ? 
    <Modal>
      {/* Div que cubre toda la pantalla del modal */}
      <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
        {/* Div que contiene la ventana del modal */}
        <div className="modal-box bg-base-300 mx-auto">
          <div className="absolute right-2 top-2">
            <BtnCancelar functionOnClick={() =>{
                setShowModal({...showModal, opciones: false})
              }} />
          </div>

          {/* El título del modal es el nombre de la materia */}
          <h2 className="font-bold text-lg">
            {modalData.nombre}</h2>
          {/* También mostramos la clave de la materia */}
          <p className="text-sm font-normal text-slate-500">
            ({modalData.clave})</p>
          <br/>


          {/* Primera propiedad: modalidad */}
          <ContainerOpciones 
              text={"¿En qué modalidad te gustaría que se abriera esta UEA?"}
              prop={"modalidad"}
              opciones={["Presencial", "Virtual", "Mixta"]}
              handleClassBtnModal={handleClassBtnModal}
              changePropModal={changePropModal}
              />

          {/* Segunda propiedad: horario */}
          <ContainerOpciones 
              text={"¿En qué horario te gustaría llevar esta UEA?"}
              prop={"horario"}
              opciones={["Mañana", "Tarde", "Noche"]}
              handleClassBtnModal={handleClassBtnModal}
              changePropModal={changePropModal}
              />

          <div className="modal-action justify-between">
            {/* Alguna información de ayuda para el usuario */}
            <div className="text-xs font-normal text-slate-500">
              <p>Mañana: 8:00 a 12:00</p>
              <p>Tarde: 12:00 a 16:00</p>
              <p>Noche: 16:00 a 21:00</p>
            </div>
            {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
              <Btn onClick={guardarModal} disabled={handleBtnAceptar()} text={"Guardar"} />
          </div>
        </div>
      </div>
    </Modal>
    : null}
    </React.Fragment>
  )
}

export default ModalOpciones
