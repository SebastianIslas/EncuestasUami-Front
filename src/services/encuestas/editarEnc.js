const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function editarEnc(modalData, idEncuesta) {
  console.log("EditarEncServicio", modalData, idEncuesta);
  return fetch(`${ENDPOINT}/administrador/encuesta/${idEncuesta}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({periodo: modalData.periodo, max_materias: modalData.maxMaterias, activo: true}),
  })
  .then(response => { return response.json();})
  .then(res=> { return res})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
