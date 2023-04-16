const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function addProfToCurso(claveProfesor, idCurso) {
  return fetch(`${ENDPOINT}/administrador/licenciatura/materias/agregarProfesor/${idCurso}/${claveProfesor}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
  })
  .then(response => { return response})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
