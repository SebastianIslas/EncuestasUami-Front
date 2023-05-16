// TODO: separar los botones en más componentes
import React, { useContext } from "react";

import Modal from "../../common/modal/Modal";
import BtnCancelar from "../../common/BtnCancelar";
import Btn from "../../common/Button";
import { ModalContext } from "../../../context/modalContext";
//Services
import { editProfesor } from "../../../services/profesores/editProfesor";

function ModalOpciones({profesores, setProfesores}) {
  const {modalData, cleanModalData, showModal, setShowModal, handleBtnAceptar, renderContainerOpciones} = useContext(ModalContext);
  const profesorName = modalData.nombre
  const profesorClave = modalData.claveEmpleado


  const fetch = () => {
    editProfesor(profesorClave, modalData).then(res => {
      if (res.status == 200) {
        let arr = [...profesores]
        let foundIndex = arr.findIndex(x => x.claveEmpleado === profesorClave);
        arr[foundIndex] = modalData;
        console.log(arr);
        setProfesores(arr)
      }
      return res.json();
    }).then(res => {  //Msg error o exito
      alert(res.message)
    });    
    setShowModal({...showModal, opciones: false}); // Oculta el modal
  }

  return (
    <React.Fragment>
      {showModal.opciones ? 
      <Modal>
        {/* Div que cubre toda la pantalla del modal */}
        <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
        {/* Div que contiene la ventana del modal */}
        <div className="modal-box bg-base-300 mx-auto">
          {/* Botón cerrar/cancelar */}
          <div className="absolute right-2 top-2">
          <BtnCancelar functionOnClick={() =>{
              setShowModal({...showModal, opciones: false})
              cleanModalData()
            }} />
          </div>

          {/* El título del modal es el nombre del Profesor */}
          <h2 className="font-bold text-lg">{profesorName}</h2>
          {/* También mostramos la clave del Profesor */}
          <p className="text-sm font-normal text-slate-500">({profesorClave})</p>
          <br/>

          {//Dejar mensajes en el mismo orden en que se define el modalData en initialModalData
          renderContainerOpciones([
            "Ingrese la clave del nuevo profesor", 
            "Ingrese el nombre del nuevo profesor"
          ])}

          <div className="modal-action justify-between">
            {/* Alguna información de ayuda para el usuario */}
            <div className="text-xs font-normal text-slate-500">
              <p>Seleccione el boton de guardar</p>
              <p>Para guardar los cambios </p>
            </div>

            {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
            <Btn onClick={fetch} disabled={handleBtnAceptar()} text={"Guardar"} />
          </div>
        </div>
        </div>
      </Modal>
      : null}
    </React.Fragment>
  )
}

export default ModalOpciones
