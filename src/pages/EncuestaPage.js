import React, { useEffect, useState } from "react";

import ButtonEnviarEncuesta from '../components/Encuesta/ButtonEnviarEncuesta';
import HeaderEncuesta from '../components/Encuesta/HeaderEncuesta';
import InfoEncuesta from "../components/Encuesta/InfoEncuesta";
import TablaMateriasEncuesta from "../components/Encuesta/TablaMateriasEncuesta";

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

    setMaterias([
      {clave: 11111111, nombre: "Taller Balsamiq 1 Taller Balsamiq 1 Taller Balsamiq 1"},
      {clave: 22222222, nombre: "Taller Balsamiq 2"},
      {clave: 33333333, nombre: "Taller Balsamiq 3"},
      {clave: 44444444, nombre: "Taller Balsamiq 4"},
      {clave: 55555555, nombre: "Taller Balsamiq 5"},
      {clave: 66666666, nombre: "Taller Balsamiq 6"},
      {clave: 77777777, nombre: "Taller Balsamiq 7"}
    ]);

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

      {/*<ButtonEnviarEncuesta />*/}

      <InfoEncuesta />

      {/* Tabla */}
      <TablaMateriasEncuesta materias={materias} 
                             maxMaterias={maxMaterias} 
                             materiasEncuesta={materiasEncuesta}
                             setMateriasEncuesta={setMateriasEncuesta}
      />
      {/* <MateriasEncuestaContext.Consumer>
        <TablaMateriasEncuesta materias={materias} maxMaterias={maxMaterias} />
      </MateriasEncuestaContext.Consumer> */}

      <ButtonEnviarEncuesta />

    {/* </MateriasEncuestaContext.Provider> */}

  </div>
  </div>);
}

export default EncuestaPage
