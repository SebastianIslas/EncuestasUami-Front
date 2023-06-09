import React, { useEffect, useState } from "react";

import Button from '../../components/common/Button';
import HeaderEstadisticas from '../../components/Estadisticas/HeaderEstadisticas';
import TitleRowTablaMaterias from "../../components/common/table/TitleRowTablaMaterias";
import { faBarChart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from "react-router-dom";
import { Chart, initTE } from "tw-elements";
import Buscador from "../../components/common/table/buscador";

// Services
import { getEncuestaRes } from "../../services/encuestas/getEncuestaRes";

function EstadisticasDetallesPage() {
  let user = Object();
  user.matricula = 2183041399;
  user.licenciatura = "Computación";
  user.claveLic = 30;

  const [encuestasRes, setEncuestasRes] = useState([]);
  const { periodo, claveLic, nombreLic } = useParams();
  const [query, setQuery] = useState(""); //Variable para buscador

  initTE({ Chart });

  useEffect(() => {
    document.title = "Estadisticas UAMI";
    getEncuestaRes(periodo, claveLic).then((res) => {
      setEncuestasRes(res);
    })
  }, []);

  const showEstadisticas = (encuesta) => {

    let canvas = document.getElementById('canvas'+encuesta[0]);
    canvas.innerHTML = "";

    const allChart = document.createElement('canvas');
    allChart.id = `allChart${encuesta[0]}`;
    canvas.appendChild(allChart);


    const dataBarAll = {
      type: 'bar',
      data: {
        labels: ['Presencial', 'Mixta' , 'Virtual', 'Mañana', 'Tarde' , 'Noche', 
        ...Object.entries(encuesta[1].profesores).map(([key, value]) => value.nombre)
        ],
        datasets: [{
          label: 'Distribucion de   votos',
          data: [
            encuesta[1].modalidades.Presencial, 
            encuesta[1].modalidades.Mixta,
            encuesta[1].modalidades.Virtual,
            encuesta[1].turnos.Mañana, 
            encuesta[1].turnos.Tarde,
            encuesta[1].turnos.Noche,
            ...Object.values(encuesta[1].profesores).map(profesor => profesor.votos)
          ],
          backgroundColor: [
            'rgba(54, 162, 235)',
            'rgba(54, 162, 235)',
            'rgba(54, 162, 235)',
            'rgba(75, 192, 192)',
            'rgba(75, 192, 192)',
            'rgba(75, 192, 192)',
            ...Object.values(encuesta[1].profesores).map(profesor => 'rgba(153, 102, 255)')
          ]
        }],
      }
    }

    new Chart(document.getElementById(`allChart${encuesta[0]}`), dataBarAll);

    const divCanvas = document.getElementById("trCanvas"+encuesta[0]);
    if(divCanvas.classList.contains("hidden")){
      divCanvas.classList.remove("hidden");
    } else{
      divCanvas.classList.add("hidden");
    }
  }

  const filteredData = (datos, query) => {
    const filteredData = Object.keys(datos).filter((key) => {
      const dato = datos[key];
      return (
        //Se hace esto por que por ejemplo la clave en profesores es claveEmpleado
        dato[0].toString().includes(query.toLowerCase())    ||  //Clave
        dato[1].nombre.toLowerCase().includes(query.toLowerCase()) || //Nombre
        dato[1].votos.toString().includes(query.toLowerCase())  //Votos
      );
    }).map((key) => datos[key]);
    console.log("filteredData",filteredData);
    return filteredData;
  }

  return (
    <React.Fragment>
      <div className="bg-base-200">
        <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">

            <HeaderEstadisticas user={user} />
            <h3>Estadisticas para la encuesta del periodo {periodo} de la {nombreLic}</h3>

            <Buscador query={query} setQuery={setQuery}/>
            <div id="tabla-materias" className="overflow-x-auto rounded-lg bg-base-400">
              <table className="table table-compact md:table-normal w-full">
                <thead>
                  <TitleRowTablaMaterias titles={["Clave", "Nombre", "Votos", ""]} />
                </thead>

                <tbody>
                              {/* Renglón con ************* BARRA DE BUSQUEDA  */}
                    {filteredData(Object.entries(encuestasRes), query).map(encuesta => {
                      return (
                        <React.Fragment key={encuesta[0]}>
                          <tr>
                            <td>{encuesta[0]}</td>
                            <td>{encuesta[1].nombre}</td>
                            <td>{encuesta[1].votos}</td>
                            <th>
                              <div className='flex justify-end' id={"btnVer"+encuesta[1].nombre}>
                                <Button text={<FontAwesomeIcon icon={faBarChart} />} 
                                  onClick={() => showEstadisticas(encuesta)}/>
                              </div>
                            </th>
                          </tr>
                          <tr className="hidden" id={"trCanvas"+encuesta[0]}>
                            <td colSpan="4">
                              <div className="mx-auto w-3/5 overflow-hidden" id={"canvas"+encuesta[0]}>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      )}
                    )}

                </tbody>
              </table>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
}

export default EstadisticasDetallesPage