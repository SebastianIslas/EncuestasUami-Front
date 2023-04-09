const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function activarEnc(modalData) {
  console.log(modalData);
  return fetch(`${ENDPOINT}/administrador/encuesta`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({periodo: modalData.periodo, max_materias: modalData.maxMaterias}),
  })
  .then(response => { return response.json();})
  .then(res=> { return res})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
