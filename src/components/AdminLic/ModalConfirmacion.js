// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../common/modal/Modal";

//Services
import { deleteCursoFromLic } from "../../services/licenciaturas/deleteCursoFromLic";


function ModalConfirmacion({
  modalData,
  setShowModal,
  cursos,
  setCursos,
  claveLic
}) {
  
  const [cursoName] = useState(modalData.nombre)
  const [cursoClave] = useState(modalData.clave)


  // Función a ejecutar al presionar el botón dentro del modal, se encargar de
  // guardar los datos en el objeto cursosEncuesta y cierra el modal
  const closeModal = (e) => {
    //Verficamos que el boton con el que se llama no es el de "Cerrar"
    if (e.target.className !== "btn btn-error"){      
      /* Peticion al API */
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
    }
    // Cerramos el modal
    setShowModal(false);
  }


  // Dentro del modal, si no se han elegido las dos propiedades que se piden no
  // se deja pulsar el botón de guardar opciones elegidas.
  const handleBtnAceptar = () => {
    if (modalData["clave"] === "" || modalData["nombre"] === ""){
      return true;
    } else {
      return false;
    }
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

        <label className="btn btn-error"
                    onClick={closeModal}
                    disabled={handleBtnAceptar()}>NO</label>

          <label className="btn btn-success"
                    onClick={closeModal}
                    disabled={handleBtnAceptar()}>SÍ</label>
        </div>
      </div>
      </div>
    </Modal>
  )
}

export default ModalConfirmacion