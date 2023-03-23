const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function crearLicenciatura(modalData) {
  console.log(modalData);
  return fetch(`${ENDPOINT}/administrador/licenciatura/crear`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nombreLic: modalData.nombre, claveLic: modalData.clave}),
  })
  .then(response => { return response})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
