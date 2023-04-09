// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Btn from "../common/Button";
import ContainerOpciones from "../common/modal/ContainerOpciones";
import {handleBtnAceptar, changePropModal} from "../common/modal/modalEvents";

//Services
import { activarEnc } from "../../services/encuestas/activarEnc.js";

function ModalActEnc({
  setShowModal,
  licenciaturas,
  setLicenciaturas
}) {
  const [modalData,setModalData] = useState({
    periodo: "",
    maxMaterias: 4
  })

  const [licName] = useState(modalData.nombre)
  const [licClave] = useState(modalData.clave)


  const fetch = () => {
    activarEnc(modalData).then(res => {
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

        <h2 className="font-bold text-lg">
          ACTIVAR ENCUESTA</h2>
        <p className="text-sm font-normal text-slate-500">
          (No podra modificar estos datos luego de activada la encuesta)</p>
        <br/>


        {/* Primera propiedad: modalidad  --> nombre  */}
        <ContainerOpciones 
            text={"Ingrese el periodo de la encuesta"}
            prop={"periodo"}
            inputValue={modalData.periodo}
            changePropModal={changePropModal}
            modalData={modalData}
            setModalData={setModalData}
            />

        {/* Segunda propiedad: horario --> id */}
        <ContainerOpciones 
            text={"Ingrese el numero maximo de materias"}
            prop={"maxMaterias"}
            inputValue={modalData.maxMaterias}
            changePropModal={changePropModal}
            modalData={modalData}
            setModalData={setModalData}
            />

        <div className="modal-action justify-between">
          {/* Alguna información de ayuda para el usuario */}
          <div className="text-xs font-normal text-slate-500">
            <p>Valide correctamente los campos</p>
            <p> antes activar la encuesta </p>
          </div>

          {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
          <Btn onClick={fetch} disabled={handleBtnAceptar(modalData)} text={"Activar"} />
        </div>
      </div>
      </div>
    </Modal>
  )
}

export default ModalActEnc
