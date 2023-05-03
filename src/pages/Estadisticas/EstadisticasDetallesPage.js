import React, {Fragment, useEffect, useState } from "react";

import Button from '../../components/common/Button';
import HeaderEstadisticas from '../../components/Estadisticas/HeaderEstadisticas';
import TitleRowTablaMaterias from "../../components/common/table/TitleRowTablaMaterias";
import { faBarChart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from "react-router-dom";
import { Chart, initTE } from "tw-elements";

// Services
import { getEncuestaRes } from "../../services/encuestas/getEncuestaRes";

function EstadisticasDetallesPage() {
  let user = Object();
  user.matricula = 2183041399;
  user.licenciatura = "Computación";
  user.claveLic = 30;

  const [encuestasRes, setEncuestasRes] = useState([]);
  const { periodo, claveLic, nombreLic } = useParams();
  const [charts, setCharts] = useState({});

  console.log(periodo, claveLic)
  initTE({ Chart });

  useEffect(() => {
    document.title = "Estadisticas UAMI";
    getEncuestaRes(periodo, claveLic).then((res) => {
      console.log("res", res);
      setEncuestasRes(res);
    })
  }, []);

  const showEstadisticas = (encuesta) => {

    let canvas = document.getElementById('canvas'+encuesta[0]);
    canvas.innerHTML = "";

    const modalidadChart = document.createElement('canvas');
    modalidadChart.id = `modalidadChart${encuesta[0]}`;
    canvas.appendChild(modalidadChart);
    const turnoChart = document.createElement('canvas');
    turnoChart.id = `turnoChart${encuesta[0]}`;
    canvas.appendChild(turnoChart);
    const profesoresChart = document.createElement('canvas');
    profesoresChart.id = `profesoresChart${encuesta[0]}`;
    canvas.appendChild(profesoresChart);
    const allChart = document.createElement('canvas');
    allChart.id = `allChart${encuesta[0]}`;
    canvas.appendChild(allChart);

    const dataBarModalidad = {
      type: 'bar',
      data: {
        labels: ['Presencial', 'Mixta' , 'Virtual'],
        datasets: [{
          label: 'Modalidad',
          data: [
            encuesta[1].modalidades.Presencial, 
            encuesta[1].modalidades.Mixta,
            encuesta[1].modalidades.Virtual
          ],
          backgroundColor: 'rgb(30,184,84)'
        }],
      }
    };
    const dataBarTurno = {
      type: 'bar',
      data: {
        labels: ['Mañana', 'Tarde' , 'Noche'],
        datasets: [{
          label: 'Turno',
          data: [
            encuesta[1].turnos.Mañana, 
            encuesta[1].turnos.Tarde,
            encuesta[1].turnos.Noche
          ],
        }],
      },
    };
    const dataBarProfesores = {
      type: 'bar',
      data: {
        labels: Object.entries(encuesta[1].profesores).map(profesor => profesor[1].nombre),
        datasets: [{
          label: 'Profesores',
          data: Object.entries(encuesta[1].profesores).map(profesor => profesor[1].votos),
          backgroundColor: 'rgb(30,184,84)'
        }],
      },
    };

    const dataBarAll = {
      type: 'bar',
      data: {
        labels: ['Presencial', 'Mixta' , 'Virtual', 'Mañana', 'Tarde' , 'Noche', 
        ...Object.entries(encuesta[1].profesores).map(([key, value]) => value.nombre)
        ],
        datasets: [{
          label: 'Estadisticas',
          data: [
            encuesta[1].modalidades.Presencial, 
            encuesta[1].modalidades.Mixta,
            encuesta[1].modalidades.Virtual,
            encuesta[1].turnos.Mañana, 
            encuesta[1].turnos.Tarde,
            encuesta[1].turnos.Noche,
            ...Object.values(encuesta[1].profesores).map(profesor => profesor.votos)
          ],
//          backgroundColor: 'rgb(30,184,84)'
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

    new Chart(document.getElementById(`modalidadChart${encuesta[0]}`), dataBarModalidad);
    new Chart(document.getElementById(`turnoChart${encuesta[0]}`), dataBarTurno);
    new Chart(document.getElementById(`profesoresChart${encuesta[0]}`), dataBarProfesores);
    new Chart(document.getElementById(`allChart${encuesta[0]}`), dataBarAll);

    const divCanvas = document.getElementById("trCanvas"+encuesta[0]);
    if(divCanvas.classList.contains("hidden")){
      divCanvas.classList.remove("hidden");
    } else{
      divCanvas.classList.add("hidden");
    }
  }



  return (
    <React.Fragment>
      <div className="bg-base-200">
        <div className="min-h-screen bg-base-200 container px-2 md:px-10 mx-auto">
            <HeaderEstadisticas user={user} />
            <h3>Estadisticas para la encuesta del periodo {periodo} de la {nombreLic}</h3>
            <div id="tabla-materias" className="overflow-x-auto rounded-lg bg-base-400">
              <table className="table table-compact md:table-normal w-full">
                <thead>
                  <TitleRowTablaMaterias titles={["Clave", "Nombre", "# Votos", ""]} />
                </thead>

                <tbody>
                    {Object.entries(encuestasRes).map(encuesta => {
                      console.log(encuesta)
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