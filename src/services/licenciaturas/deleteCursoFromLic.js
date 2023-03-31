const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function deleteCursoFromLic(modalData, claveLic) {
  console.log("ModaldDTA",modalData,claveLic)
  return fetch(`${ENDPOINT}/administrador/licenciatura/eliminarMateria`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({clave_lic: claveLic, clave_curso: modalData.clave}),
  })
  .then(response => { return response})
  .catch(err => {
    console.log("Posible fallo de conexion")
    return err;
  })
}
