// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../Modal";
import BtnCancelar from "./BtnCancelar";
import ContainerOpciones from "./ContainerOpciones";

//Services
import { addUEA } from "../../services/addUEA.js";


function ModalAgregar({
  setShowModalAgregar,
  materias,
  setMaterias
}) {
  
  const [modalData,setModalData] = useState({
    clave: "",
    nombre: ""
  })


  const closeModal = (e) => {
    // Verficamos que el boton con el que se llama no es el de "Cerrar"
    if (e.target.className !== "btn btn-sm btn-circle"){
       let newMaterias=[...materias]
       newMaterias.push(modalData)
       setMaterias(newMaterias)
    }
    // Cerramos el modal
    setShowModalAgregar(false);
  }

  const handleClassBtnModal = (propiedad, valor) => {
    // Si la opción en esa propiedad ha sido elegida activamos el botón
    if (modalData[propiedad] === valor){
      return "btn btn-active btn-accent";
    // Desactivamos el botón si no está elegida esa opción
    } else {
      return "btn btn-active btn-ghost";
    }
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

  // Función que permite cambiar dentro del modal los valores de cada propiedad
  // o campo relacionado con la encuesta
  const changePropModal = (propiedad, valor) => {

    let copyObjectModalData = {...modalData};
    copyObjectModalData[propiedad] = valor;
    setModalData(copyObjectModalData);
    sendData = { "clave_carrera": 30, "nombre_UEA": modalData.nombre, "clave": modalData.clave}
    addUEA(sendData)
  }


  return (
    <Modal>
      {/* Div que cubre toda la pantalla del modal */}
      <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
      {/* Div que contiene la ventana del modal */}
      <div className="modal-box bg-base-300 mx-auto">
        {/* Botón cerrar/cancelar */}
        <div className="absolute right-2 top-2">
          <BtnCancelar functionOnClick={closeModal} />
        </div>

       
        {/* Segunda propiedad: horario --> id */}
        <ContainerOpciones 
            text={"Ingrese la clave de la nueva UEA"}
            prop={"clave"}
            inputValue={modalData.clave}
            handleClassBtnModal={handleClassBtnModal}
            changePropModal={changePropModal}
            />

        {/* Primera propiedad: modalidad  --> nombre  */}
        <ContainerOpciones 
            text={"Ingrese el nombre de la nueva UEA"}
            prop={"nombre"}
            inputValue={modalData.nombre}
            handleClassBtnModal={handleClassBtnModal}
            changePropModal={changePropModal}
            />

        <div className="modal-action text-right">
          {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
          <label className="btn btn-primary"
                    onClick={closeModal}
                    disabled={handleBtnAceptar()}>Agregar</label>
        </div>
      </div>
      </div>
    </Modal>
  )
}

export default ModalAgregar
