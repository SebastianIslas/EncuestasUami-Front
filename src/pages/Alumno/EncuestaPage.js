import React, { useEffect, useState } from "react";

import Button from '../../components/common/Button';
import HeaderEncuesta from '../../components/Encuesta/HeaderEncuesta';
import InfoEncuesta from "../../components/Encuesta/InfoEncuesta";
import TablaMateriasEncuesta from "../../components/Encuesta/TablaMateriasEncuesta";

// Services
import { getUEASByLic } from "../../services/licenciaturas/getUeasByLic";

// Context de las materias en elegidas por el usuario
// export const MateriasEncuestaContext = React.createContext({});

// export function Encuesta({ user }) {
// TODO: esto solo es de prueba
function EncuestaPage() {
  // TODO: user se pasa como prop, esto es solo para test
  // O tal vez no, y tenemos que obtener estos datos en esta página desde la API
  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  // Variables de materias máximas que se pueden elegir
  const [maxMaterias, setMaxMaterias] = useState(0);

  // Lista de las materias de la licenciatura
  // En esta vista solo usamos la clave y el nombre
  const [materias, setMaterias] = useState([]);

  // Lista de las materias elegidas
  // Vamos a guardar un objeto que vamos a mandarle a la API con la selección
  // Este objeto contiene el id del user, luego la clave de la uea, luego la
  // modalidad y el horario
  // NOTE: Es como un JSON con la siguiente estructura, es una idea mía, esto
  // puede cambiar según los de backend
  // {
  //   "2183011316": [
  //     {11111111: {"modalidad": "Virtual", "horario": "mañana"}},
  //     {22222222: {"modalidad": "Virtual", "horario": "mañana"}},
  //     {44444444: {"modalidad": "Virtual", "horario": "mañana"}},
  //     {66666666: {"modalidad": "Virtual", "horario": "mañana"}},
  //     {77777777: {"modalidad": "Virtual", "horario": "mañana"}},
  //   ]
  // }
  const [materiasEncuesta, setMateriasEncuesta] = useState({});
  // TODO: diccionario para cuestiones de prueba
  // const [materiasEncuesta, setMateriasEncuesta] = useState({
  //   11111111: {"modalidad": "Presencial", "horario": "Sin preferencia"},
  //   22222222: {"modalidad": "Presencial", "horario": "Sin preferencia"},
  //   44444444: {"modalidad": "Presencial", "horario": "Sin preferencia"},
  //   66666666: {"modalidad": "Presencial", "horario": "Sin preferencia"},
  //   77777777: {"modalidad": "Presencial", "horario": "Sin preferencia"}
  // });


  // Hook a ejecutar al montar el componente
  useEffect(() => {
    document.title = "UEAncuestas UAMI";

    // TODO: Aquí van las funciones para cargar los datos de la API
    // TODO: Tenemos que cargar las materias, el max de materias y el MaxdeMaterias
    // TODO: Tal vez tengamos que obtener la licenciatura y boleta del alumno,
    //       no sé si eso venga desde el Login

    //setMaterias(getUeasEncuestaByLic(user.licenciatura));
    getUEASByLic(30).then(setMaterias);

    setMaxMaterias(4);
  }, []);

  // TODO: Pruebas de las estructuras que tenemos para enviar
  useEffect(() => {
    console.log(materiasEncuesta);
  }, [materiasEncuesta]);
  // useEffect(() => {
  //   console.log(listaClavesEncuesta);
  // }, [listaClavesEncuesta]);

  return (
  <div className="bg-base-200">
  <div className="min-h-screen bg-base-200 max-w-4xl container px-2 md:px-10 mx-auto">

    {/* <MateriasEncuestaContext.Provider value={{materiasEncuesta, setMateriasEncuesta}}> */}

      <HeaderEncuesta user={user} maxMaterias={maxMaterias} />
      <InfoEncuesta />

      <TablaMateriasEncuesta materias={materias} 
                             maxMaterias={maxMaterias} 
                             materiasEncuesta={materiasEncuesta}
                             setMateriasEncuesta={setMateriasEncuesta}
      />
      {/* <MateriasEncuestaContext.Consumer>
        <TablaMateriasEncuesta materias={materias} maxMaterias={maxMaterias} />
      </MateriasEncuestaContext.Consumer> */}
      <div className="fixed bottom-4 left-4">
        <Button text={"Enviar encuesta"} />
      </div>
    {/* </MateriasEncuestaContext.Provider> */}

  </div>
  </div>);
}

export default EncuestaPage