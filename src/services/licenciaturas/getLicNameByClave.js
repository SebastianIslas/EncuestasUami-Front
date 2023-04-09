const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;

export function getLicNameByClave(claveLic) {
  return fetch(`${ENDPOINT}/administrador/licenciatura/`+claveLic, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => response.json())
  .then(res => {
    return res;
  }).catch(err => {
    console.warn("Posible fallo de conexion")
    return err;
  })
}