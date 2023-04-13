const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function deleteProfesorFromCurso (id_materia, claveEmpleado) {
  return fetch(`${ENDPOINT}/administrador/licenciatura/materias/removerProfesorFromCurso/${id_materia}/${claveEmpleado}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  }).then(response => response.json())
  .then(res => {
    return res;
  }).catch(err => {
    console.warn("Posible fallo de conexion")
    return null;
  })

}

