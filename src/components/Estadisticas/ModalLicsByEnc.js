import React, {useContext} from "react";
import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Button from "../common/Button";
import TitleRowTablaMaterias from "../../components/common/table/TitleRowTablaMaterias";
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";

function ModalLicsByEnc({periodo, licenciaturas, showModalLicsByEnc, setShowModalLicsByEnc}) {

  console.log(licenciaturas)
  return (
    <React.Fragment>
    {showModalLicsByEnc ?
      <Modal>
        {/* Div que cubre toda la pantalla del modal */}
        <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
          {/* Div que contiene la ventana del modal */}
          <div className="modal-box bg-base-300 mx-auto">
            <div className="absolute right-2 top-2">
              <BtnCancelar functionOnClick={() => {setShowModalLicsByEnc(false)}} />
            </div>
            <h3 className="text-2xl font-bold">
              VER ESTADISTICAS
            </h3> <br></br>
            <h3 className="text-lg font-bold">
              Se abrio la encuesta del periodo {periodo} para las siguientes licenciaturas:
            </h3>

            <table className="table table-compact md:table-normal w-full">
              <thead>
                <TitleRowTablaMaterias titles={["Clave", "Nombre", ""]} />
              </thead>

              <tbody>
                {/* Renglón */}
                {licenciaturas.map(licenciatura =>
                  <tr className="hover" key={licenciatura.clave}>
                    <td className="break-words">
                      <p className="text-md font-bold whitespace-pre-wrap">{licenciatura.clave}</p>
                    </td>
                    <td className="break-words">
                      <p className="text-md font-bold whitespace-pre-wrap">{licenciatura.nombre}</p>
                    </td>
                    <th>
                      <div className='flex justify-end'>
                        <Link to={`/estadisticas/${periodo}/${licenciatura.clave}/${licenciatura.nombre}`}>
                          <Button text={<FontAwesomeIcon icon={faEye} />} />
                        </Link>
                      </div>
                    </th>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </Modal>
      : null}
    </React.Fragment>
  )
}

export default ModalLicsByEnc