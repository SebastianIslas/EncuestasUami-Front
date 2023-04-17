import React, {useContext} from "react";

import Modal from "../../common/modal/Modal";
import { ModalContext } from "../../../context/modalContext";

//Services
import { deleteCursoFromLic } from "../../../services/licenciaturas/deleteCursoFromLic";


function ModalConfirmacion({cursos, setCursos, claveLic}) {
  const {modalData, cleanModalData, showModal, setShowModal} = useContext(ModalContext);
  const cursoName =  modalData.nombre;
  const cursoClave = modalData.clave;


  const fetch = () => {
    console.log(modalData);
    deleteCursoFromLic(modalData, claveLic).then(res => {
      console.log(res);
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
    setShowModal(false);
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
              ¿Desea eliminar la <strong>{cursoName}</strong> con clave <strong>{cursoClave}</strong>?
          </h3>
          <div className="modal-action justify-between">
            <label label className="btn btn-error" onClick={() =>{
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