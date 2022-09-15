// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../Modal";


function ModalConfirmacion({
  modalData,
  setShowModalConfirmacion,
  materias,
  setMaterias
}) {
  
  const [licName] = useState(modalData.nombre)
  const [licClave] = useState(modalData.clave)

  // Función a ejecutar al presionar el botón dentro del modal, se encargar de
  // guardar los datos en el objeto licenciaturasEncuesta y cierra el modal
  const closeModal = (e) => {
    let newArray = [];

    for (let i = 0; i < materias.length; i++){
      if (materias[i].clave === licClave && materias[i].nombre === licName){
        continue;
      } else {
        newArray.push(materias[i]);
      }
    }

    // Actualiza la lista de materias
    setMaterias(newArray);

    // Cerramos el modal
    setShowModalConfirmacion(false);
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
            ¿Desea eliminar la <strong>{licName}</strong> con clave <strong>{licClave}</strong>?
        </h3>
        <div className="modal-action justify-between">

        <label className="btn btn-error"
                    onClick={() => {setShowModalConfirmacion(false)}}
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
