// TODO: separar los botones en más componentes
import React, { useEffect, useContext, useState } from "react";

import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Btn from "../common/Button";
import ContainerOpciones from "./ContainerOpciones";
import { ModalContext } from "../../context/modalContext";

//services
import {getProfByCurso} from "../../services/encuestas/getProfByCurso";


function ModalOpciones({
  materiasEncuesta, setMateriasEncuesta,
  listaClavesEncuesta, setListaClavesEncuesta
}) {
  const {modalData, cleanModalData, showModal, setShowModal, handleBtnAceptar, handleClassBtnModal, changePropModal } = useContext(ModalContext);

  //** Opc seleccionada de la lista de profes */
  const [selectedValue, setSelectedValue] = useState("");
  const [profesoresCurso, setProfesoresCurso] = useState([]);
  const [profesorNombre, setProfesorNombre] = useState("");

  useEffect(() => {
    setSelectedValue(modalData.profesor);
    getProfByCurso(modalData.clave).then((prof) => {
      setProfesoresCurso(prof.profesores);
    })
  }, [modalData.clave])

  useEffect(() => {
    console.log("modalData", modalData);
  }, [modalData])


  //Guarda el estado del modal, el fetch se hace de otro boton
  const guardarModal = () => {
    // Copia de materiasEncuesta
    let copyMateriasEncuesta = {...materiasEncuesta};
    // Copía de la lista de claves de materias elegidas para ser usadas en los checkbox
    let copyListaClavesEncuesta;

    // Agregar clave dentro del modal a la lista de claves de materiasEncuesta
    copyListaClavesEncuesta = [...listaClavesEncuesta, modalData.clave.toString()]

    // Checamos si la clave existe en el objeto de la encuesta
    if (copyMateriasEncuesta[modalData.clave] == null){
      copyMateriasEncuesta[modalData.clave] = {};
    }
    // Actualizamos la copia del objeto con los nuevos valores
    copyMateriasEncuesta[modalData.clave] = {
      nombre: modalData.nombre,
      modalidad: modalData.modalidad,
      horario: modalData.horario,
      profesor: modalData.profesor,
      profesorNombre: profesorNombre
    }

    // Actualizamos los valores de cada variable
    setListaClavesEncuesta(copyListaClavesEncuesta);
    setMateriasEncuesta(copyMateriasEncuesta);

    cleanModalData();
    // Cerramo el modal
    setShowModal({...showModal, opciones: false})
  }

  const handleChange = (event) => {
    let idProfSelect = event.target.value;
    setSelectedValue(idProfSelect);
    changePropModal("profesor", idProfSelect);
    if(idProfSelect == "false"){
      setProfesorNombre("");
    } else {
      setProfesorNombre(event.target.options[event.target.selectedIndex].text);
    }
  };
  
  return (
    <React.Fragment>
    {showModal.opciones ? 
    <Modal>
      {/* Div que cubre toda la pantalla del modal */}
      <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
        {/* Div que contiene la ventana del modal */}
        <div className="modal-box bg-base-300 mx-auto">
          <div className="absolute right-2 top-2">
            <BtnCancelar functionOnClick={() =>{
                setShowModal({...showModal, opciones: false})
              }} />
          </div>

          {/* El título del modal es el nombre de la materia */}
          <h2 className="font-bold text-lg">
            {modalData.nombre}</h2>
          {/* También mostramos la clave de la materia */}
          <p className="text-sm font-normal text-slate-500">
            ({modalData.clave})</p>
          <br/>

          <ContainerOpciones 
              text={"¿En qué modalidad te gustaría que se abriera esta UEA?"}
              prop={"modalidad"}
              opciones={["Presencial", "Virtual", "Mixta"]}
              handleClassBtnModal={handleClassBtnModal}
              changePropModal={changePropModal}
              />

          <ContainerOpciones 
              text={"¿En qué horario te gustaría llevar esta UEA?"}
              prop={"horario"}
              opciones={["Mañana", "Tarde", "Noche"]}
              handleClassBtnModal={handleClassBtnModal}
              changePropModal={changePropModal}
              />
          <div className="form-control">
            <label htmlFor="dropdown" className="text-xl pb-2">Selecciona el profesor:</label>
            <select id="dropdown" value={selectedValue} onChange={handleChange} className="bg-base-300 text-white p-2 rounded-lg text-base">
              <>
                <option value="" disabled>
                  Selecciona un profesor
                </option>
                {profesoresCurso && profesoresCurso.length !== 0 ? (
                  profesoresCurso.map((profesor) => {
                    return (
                      <option value={profesor.claveEmpleado} key={profesor.claveEmpleado}>
                        {profesor.nombre}
                      </option>
                    )
                  })
                ) : (
                  <option value="false" key="false">
                    Sin opciones disponibles
                  </option>
                )}
              </>
            </select>

          </div>


          <div className="modal-action justify-between">
            {/* Alguna información de ayuda para el usuario */}
            <div className="text-xs font-normal text-slate-500">
              <p>Mañana: 8:00 a 12:00</p>
              <p>Tarde: 12:00 a 16:00</p>
              <p>Noche: 16:00 a 21:00</p>
            </div>

            <Btn onClick={guardarModal} disabled={handleBtnAceptar()} text={"Guardar"} />
          </div>
        </div>
      </div>
    </Modal>
    : null}
    </React.Fragment>
  )
}

export default ModalOpciones
