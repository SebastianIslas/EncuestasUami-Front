import React, {useContext} from "react";

import Modal from "../../common/modal/Modal";
import { ModalContext } from "../../../context/modalContext";


//Services
import { deleteProfesor } from "../../../services/profesores/deleteProfesor";


function ModalConfirmacion({profesores, setProfesores}) {
  const {modalData, cleanModalData, showModal, setShowModal} = useContext(ModalContext);
  const profesorName = modalData.nombre
  const profesorClave = modalData.claveEmpleado

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
    setShowModal({...showModal, confirmacion: false}); // Oculta el modal
  }

  return (
    <React.Fragment>
      {showModal.confirmacion ?
      <Modal>
        {/* Div que cubre toda la pantalla del modal */}
        <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
          {/* Div que contiene la ventana del modal */}
          <div className="modal-box bg-base-300 mx-auto">
            <h3 className="text-lg font-bold">
                ¿Desea eliminar el profesor <strong>{profesorName}</strong> con clave <strong>{profesorClave}</strong>?
            </h3>
            <div className="modal-action justify-between">
              <label className="btn btn-error" onClick={() =>{
                  setShowModal({...showModal, confirmacion: false})
                  cleanModalData()
                }}>NO</label>
              <label className="btn btn-success" onClick={fetch}>SÍ</label>
            </div>          
          </div>
        </div>
      </Modal>
      : null}
    </React.Fragment>
  )
}

export default ModalConfirmacion