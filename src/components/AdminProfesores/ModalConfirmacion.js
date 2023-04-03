// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../common/modal/Modal";

//Services
import { deleteProfesor } from "../../services/profesores/deleteProfesor";


function ModalConfirmacion({
  modalData,
  setShowModal,
  profesores,
  setProfesores
}) {
  
  const [profesorName] = useState(modalData.nombre)
  const [profesorClave] = useState(modalData.claveEmpleado)

  const fetch = () => {      
    deleteProfesor(profesorClave).then(res => {
      if (res.status == 200) {
        let newProfesores = profesores.filter((profesor) => {
          if (profesor.claveEmpleado !== profesorClave){
              return profesor
          }else{
              return null
          }
        })
        setProfesores(newProfesores)
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
          <h3 className="text-lg font-bold">
              ¿Desea eliminar la <strong>{profesorName}</strong> con clave <strong>{profesorClave}</strong>?
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