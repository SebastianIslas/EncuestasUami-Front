// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../Modal";


function ModalConfirmacion({
  modalData,
  setShowModal,
  licenciaturas,
  setLicenciaturas
}) {
  
  const [licName] = useState(modalData.nombre)
  const [licCalve] = useState(modalData.clave)


  // Función a ejecutar al presionar el botón dentro del modal, se encargar de
  // guardar los datos en el objeto licenciaturasEncuesta y cierra el modal
  const closeModal = (e) => {
    //Verficamos que el boton con el que se llama no es el de "Cerrar"
    if (e.target.className !== "btn btn-error"){
       let newLicenciaturas = licenciaturas.filter((lic) => {
            if (lic.clave !== licCalve){
                return lic
            }else{
                return null
            }
       })

       console.log(newLicenciaturas)
       /* Peticion al API */
       
       setLicenciaturas(newLicenciaturas)
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
            ¿Desea eliminar la <strong>{licName}</strong> con clave <strong>{licCalve}</strong>?
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