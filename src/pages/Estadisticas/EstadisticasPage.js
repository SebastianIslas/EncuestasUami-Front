import React, { useEffect, useState } from "react";

import Button from '../../components/common/Button';
import HeaderEstadisticas from '../../components/Estadisticas/HeaderEstadisticas';
import TitleRowTablaMaterias from "../../components/common/table/TitleRowTablaMaterias";
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalLicsByEnc from "../../components/Estadisticas/ModalLicsByEnc";


// Services
import { getEncuestas } from "../../services/encuestas/getEncuestas";

function EstadisticasPage() {
  let user = Object();
  user.matricula = 2183041399;
  user.licenciatura = "Computación";
  user.claveLic = 30;

  const [encuestas, setEncuestas] = useState([]);
  const [lics, setLics] = useState([]);
  const [periodo, setPeriodo] = useState("");
  const [showModalLicsByEnc, setShowModalLicsByEnc] = useState(false);

  useEffect(() => {
    document.title = "Estadisticas UAMI";
    getEncuestas().then((res) => {
      console.log(res)
      setEncuestas(res);
    })
  }, []);

  const toogleModal= (lics, periodo) => {
    setLics(lics);
    setPeriodo(periodo);
    setShowModalLicsByEnc(true);
  }

  return (
    <React.Fragment>
      <div className="bg-base-200">
        <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">
            <HeaderEstadisticas user={user}/>
            <table className="table table-compact md:table-normal w-full">
              <thead>
                <TitleRowTablaMaterias titles={["Activa", "Periodo", "# Enc. Resueltas", "Max. materias", ""]} />
              </thead>

              <tbody>
                {/* Renglón */}
                {encuestas.map(encuesta =>
                  <tr className="hover" key={encuesta.periodo}>
                    <td className='w-8'>{encuesta.activo ? "Si" : "No"}</td>
                    <td className="text-md opacity-80">{encuesta.periodo}</td>
                    <td className="break-words">
                      <p className="text-md font-bold whitespace-pre-wrap">{encuesta.encuestasResueltas.length}</p>
                    </td>
                    <td className="break-words">
                      <p className="text-md font-bold whitespace-pre-wrap">{encuesta.maxMaterias}</p>
                    </td>
                    <th>
                      <div className='flex justify-end'>
                        <Button text={<FontAwesomeIcon icon={faEye} />} onClick={()=>toogleModal(encuesta.licenciatura, encuesta.periodo)} />
                      </div>
                    </th>
                  </tr>
                )}
              </tbody>

            </table>
        </div>
      </div>
      {showModalLicsByEnc ? 
      <ModalLicsByEnc periodo={periodo} licenciaturas={lics} showModalLicsByEnc={showModalLicsByEnc} setShowModalLicsByEnc={setShowModalLicsByEnc}/>
      : null
      }
    </React.Fragment>

  );
}

export default EstadisticasPage
