import React, { useContext} from "react";
import Modal from "../../common/modal/Modal";
import BtnCancelar from "../../common/BtnCancelar";
import Button from '../../../components/common/Button';

import { ModalContext } from "../../../context/modalContext";

//services
import { crearCurso } from "../../../services/cursos/crearCurso";


function ModalAgregar({cursos,setCursos}) {
  const {modalData, showModal, setShowModal, handleBtnAceptar, renderContainerOpciones} = useContext(ModalContext);
  
  const fetch = () => {
    crearCurso(modalData).then(res => {
      if (res.status == 200) {
        let newCursos=[...cursos]
        newCursos.push(modalData)    
        setCursos(newCursos)
      }
      return res.json();
    }).then(res => {  //Msg error o exito
      alert(res.message)
    });
    setShowModal({...showModal, agregar: false}); // Cerramos el modal
  }

  return (
    <React.Fragment>
      <div className="fixed bottom-4 left-4">
        <Button text={"Agregar Curso"} onClick={() => setShowModal({...showModal, agregar: true})} />
      </div>
      {showModal.agregar ? 
      <Modal>
        {/* Div que cubre toda la pantalla del modal */}
        <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
          {/* Div que contiene la ventana del modal */}
          <div className="modal-box bg-base-300 mx-auto">
            {/* Botón cerrar/cancelar */}
            <div className="absolute right-2 top-2">
              <BtnCancelar functionOnClick={() => setShowModal({...showModal, agregar: false})} />
            </div>
            {//Dejar mensajes en el mismo orden en que se define el modalData en initialModalData
            renderContainerOpciones([
              "Ingrese la clave del nuevo curso", 
              "Ingrese el nombre del nuevo curso",
              "Ingrese el tipo del curso: (Obligatoria, Optativa)"
            ])}
            <div className="modal-action justify-between">
              {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
              <Button onClick={fetch} disabled={handleBtnAceptar()} text={"Agregar"} />
            </div>
          </div>
        </div>
      </Modal>
      : null}
    </React.Fragment>
  )
}
export default ModalAgregar