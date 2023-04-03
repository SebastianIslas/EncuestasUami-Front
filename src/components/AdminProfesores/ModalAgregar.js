// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../common/modal/Modal";
import Btn from "../common/Button";
import BtnCancelar from "../common/BtnCancelar";
import ContainerOpciones from "../common/modal/ContainerOpciones";
import {handleBtnAceptar, changePropModal} from "../common/modal/modalEvents";

//services
import { crearProfesor } from "../../services/profesores/crearProfesor";


function ModalAgregar({
  setShowModal,
  profesores,
  setProfesores
}) {
  
  const [modalData,setModalData] = useState({
    claveEmpleado: "",
    nombre: ""
  })


  const fetch = () => {
    crearProfesor(modalData).then(res => {
      if (res.status == 200) {
        let newProfesores=[...profesores]
        newProfesores.push(modalData)
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
        {/* Botón cerrar/cancelar */}
        <div className="absolute right-2 top-2">
          <BtnCancelar functionOnClick={() => setShowModal(false)} />
        </div>

       
        {/* Segunda propiedad: horario --> id */}
        <ContainerOpciones 
            text={"Ingrese la clave del nuevo profesor"}
            prop={"claveEmpleado"}
            inputValue={modalData.claveEmpleado}
            changePropModal={changePropModal}
            modalData={modalData}
            setModalData={setModalData}
            />

        {/* Primera propiedad: modalidad  --> nombre  */}
        <ContainerOpciones 
            text={"Ingrese el nombre del nuevo profesor"}
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
