import React, { useContext } from "react";

import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Btn from "../common/Button";
import { ModalContext } from "../../context/modalContext";

//Services
import { editLicenciatura } from "../../services/licenciaturas/editLicenciatura";

function ModalOpciones({licenciaturas, setLicenciaturas}) {
  const {modalData, cleanModalData, showModal, setShowModal, handleBtnAceptar, renderContainerOpciones} = useContext(ModalContext);
  const licName = modalData.nombre;
  const licClave = modalData.clave;

  const fetch = () => {
    editLicenciatura(licClave, modalData).then(res => {
      if (res.status == 200) {
        let arr = [...licenciaturas]
        let foundIndex = arr.findIndex(x => x.clave === licClave);
        arr[foundIndex] = modalData;   
        setLicenciaturas(arr)
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

          {/* El título del modal es el nombre de la licenciatura */}
          <h2 className="font-bold text-lg">{licName}</h2>
          {/* También mostramos la clave de la licenciatura */}
          <p className="text-sm font-normal text-slate-500">({licClave})</p>
          <br/>
          {//Dejar mensajes en el mismo orden en que se define el modalData en initialModalData
          renderContainerOpciones([
            "Ingrese la clave de la licenciatura", 
            "Ingrese el nombre de la licenciatura"
          ])}
          <div className="modal-action justify-between">
            {/* Alguna información de ayuda para el usuario */}
            <div className="text-xs font-normal text-slate-500">
              <p>Va a cambiar el nombre de la UEA</p>
              <p>Debe seleccionar el botón Guardar </p>
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
