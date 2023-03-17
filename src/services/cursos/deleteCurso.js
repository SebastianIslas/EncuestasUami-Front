const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function deleteCurso(cursoClave) {
  return fetch(`${ENDPOINT}/admin/materias/eliminar/`+cursoClave, {
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