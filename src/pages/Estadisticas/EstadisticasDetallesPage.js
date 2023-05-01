import React, { useEffect, useState } from "react";

import Button from '../../components/common/Button';
import HeaderEstadisticas from '../../components/Estadisticas/HeaderEstadisticas';
import TitleRowTablaMaterias from "../../components/common/table/TitleRowTablaMaterias";
import { Link, useLocation  } from "react-router-dom";
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from "react-router-dom";


// Services
import { getEncuestaRes } from "../../services/encuestas/getEncuestaRes";

function EstadisticasDetallesPage() {
  let user = Object();
  user.matricula = 2183041399;
  user.licenciatura = "Computación";
  user.claveLic = 30;
  const location = useLocation();

  const [encuestasRes, setEncuestasRes] = useState([]);
  const { periodo, claveLic, nombreLic } = useParams();

  console.log(periodo, claveLic)

  useEffect(() => {
    document.title = "Estadisticas UAMI";
    getEncuestaRes(periodo, claveLic).then((res) => {
      console.log("res", res);
      setEncuestasRes(res);
    })
  }, []);

  return (
    <React.Fragment>
      <div className="bg-base-200">
        <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">
            <HeaderEstadisticas user={user} />
            <h3>Estadisticas para la encuesta del periodo {periodo} de la {nombreLic}</h3>
            <table className="table table-compact md:table-normal w-full">
              <thead>
                <TitleRowTablaMaterias titles={["Clave", "Nombre", "# Votos", "Distribución de votos"]} />
              </thead>

              <tbody>
                {/* Renglón 
                {encuestasRes.map(encuesta => 
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
                      <div className='flex justify-end' id={"btnVer"+encuesta.periodo}>
                      <Link to={`/estadisticas/${encuesta.periodo}`}>
                        <Button text={<FontAwesomeIcon icon={faEye} />} />
                      </Link>
                      </div>
                    </th>
                  </tr>
                )}
                */}
              </tbody>

            </table>
        </div>
      </div>
    </React.Fragment>

  );
}

export default EstadisticasDetallesPage
