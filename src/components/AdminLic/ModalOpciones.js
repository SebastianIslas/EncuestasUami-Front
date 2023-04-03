// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Btn from "../common/Button";
import ContainerOpciones from "../common/modal/ContainerOpciones";
import { changePropModal, handleBtnAceptar } from "../common/modal/modalEvents";
//Services
import { getProfesoresFromCurso } from "../../services/cursos/getProfesoresFromCurso";
//import { getProfesoresFromCurso } from "../../services/cursos/getProfesoresFromCurso";

function ModalOpciones({
  modalData,
  setModalData,
  showModal,
  setShowModal,
  licenciaturas,
  setLicenciaturas
}) {
  
  const [cursoNombre] = useState(modalData.nombre)
  const [cursoClave] = useState(modalData.clave)
  const [profesores, setProfesores] = useState([]);


  const fetch = () => {

    // Cerramos el modal
    setShowModal(false);
  }

/*

  getProfesoresFromCurso(cursoClave).then(res => {
    setProfesores(res.profesores)

    return res;
  });
*/
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

        {/* El título del modal es el nombre de la licenciatura */}
        <h2 className="font-bold text-lg">
          {cursoNombre}</h2>
        {/* También mostramos la clave de la licenciatura */}
        <p className="text-sm font-normal text-slate-500">
          ({cursoClave})</p>
        <br/>
        <h2 className="font-bold text-lg">
          Profesores</h2>

          
        {/* Primera propiedad: modalidad  --> nombre  */}
        <ContainerOpciones 
            text={"Ingrese el nombre correcto de la Licenciatura"}
            prop={"nombre"}
            inputValue={modalData.nombre}
            changePropModal={changePropModal}
            modalData={modalData}
            setModalData={setModalData}
            />

        {/* Segunda propiedad: horario --> id */}
        <ContainerOpciones 
            text={"Ingrese el ID correcto de la Licenciatura"}
            prop={"clave"}
            inputValue={modalData.clave}
            changePropModal={changePropModal}
            modalData={modalData}
            setModalData={setModalData}
            />

        <div className="modal-action justify-between">
          {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
          <Btn onClick={fetch} disabled={handleBtnAceptar(modalData)} text={"Guardar"} />
        </div>
      </div>
      </div>
    </Modal>
  )
}

export default ModalOpciones
