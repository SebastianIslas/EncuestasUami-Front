const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function consultarEncuestaActiva(modalData) {
  console.log(modalData);
  return fetch(`${ENDPOINT}/administrador/encuesta/activa`, {
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
