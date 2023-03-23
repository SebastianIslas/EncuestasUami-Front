const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function crearCurso(modalData) {
  console.log(modalData);
  return fetch(`${ENDPOINT}/administrador/materias/crear`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nombre_UEA: modalData.nombre, clave: modalData.clave,  tipo: modalData.tipo}),
  })
  .then(response => { return response})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
