const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function crearProfesor(modalData) {
  console.log(modalData);
  return fetch(`${ENDPOINT}/administrador/profesor/crearProfesor`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nombreProfesor: modalData.nombre, claveEmpleado: modalData.claveEmpleado}),
  })
  .then(response => { return response})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
