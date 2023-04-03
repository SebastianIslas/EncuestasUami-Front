// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Btn from "../common/Button";
import ContainerOpciones from "../common/modal/ContainerOpciones";
import { handleBtnAceptar, changePropModal } from "../common/modal/modalEvents";

//services
import { crearCurso } from "../../services/cursos/crearCurso";


function ModalAgregar({
  setShowModal,
  cursos,
  setCursos
}) {
  
  const [modalData,setModalData] = useState({
    clave: "",
    nombre: "",
    tipo: ""
  })


  const fetch = () => {
    crearCurso(modalData).then(res => {
      if (res.status == 200) {
        let newCursos=[...cursos]
        newCursos.push(modalData)    
        setCursos(newCursos)
      }
      return res.json();
    }).then(res => {  //Msg error o exito
      alert(res.message)
    });
    console.log("AGREGAR CURSO")
    // Cerramos el modal
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
            text={"Ingrese la clave del nuevo curso"}
            prop={"clave"}
            inputValue={modalData.clave}
            changePropModal={changePropModal}
            modalData={modalData}
            setModalData={setModalData}
            />

        {/* Primera propiedad: modalidad  --> nombre  */}
        <ContainerOpciones 
            text={"Ingrese el nombre del nuevo curso"}
            prop={"nombre"}
            inputValue={modalData.nombre}
            changePropModal={changePropModal}
            modalData={modalData}
            setModalData={setModalData}
            />

        <ContainerOpciones 
            text={"Ingrese el tipo del curso: (Obligatoria, Optativa)"}
            prop={"tipo"}
            inputValue={modalData.tipo}
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
