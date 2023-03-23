const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function editProfesor(claveProfesor, modalData) {
  console.log(modalData);
  ////////////////////////////////////////////////////////////////
  //////////////////////////////// FALTA SERVICIO
  return fetch(`${ENDPOINT}/administrador/profesor/`+claveProfesor, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nombre: modalData.nombre, claveEmpleado: modalData.claveEmpleado}),
  })
  .then(response => { return response})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
