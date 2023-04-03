// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Btn from "../common/Button";

function ModalEditar({
  modalData,
  setShowModalEditar,
  materias,
  setMaterias
}) {

  const lastLicName = modalData.nombre;
  const lastLicClave = modalData.clave;
  
  const [licName, setLicName] = useState(modalData.nombre);
  const [licClave, setLicClave] = useState(modalData.clave);

  // Función a ejecutar al presionar el botón dentro del modal, se encargar de
  // guardar los datos en el objeto licenciaturasEncuesta y cierra el modal
  const closeModal = (e) => {
    let newArray = [];

    for (let i = 0; i < materias.length; i++){
      if (materias[i].clave === lastLicClave && materias[i].nombre === lastLicName){
        newArray.push({
          clave: licClave,
          nombre: licName,
          activa: materias[i].activa
        })
      } else {
        newArray.push(materias[i]);
      }
    }

    // Actualiza la lista de materias
    setMaterias(newArray);

    // Cerramos el modal
    setShowModalEditar(false);
  }


  // Dentro del modal, si no se han elegido las dos propiedades que se piden no
  // se deja pulsar el botón de guardar opciones elegidas.
  const handleBtnAceptar = () => {
    if (licClave === "" || licName === ""){
      return true;
    } else {
      return false;
    }
  }

  // Función que permite cambiar dentro del modal los valores de cada propiedad
  // o campo relacionado con la encuesta
  // const changePropModal = (propiedad, valor) => {
  //   let copyObjectModalData = {...modalData};

  //   copyObjectModalData[propiedad] = valor;
  //   setModalData(copyObjectModalData);
  // }

  return (
    <Modal>
      {/* Div que cubre toda la pantalla del modal */}
      <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
      {/* Div que contiene la ventana del modal */}
      <div className="modal-box bg-base-300 mx-auto">
        {/* Botón cerrar/cancelar */}
        <div className="absolute right-2 top-2">
          <BtnCancelar functionOnClick={() => {setShowModalEditar(false)}} />
        </div>

        <h2>Editar UEA</h2>
        {/* El título del modal es el nombre de la materia */}
        <h2 className="font-bold text-lg">
          {lastLicName}</h2>
        {/* También mostramos la clave de la materia */}
        <p className="text-sm font-normal text-slate-500">
          ({lastLicClave})</p>
        <br/>

        <p className="text-xl pb-2">
          Ingrese la nueva clave de la UEA</p>

          <div className="form-control">
                <input type="text" 
                    value={licClave} 
                    onChange={(e)=>{setLicClave(e.target.value)}} 
                    className="input input-bordered" />
            </div>    
        <br/>

        <p className="text-xl pb-2">
          Ingrese el nuevo nombre de la UEA</p>

          <div className="form-control">
                <input type="text" 
                    value={licName} 
                    onChange={(e)=>{setLicName(e.target.value)}} 
                    className="input input-bordered" />
            </div>    
        <br/>

        <div className="modal-action text-right">
          {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
          <Btn onClick={closeModal} disabled={handleBtnAceptar()} text={"Aceptar"} />
        </div>

      </div>
      </div>
    </Modal>
  )
}

export default ModalEditar
