const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function enviarEncRes(encRes) {
  return fetch(`${ENDPOINT}/alumno/encuestaResuelta`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(encRes),
  })
//  .then(response => { return response.json();})
  .then(res=> { return res})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
