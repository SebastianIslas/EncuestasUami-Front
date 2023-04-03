// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Btn from "../common/Button";
import ContainerOpciones from "../common/modal/ContainerOpciones";

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


  const closeModal = (e) => {
    //Verficamos que el boton con el que se llama no es el de "Cerrar"
    if (e.target.className !== "btn btn-sm btn-circle"){
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
      console.log("AGREGAR LICENCIATURA");

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

       
        {/* Segunda propiedad: horario --> id */}
        <ContainerOpciones 
            text={"Ingrese la clave de la nueva licenciatura"}
            prop={"clave"}
            inputValue={modalData.clave}
            changePropModal={changePropModal}
            />

        {/* Primera propiedad: modalidad  --> nombre  */}
        <ContainerOpciones 
            text={"Ingrese el nombre de la nueva licenciatura"}
            prop={"nombre"}
            inputValue={modalData.nombre}
            changePropModal={changePropModal}
            />

        <div className="modal-action justify-between">
          {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
          <Btn onClick={closeModal} disabled={handleBtnAceptar()} text={"Agregar"} />
        </div>
      </div>
      </div>
    </Modal>
  )
}

export default ModalAgregar
