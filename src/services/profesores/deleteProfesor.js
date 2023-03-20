const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function deleteProfesor(cursoClave) {
  return fetch(`${ENDPOINT}/administrador/materias/eliminar/`+cursoClave, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => response.json())
  .then(res => {
    console.log(res);
    return res;
  }).catch(err => {
    console.warn("Posible fallo de conexion")
    return err;
  })
}
