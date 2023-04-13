// TODO: separar los botones en más componentes
import React, {useState, useContext} from "react";

import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Btn from "../common/Button";
import { ModalContext } from "../../context/modalContext";

//Services
import { activarEnc } from "../../services/encuestas/activarEnc.js";

function ModalActEnc() {
  const {modalData, showModal, setModalData, setShowModal, handleBtnAceptar, renderContainerOpciones} = useContext(ModalContext);
  console.log("modalData", modalData);
  const fetch = () => {
    activarEnc(modalData).then(res => {
      alert(res.message)
    });      
    setShowModal({...showModal, agregar: false}); // Oculta el modal
  }

  return (
    <React.Fragment>
    {showModal.agregar ?
    <Modal>
      {/* Div que cubre toda la pantalla del modal */}
      <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
      {/* Div que contiene la ventana del modal */}
      <div className="modal-box bg-base-300 mx-auto">
        {/* Botón cerrar/cancelar */}
        <div className="absolute right-2 top-2">
        <BtnCancelar functionOnClick={() =>{
              setShowModal({...showModal, agregar: false})
            }} />
        </div>

        <h2 className="font-bold text-lg">
          ACTIVAR ENCUESTA</h2>
        <p className="text-sm font-normal text-slate-500">
          (No podra modificar estos datos luego de activada la encuesta)</p>
        <br/>
        
        {renderContainerOpciones([
          "Ingrese el periodo de la encuesta", 
          "Ingrese el numero maximo de materias"
        ])}

        <div className="modal-action justify-between">
          {/* Alguna información de ayuda para el usuario */}
          <div className="text-xs font-normal text-slate-500">
            <p>Valide correctamente los campos</p>
            <p> antes activar la encuesta </p>
          </div>

          {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
          <Btn onClick={fetch} disabled={handleBtnAceptar()} text={"Activar"} />
        </div>
      </div>
      </div>
    </Modal>
    : null}
    </React.Fragment>      
  )
}

export default ModalActEnc
