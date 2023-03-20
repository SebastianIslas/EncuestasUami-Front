// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../Modal";
import BtnCancelar from "../BtnCancelar";
import ContainerOpciones from "../ContainerOpciones";

//Services
import { editCurso } from "../../services/cursos/editCurso";

function ModalOpciones({
  modalData,
  setModalData,
  showModal,
  setShowModal,
  cursos,
  setCursos
}) {
  

  const [cursoName] = useState(modalData.nombre)
  const [cursoClave] = useState(modalData.clave)
  console.log(modalData);

  // Función a ejecutar al presionar el botón dentro del modal, se encargar de
  // guardar los datos en el objeto cursoEncuesta y cierra el modal
  const closeModal = (e) => {
    //Verficamos que el boton con el que se llama no es el de "Cerrar"
    if (e.target.className !== "btn btn-sm btn-circle"){
       let arr = [...cursos]
       let foundIndex = arr.findIndex(x => x.clave === cursoClave);
       arr[foundIndex] = modalData;
       console.log(modalData);
       /* Peticion al API */
       
       editCurso(modalData).then(res => {
        alert(res.message);
        setCursos(arr)
      });
      
       
    }
    // Cerramos el modal
    setShowModal(false);
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

        {/* El título del modal es el nombre del curso */}
        <h2 className="font-bold text-lg">
          {cursoName}</h2>
        {/* También mostramos la clave del curso */}
        <p className="text-sm font-normal text-slate-500">
          ({cursoClave})</p>
        <br/>


        {/* Primera propiedad: modalidad  --> nombre  */}
        <ContainerOpciones 
            text={"Ingrese el nuevo nombre del curso"}
            prop={"nombre"}
            inputValue={modalData.nombre}
            handleClassBtnModal={handleClassBtnModal}
            changePropModal={changePropModal}
            />

        {/* Segunda propiedad: horario --> id */}
        <ContainerOpciones 
            text={"Ingrese la nueva clave del curso"}
            prop={"clave"}
            inputValue={modalData.clave}
            handleClassBtnModal={handleClassBtnModal}
            changePropModal={changePropModal}
            />

        <ContainerOpciones 
            text={"Ingrese el tipo de la UEA: (Obligatoria, Optativa)"}
            prop={"tipo"}
            inputValue={modalData.tipo}
            handleClassBtnModal={handleClassBtnModal}
            changePropModal={changePropModal}
            />
        <div className="modal-action justify-between">
          {/* Alguna información de ayuda para el usuario */}
          <div className="text-xs font-normal text-slate-500">
            <p>Seleccione el boton de guardar</p>
            <p>Para guardar los cambios </p>
          </div>

          {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
          <label className="btn btn-primary"
                    onClick={closeModal}
                    disabled={handleBtnAceptar()}>Guardar</label>
        </div>
      </div>
      </div>
    </Modal>
  )
}

export default ModalOpciones
