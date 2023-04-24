import React from "react";

import Modal from "../../components/common/modal/Modal";
import TitleRowTablaMaterias from "../common/table/TitleRowTablaMaterias";

//Services
import { enviarEncRes } from "../../services/encuestas/enviarEncRes";


function ModalConfirmacion({periodoEnc, user, isEncRes, materiasEncuesta, showModalConfirmacion, setShowModalConfirmacion}) {
  console.log("materiasEncuesta", materiasEncuesta);
  const fetchEnviarEnc = () =>{
    let encRes = {
      matricula: user.matricula,
      encuesta: periodoEnc,
      cursosSeleccionados: Object.entries(materiasEncuesta).map(
        ([claveUEA, {modalidad, horario, profesor}]) => {
          return {
            claveUEA: claveUEA,
            modalidad: modalidad,
            turno: horario,
            profesor: profesor
          }
        })
    }
    console.log("ENC TO SEND", encRes);
    enviarEncRes(encRes).then((res) =>{
      if(res.status == 200){
        isEncRes(periodoEnc);
        alert("Encuesta enviada con exito" );
      } else{
        alert("Error al enviar la encuesta");        
      }
      setShowModalConfirmacion(false);
    });
  }

  return (
    <React.Fragment>
      {showModalConfirmacion ?
      <Modal>
        {/* Div que cubre toda la pantalla del modal */}
        <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
          {/* Div que contiene la ventana del modal */}
          <div className="modal-box bg-base-300 mx-auto">

            <h1 className="text-2xl font-bold">Cursos seleccionados:</h1>
            <div id="tabla-materias" className="overflow-x-auto rounded-lg">

              <table className="table table-compact md:table-normal w-full">
                <thead>
                  <TitleRowTablaMaterias titles={["Clave", "Nombre", "Horario", "Modalidad", "Profesor"]} />
                </thead>
                <tbody>
                  {/* Renglón */}
                  {Object.entries(materiasEncuesta).map(curso =>{
                    return (
                      <tr className="hover" key={curso[0]}>
                        {/* Campo de la clave de la materia */}
                        <td className="text-md opacity-80">{curso[0]}</td>
                        <td className="text-md opacity-80">{curso[1].nombre}</td>
                        <td className="text-md opacity-80">{curso[1].horario}</td>
                        <td className="text-md opacity-80">{curso[1].modalidad}</td>
                        <td className="text-md opacity-80">{curso[1].profesor}</td>
                      </tr>

                    );
                  })}
                </tbody>
              </table>

            </div>
    

            <h3 className="text-lg font-bold">
                ¿Desea enviar la encuesta?
            </h3>
            <div className="modal-action justify-between">
              <label className="btn btn-error" onClick={() =>{
                setShowModalConfirmacion(false)
              }}>NO</label>
              <label className="btn btn-success" onClick={fetchEnviarEnc}>SÍ</label>
            </div>
          </div>
        </div>
      </Modal>
      : null}
    </React.Fragment>
  )
}

export default ModalConfirmacion