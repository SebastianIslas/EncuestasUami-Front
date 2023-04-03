// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../common/modal/Modal";
//Services
import { deleteCurso } from "../../services/cursos/deleteCurso";


function ModalConfirmacion({
  modalData,
  setShowModal,
  cursos,
  setCursos
}) {
  
  const [cursoName] = useState(modalData.nombre)
  const [cursoClave] = useState(modalData.clave)

  const fetch = () => {
    deleteCurso(cursoClave).then(res => {
      if (res.status == 200) {
        let newCursos = cursos.filter((curso) => {
            if (curso.clave !== cursoClave){
                return curso
            }else{
                return null
            }
        })
        setCursos(newCursos)
      }
      return res.json();
    }).then(res => {  //Msg error o exito
      alert(res.message)
    }); 
    // Cerramos el modal
    setShowModal(false);
  }

  return (
    <Modal>
      {/* Div que cubre toda la pantalla del modal */}
      <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
        {/* Div que contiene la ventana del modal */}
        <div className="modal-box bg-base-300 mx-auto">

          <h3 className="text-lg font-bold">
              ¿Desea eliminar la <strong>{cursoName}</strong> con clave <strong>{cursoClave}</strong>?
          </h3>
          <div className="modal-action justify-between">
            <label className="btn btn-error" onClick={() => setShowModal(false)}>NO</label>
            <label className="btn btn-success" onClick={fetch}>SÍ</label>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalConfirmacion