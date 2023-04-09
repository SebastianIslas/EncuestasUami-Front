// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Btn from "../common/Button";
import ContainerOpciones from "../common/modal/ContainerOpciones";
import { changePropModal, handleBtnAceptar } from "../common/modal/modalEvents";
//Services
import { editCurso } from "../../services/cursos/editCurso";

function ModalOpciones({
  modalData,
  setModalData,
  showModal,
  setShowModal,
  cursos,
  setCursos
}) {
  

  const [cursoName] = useState(modalData.nombre)
  const [cursoClave] = useState(modalData.clave)

  const fetch = () => {
    /* Peticion al API */
    editCurso(cursoClave, modalData).then(res => {
      if (res.status == 200) {
        let arr = [...cursos]
        let foundIndex = arr.findIndex(x => x.clave === cursoClave);
        arr[foundIndex] = modalData;
        setCursos(arr)
      }
      return res.json();
    }).then(res => {  //Msg error o exito
      alert(res.message)
    });      
    setShowModal(false);    
  }

  return (
    <Modal>
      {/* Div que cubre toda la pantalla del modal */}
      <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
      {/* Div que contiene la ventana del modal */}
      <div className="modal-box bg-base-300 mx-auto">
        {/* Botón cerrar/cancelar */}
        <div className="absolute right-2 top-2">
          <BtnCancelar functionOnClick={() => setShowModal(false)} />
        </div>

        {/* El título del modal es el nombre del curso */}
        <h2 className="font-bold text-lg">
          {cursoName}</h2>
        {/* También mostramos la clave del curso */}
        <p className="text-sm font-normal text-slate-500">
          ({cursoClave})</p>
        <br/>


        {/* Primera propiedad: modalidad  --> nombre  */}
        <ContainerOpciones 
            text={"Ingrese el nuevo nombre del curso"}
            prop={"nombre"}
            inputValue={modalData.nombre}
            changePropModal={changePropModal}
            modalData={modalData}
            setModalData={setModalData}
            />

        {/* Segunda propiedad: horario --> id */}
        <ContainerOpciones 
            text={"Ingrese la nueva clave del curso"}
            prop={"clave"}
            inputValue={modalData.clave}
            changePropModal={changePropModal}
            modalData={modalData}
            setModalData={setModalData}
            />

        <ContainerOpciones 
            text={"Ingrese el tipo de la UEA: (Obligatoria, Optativa)"}
            prop={"tipo"}
            inputValue={modalData.tipo}
            changePropModal={changePropModal}
            modalData={modalData}
            setModalData={setModalData}
            />
        <div className="modal-action justify-between">
          {/* Alguna información de ayuda para el usuario */}
          <div className="text-xs font-normal text-slate-500">
            <p>Seleccione el boton de guardar</p>
            <p>Para guardar los cambios </p>
          </div>

          {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
          <Btn onClick={fetch} disabled={handleBtnAceptar(modalData)} text={"Guardar"} />

        </div>
      </div>
      </div>
    </Modal>
  )
}

export default ModalOpciones
