import logo from '../logo.svg';
import React, { useEffect, useState } from "react";
import ButtonEnviarEncuesta from '../components/Encuesta/ButtonEnviarEncuesta';

// export function Encuesta({ user }) {
// TODO: esto solo es de prueba
function EncuestaPage() {
  // TODO: user se pasa como prop, esto es solo para test
  // O tal vez no, y tenemos que obtener estos datos en esta página desde la API
  let user = Object();
  user.matricula = 2183011316;
  user.licenciatura = "Computación";

  // Variables de materias máximas que se pueden elegir
  const [maxMaterias, setMaxMaterias] = useState(5);

  // Lista de las materias de la licenciatura
  // En esta vista solo usamos la clave y el nombre
  const [materias, setMaterias] = useState([
      {clave: 11111111, nombre: "Taller Balsamiq 1"},
      {clave: 22222222, nombre: "Taller Balsamiq 2"},
      {clave: 33333333, nombre: "Taller Balsamiq 3"},
      {clave: 44444444, nombre: "Taller Balsamiq 4"},
      {clave: 55555555, nombre: "Taller Balsamiq 5"},
      {clave: 66666666, nombre: "Taller Balsamiq 6"},
      {clave: 77777777, nombre: "Taller Balsamiq 7"}
  ]);

  // Lista de las materias elegidas
  // Vamos a guardar un objeto que vamos a mandarle a la API con la selección
  // Este objeto contiene el id del user, luego la clave de la uea, luego la
  // modalidad y el horario
  const [materiasEncuesta, setMateriasEncuesta] = useState({});
  // TODO: diccionario para cuestiones de prueba
  // const [materiasEncuesta, setMateriasEncuesta] = useState({
  //   11111111: {"modalidad": "Presencial", "horario": "Sin preferencia"},
  //   22222222: {"modalidad": "Presencial", "horario": "Sin preferencia"},
  //   44444444: {"modalidad": "Presencial", "horario": "Sin preferencia"},
  //   66666666: {"modalidad": "Presencial", "horario": "Sin preferencia"},
  //   77777777: {"modalidad": "Presencial", "horario": "Sin preferencia"}
  // });
  // NOTE: Es como un JSON con la siguiente estructura
  // {
  //   "2183011316": [
  //     {11111111: {"modalidad": "Virtual", "horario": "mañana"}},
  //     {22222222: {"modalidad": "Virtual", "horario": "mañana"}},
  //     {44444444: {"modalidad": "Virtual", "horario": "mañana"}},
  //     {66666666: {"modalidad": "Virtual", "horario": "mañana"}},
  //     {77777777: {"modalidad": "Virtual", "horario": "mañana"}},
  //   ]
  // }

  // Para manejar las checkboxes usamos lista con las claves que tenemos en la
  // encuesta, está ligada al JSON que teníamos de materias en la encuesta
  const [listaClavesEncuesta, setListaClavesEncuesta] = useState(Object.keys(materiasEncuesta));

  // Función para desactivar los checkbox si ya alcanzamos el limite de materias
  // y si también el checkbox no está en la lista de materias seleccionadas. Ya
  // que tenemos que desactivar aquellos que no están checked y dejar activos
  // los que están checked puedan ser unchecked
  const handleDisableCheckbox = (claveMateria) => {
    if((listaClavesEncuesta.length >= maxMaterias) 
          && (listaClavesEncuesta.indexOf(claveMateria) < 0)){
      return true;
    }else{
      return false;
    }
  }

  // Función que agrega o elimina materias elegidas a partir de dar al checkbox
  const handleCheckbox = (e) => {
    // Obtenemos del evento el nombre del row que también es la clave de la
    // materia y el estatus del check después de dar click
    const { name, checked } = e.target

    // Array para cambiar los datos
    let copyArray;

    // Copia de las materias en la encuesta
    let copyOfMaterias = {...materiasEncuesta};

    // Eliminar la materia de la lista de encuesta
    if (!checked){
      if(listaClavesEncuesta.indexOf(name) >= 0){
        // TODO: Agregar mensaje de que se eliminó una materia
        delete copyOfMaterias[name];
        copyArray = [...listaClavesEncuesta];
        copyArray.splice(listaClavesEncuesta.indexOf(name), 1);
        // setListaClavesEncuesta([...copyArray]);
      }
    // Agregar una materia a la encuesta
    }else{
      copyOfMaterias[name] = {
        "modalidad": "Presencial",
        "horario": "Sin preferencia"
      };
      copyArray = [...listaClavesEncuesta, name];
      // setListaClavesEncuesta([...listaClavesEncuesta, name]);
    }

    setListaClavesEncuesta(copyArray);
    setMateriasEncuesta(copyOfMaterias);

    // // Si la clave existe en la lista de seleccionadas, la borra
    // if (checked){
    // // Si la clave no existe tratamos de agregarla
    // } else {
    //   // Si ya se alcanzó el máximo de materias no se agrega y manda un mensaje
    //   if (Object.keys(copyOfMaterias).length >= maxMaterias){
    //     // TODO: agrear mensaje de que ya no se pueden agregar más materias
    //     e.target.checked = false;
    //     return;
    //   } else {
    //     // TODO: checar cuales son las opciones por defecto que se agregan en modalidad y horario
    //   }
    // }

    // console.log(Object.keys(copyOfMaterias).length)
  }

  // Hook a ejecutar al montar el componente
  useEffect(() => {
    document.title = "UEAncuestas UAMI";

    // TODO: Obtener datos desde la API
    // function updateMaxMaterias() {
      // query = "SELECT max_materias FROM licenciaturas WHERE nombre = " + user.licenciatura + ";"
      // max_materias = query blablabla xd
      // setMaxMaterias(max_materias);
    // }

    // TODO: Obtener datos desde la API
    // function updateMaterias() {
      // query = "SELECT clave, nombre FROM materias WHERE licencitura = " + user.licenciatura + ";"
      // materias = query blablabla xd
      // setMaxMaterias(materias);
    // }
  });

  // TODO: Pruebas de las estructuras que tenemos para enviar
  // useEffect(() => {
  //   console.log(materiasEncuesta);
  // }, [materiasEncuesta]);
  // useEffect(() => {
  //   console.log(listaClavesEncuesta);
  // }, [listaClavesEncuesta]);


  return (<>
    <div id="logo-info"
         className='hero-content flex-col lg:flex-row px-4'>

      <div className='avatar w-24'>
        <img src={logo} alt="Logo de encuestas uami"/>
      </div>

      <div>
        <p>
          Bienvenido estudiante <span className='font-bold'>{user.matricula}</span> de
          la licenciatura <span className='font-bold'>{user.licenciatura}</span>.
          <br />
          Gracias por llenar esta encuesta.
          <br />
          Puedes elegir hasta <span className='font-bold'>{maxMaterias}</span> materias.
        </p>
      </div>
    </div>

    {/* Container de la tabla y botones*/}
    <div id="tabla-materias"
        //  className="overflow-x-auto container px-2 md:px-10 mx-auto">
        className="overflow-x-auto container px-2 md:px-10 mx-auto">

      <ButtonEnviarEncuesta/>

      {/* Tabla */}
      <table className="table table-compact md:table-normal w-full">

        {/* Header de la tabla */}
        <thead>
          <tr>
            {/* Columna Checkbox */}
            <th></th>
            {/* Columna Clave de la UEA */}
            <th><span className='text-xs'>Clave</span></th>
            {/* Columna Nombre de la UEA */}
            <th><span className='text-xs'>Nombre</span></th>
            {/* Columna botón Opciones */}
            <th></th>
          </tr>
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
        
          {/* Renglón */}
          {materias.map(materia => (
            <tr key={materia.clave}>
              <th className='w-6'>
                <label>
                  <input type="checkbox" 
                         name={materia.clave.toString()}
                         className="checkbox" 
                         disabled={handleDisableCheckbox(materia.clave.toString())}
                         checked={listaClavesEncuesta.includes(materia.clave.toString())}
                         onChange={handleCheckbox}
                        />
                </label>
              </th>
              <td>
                <div className="text-md w-10 opacity-80">
                  <p className='break-all'>
                    {materia.clave}
                  </p>
                </div>
              </td>
              <td>
                <div className="text-md break-word font-bold">
                  {materia.nombre}
                </div>
              </td>
              <th>
                <div className='flex flex-row-reverse'>
                  <button className="btn btn-accent
                                    btn-xs sm:btn-sm md:btn-md
                                    before:content-['+']
                                    md:before:content-['Opciones']
                                    w-8 md:w-24"></button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            {/* Columna Checkbox */}
            <th></th>
            {/* Columna Clave de la UEA */}
            <th><span className='text-xs'>Clave</span></th>
            {/* Columna Nombre de la UEA */}
            <th><span className='text-xs'>Nombre</span></th>
            {/* Columna botón Opciones */}
            <th></th>
          </tr>
        </tfoot>
      </table>

      <ButtonEnviarEncuesta/>

    </div>
  </>);
}

export default EncuestaPage