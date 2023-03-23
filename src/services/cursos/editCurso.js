const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function editCurso(cursoClave, modalData) {
  console.log(modalData);
  return fetch(`${ENDPOINT}/administrador/curso/`+cursoClave, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nombre: modalData.nombre, clave: modalData.clave,  tipo: modalData.tipo}),
  })
  .then(response => { return response})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
