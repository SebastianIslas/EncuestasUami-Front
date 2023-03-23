const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function deleteCurso(cursoClave) {
  return fetch(`${ENDPOINT}/administrador/materias/eliminar/`+cursoClave, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => { return response})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
