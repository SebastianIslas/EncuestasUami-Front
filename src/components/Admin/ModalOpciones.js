// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../common/modal/Modal";
import Btn from "../common/Button";
import BtnCancelar from "../common/BtnCancelar";
import ContainerOpciones from "../common/modal/ContainerOpciones";

//Services
import { editLicenciatura } from "../../services/licenciaturas/editLicenciatura";

function ModalOpciones({
  modalData,
  setModalData,
  showModal,
  setShowModal,
  licenciaturas,
  setLicenciaturas
}) {
  
  const [licName] = useState(modalData.nombre)
  const [licClave] = useState(modalData.clave)


  // Función a ejecutar al presionar el botón dentro del modal, se encargar de
  // guardar los datos en el objeto licenciaturasEncuesta y cierra el modal
  const closeModal = (e) => {
    //Verficamos que el boton con el que se llama no es el de "Cerrar"
    if (e.target.className !== "btn btn-sm btn-circle"){
       /* Peticion al API */
       

             /* Peticion al API */
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

        {/* El título del modal es el nombre de la licenciatura */}
        <h2 className="font-bold text-lg">
          {licName}</h2>
        {/* También mostramos la clave de la licenciatura */}
        <p className="text-sm font-normal text-slate-500">
          ({licClave})</p>
        <br/>


        {/* Primera propiedad: modalidad  --> nombre  */}
        <ContainerOpciones 
            text={"Ingrese el nombre correcto de la Licenciatura"}
            prop={"nombre"}
            inputValue={modalData.nombre}
            changePropModal={changePropModal}
            />

        {/* Segunda propiedad: horario --> id */}
        <ContainerOpciones 
            text={"Ingrese el ID correcto de la Licenciatura"}
            prop={"clave"}
            inputValue={modalData.clave}
            changePropModal={changePropModal}
            />

        <div className="modal-action justify-between">
          {/* Alguna información de ayuda para el usuario */}
          <div className="text-xs font-normal text-slate-500">
            <p>Va a cambiar el nombre de la UEA</p>
            <p>Debe seleccionar el botón Guardar </p>
          </div>

          {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
          <Btn onClick={closeModal} disabled={handleBtnAceptar()} text={"Guardar"} />
        </div>
      </div>
      </div>
    </Modal>
  )
}

export default ModalOpciones
