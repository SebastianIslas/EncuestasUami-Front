const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function deleteProfesor(profesorClave) {
  return fetch(`${ENDPOINT}/administrador/profesor/eliminarProfesor/`+profesorClave, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => { return response})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
