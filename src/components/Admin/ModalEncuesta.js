// TODO: separar los botones en más componentes
import React, {useState, useContext, useEffect} from "react";

import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Btn from "../common/Button";
import { ModalContext } from "../../context/modalContext";

//Services
import { activarEnc } from "../../services/encuestas/activarEnc.js";
import { desactivarEnc } from "../../services/encuestas/desactivarEnc.js";
import { editarEnc } from "../../services/encuestas/editarEnc.js";

import { consultarEncuestaActiva } from "../../services/encuestas/consultarEncuestaActiva.js";


function ModalEncuesta() {
  const {modalData, showModal, setModalData, setShowModal, handleBtnAceptar, renderContainerOpciones} = useContext(ModalContext);
  console.log("modalData", modalData);
  const [encuesta, setEncuesta] = useState(null);
  const [checkboxCheckedEditar, setCheckboxCheckedEditar] = useState(false);
  const [checkboxCheckedDesactivar, setCheckboxCheckedDesactivar] = useState(false);

  const fetchActivar = () => {
    activarEnc(modalData).then(res => {
      alert(res.message)
    });      
    setShowModal({...showModal, opciones: false}); // Oculta el modal
  }
  const fetchEditar = () => {
    editarEnc(modalData, encuesta.periodo).then(res => {
      alert(res.message)
    });      
    setShowModal({...showModal, opciones: false}); // Oculta el modal
  }
  const fetchDesactivar = () => {
    desactivarEnc(modalData).then(res => {
      alert(res.message)
    });      
    setShowModal({...showModal, opciones: false}); // Oculta el modal
  }


  useEffect(() => {
    consultarEncuestaActiva().then(res => {
      setEncuesta(res);
      if(res.activo){
        setModalData({periodo: res.periodo, maxMaterias: res.maxMaterias});
      }
    });
  }, []);
  

  return (
    <React.Fragment>
    {showModal.opciones ?
    <Modal>
      {/* Div que cubre toda la pantalla del modal */}
      <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
        {/* Div que contiene la ventana del modal */}
        <div className="modal-box bg-base-300 mx-auto">
          {/* Botón cerrar/cancelar */}
          <div className="absolute right-2 top-2">
          <BtnCancelar functionOnClick={() =>{
                setShowModal({...showModal, opciones: false})
              }} />
          </div>
          {encuesta.activo ? (
            <div>
              <h2 className="font-bold text-lg">ENCUESTA ACTIVA</h2>
              <br/>
              {renderContainerOpciones([
                "Periodo de la encuesta activa:", 
                "Numero maximo de materias de la encuesta activa:"
              ])}
              <div className="modal-action justify-between flex-col-reverse lg:flex-row gap-4">
                <div className="grid grid-cols-8">
                  <input type="checkbox" className="w-[18px] h-[18px]" onChange={(e) => setCheckboxCheckedEditar(e.target.checked)} />
                  <p className="text-sm font-normal text-slate-500 col-span-7">
                  (Si edita la encuesta perdera todas las encuestas resueltas asociadas a esta encuesta)</p>
                </div>
                <Btn onClick={fetchEditar} disabled={!checkboxCheckedEditar || handleBtnAceptar()} text={"Editar"} />
              </div>
              <div className="modal-action justify-between flex-col-reverse lg:flex-row gap-4">
                <div className="grid grid-cols-8">
                  <input type="checkbox" className="w-[18px] h-[18px]" onChange={(e) => setCheckboxCheckedDesactivar(e.target.checked)} />
                  <p className="text-sm font-normal text-slate-500 col-span-7">
                  (Si desactiva la encuesta se cerrara la encuesta)</p>
                </div>
                <Btn onClick={fetchDesactivar} disabled={!checkboxCheckedDesactivar || handleBtnAceptar()} text={"Desactivar"} />
              </div>
                                
            </div>
            
          ) : (
            <div>
              <h2 className="font-bold text-lg">ACTIVAR ENCUESTA</h2>
              <p className="text-sm font-normal text-slate-500">
                (No podra modificar estos datos luego de activada la encuesta)</p>
              <br/>
              
              {renderContainerOpciones([
                "Ingrese el periodo de la encuesta", 
                "Ingrese el numero maximo de materias"
              ])}
      
              <div className="modal-action justify-between">
                {/* Alguna información de ayuda para el usuario */}
                <div className="text-xs font-normal text-slate-500">
                  <p>Valide correctamente los campos</p>
                  <p> antes activar la encuesta </p>
                </div>
      
                {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
                <Btn onClick={fetchActivar} disabled={handleBtnAceptar()} text={"Activar"} />
              </div>      
            </div>
          )} 


        </div>
      </div>
    </Modal>
    : null}
    </React.Fragment>      
  )
}

export default ModalEncuesta
