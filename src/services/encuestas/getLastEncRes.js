const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function getLastEncRes(periodo, matricula) {
  //console.log("INSIDE FETCH", encRes);
  return fetch(`${ENDPOINT}/alumno/ultimaEncuestaRes/${periodo}/${matricula}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(response => { return response.json();})
  .then(res=> { return res})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
