const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function editProfesor(modalData) {
  console.log(modalData);
  return fetch(`${ENDPOINT}/administrador/curso/`+modalData.clave, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({nombre: modalData.nombre, clave: modalData.clave,  tipo: modalData.tipo}),
  })
  .then(response => response.json())
  .then(res => {
    console.log(res);
    return res;
  }).catch(err => {
    console.warn("Posible fallo de conexion")
    return err;
  })
}