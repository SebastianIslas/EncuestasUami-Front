import React, {useContext} from "react";

import Modal from "../../components/common/modal/Modal";

//Services
import { enviarEncRes } from "../../services/encuestas/enviarEncRes";


function ModalConfirmacion({periodoEnc, user, isEncRes, materiasEncuesta, showModalConfirmacion, setShowModalConfirmacion}) {
  const fetchEnviarEnc = () =>{
    let encRes = {
      matricula: user.matricula,
      encuesta: periodoEnc,
      cursosSeleccionados: Object.entries(materiasEncuesta).map(
        ([claveUEA, {modalidad, horario}]) => {
          return {
            claveUEA: claveUEA,
            modalidad: modalidad,
            turno: horario
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