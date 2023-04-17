import React, { useContext, useState, useEffect } from "react";

import Modal from "../../common/modal/Modal";
import BtnCancelar from "../../common/BtnCancelar";
import Button from "../../common/Button";
import { ModalContext } from "../../../context/modalContext";
import TitleRowTablaMaterias from "../../common/table/TitleRowTablaMaterias";
import {faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Services
import { getProfesoresFromCurso } from "../../../services/cursos/getProfesoresFromCurso";
import { addProfToCurso } from "../../../services/cursos/addProfToCurso";
import { deleteProfesorFromCurso } from "../../../services/cursos/deleteProfesorCurso";


function ModalOpciones({allProfesores, setAllProfesores}) {
  const {modalData, cleanModalData, showModal, setShowModal, handleBtnAceptar} = useContext(ModalContext);
  const cursoNombre = modalData.nombre;
  const cursoClave = modalData.clave;
  const [profesores, setProfesores] = useState(null);
  //** Opc seleccionada de la lista de profesores */
  const [selectedValue, setSelectedValue] = useState(""); //CLAVE PROFE
  const [nameSelected, setNameSelected] = useState("");   //Nombre profe

  useEffect(() => {
    if(cursoNombre != ""){
      getProfesoresFromCurso(cursoClave).then(res => {
        res ? setProfesores(res.profesores): setProfesores(res);
      });
    }
  }, [cursoClave]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    const name = event.target.options[event.target.selectedIndex].getAttribute('name');
    setNameSelected(name);
  };
  const fetch = () => {
    if(selectedValue == ""){
      alert("No se ha seleccionado ningun profesor");
    }else{
      addProfToCurso(selectedValue, cursoClave).then(res => {
        if (res.status == 200) {
          setProfesores([...profesores, {
            claveEmpleado: selectedValue,
            nombre: nameSelected
          }]);
          return res.json();
        }
      }).then(res => {  //Msg error o exito
        alert(res.message)
      });
    }
  }

  const fetchDelete = (profesor) => {
    deleteProfesorFromCurso(cursoClave, profesor.claveEmpleado).then(res => {
      let newProfesores = profesores.filter((profe) => {
      if (profe.claveEmpleado !== profesor.claveEmpleado){
            return profe
        }else{
            return null
        }
      })
      setProfesores(newProfesores);
      alert(res.message);
    })
  }

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
                cleanModalData()
              }} />
          </div>

          {/* El título del modal es el nombre de la licenciatura */}
          <h2 className="font-bold text-lg">
            {cursoNombre}</h2>
          {/* También mostramos la clave de la licenciatura */}
          <p className="text-sm font-normal text-slate-500">
            ({cursoClave})</p>
          <br/>
          <h1 className="font-bold text-xl">Profesores:</h1>

          <table className="table table-compact md:table-normal w-full">
          <thead>
            <TitleRowTablaMaterias titles={["Clave", "Nombre", "Eliminar"]} />
          </thead>
          <tbody>
            {(profesores != null) && (profesores.length != 0) ? (
              profesores.map(profesor => (
                <tr key={profesor.claveEmpleado}>
                  <td>{profesor.claveEmpleado}</td>
                  <td>{profesor.nombre}</td>
                  <td>
                    <Button text={<FontAwesomeIcon icon={faTrashCan} />} 
                            onClick={()=>fetchDelete(profesor)} />
                  </td>
                </tr>
              ))
            ):(<tr className="text-md break-word font-bold">
                <td>Curso sin profesores</td>
              </tr>
            )}
          </tbody>
        </table>
        <hr className="py-2 "></hr>
        <h1 className="font-bold text-xl">Agregar profesor a la UEA:</h1>
        <div className="form-control">
          <label htmlFor="dropdown" className="text-xl pb-2">Selecciona el profesor a agaregar:</label>
          <select id="dropdown" value={selectedValue} onChange={handleChange} className="bg-base-300 text-white p-2 rounded-lg text-base">
            <option value="">PROFESOR</option>
            {allProfesores.map (profesor => 
              <option value={profesor.claveEmpleado} name={profesor.nombre} key={profesor.claveEmpleado}>{profesor.nombre}</option>
            )}
          </select>
        </div>

          <div className="modal-action justify-between">
            {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
            <Button onClick={fetch} text={"Agregar"} />
          </div>
        </div>
        </div>
      </Modal>
      : null}
    </React.Fragment>
  )
}

export default ModalOpciones