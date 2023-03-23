const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function editLicenciatura(licClave, modalData) {
  console.log(modalData);
  return fetch(`${ENDPOINT}/administrador/licenciatura/`+licClave, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nombre: modalData.nombre, clave: modalData.clave}),
  })
  .then(response => { return response})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
