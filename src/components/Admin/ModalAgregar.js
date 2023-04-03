// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Btn from "../common/Button";
import ContainerOpciones from "../common/modal/ContainerOpciones";
import { changePropModal, handleBtnAceptar } from "../common/modal/modalEvents";
//services
import { crearLicenciatura } from "../../services/licenciaturas/crearLicenciatura";

function ModalAgregar({
  setShowModal,
  licenciaturas,
  setLicenciaturas
}) {
  
  const [modalData,setModalData] = useState({
    clave: "",
    nombre: ""
  })


  const fetch = () => {
    crearLicenciatura(modalData).then(res => {
      if (res.status == 200) {
        let newLicenciaturas=[...licenciaturas]
        newLicenciaturas.push(modalData)
        setLicenciaturas(newLicenciaturas)   
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

       
        {/* Segunda propiedad: horario --> id */}
        <ContainerOpciones 
            text={"Ingrese la clave de la nueva licenciatura"}
            prop={"clave"}
            inputValue={modalData.clave}
            changePropModal={changePropModal}
            modalData={modalData}
            setModalData={setModalData}
            />

        {/* Primera propiedad: modalidad  --> nombre  */}
        <ContainerOpciones 
            text={"Ingrese el nombre de la nueva licenciatura"}
            prop={"nombre"}
            inputValue={modalData.nombre}
            changePropModal={changePropModal}
            modalData={modalData}
            setModalData={setModalData}
            />

        <div className="modal-action justify-between">
          {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
          <Btn onClick={fetch} disabled={handleBtnAceptar(modalData)} text={"Agregar"} />
        </div>
      </div>
      </div>
    </Modal>
  )
}

export default ModalAgregar
