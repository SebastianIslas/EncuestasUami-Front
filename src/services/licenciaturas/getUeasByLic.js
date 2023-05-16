const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function getUEASByLic (licenciatura_id) {
  return fetch(`${ENDPOINT}/administrador/materia/`+licenciatura_id, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }).then(response => response.json())
  .then(res => {
//    console.log(res);
    let results = res.cursos.map(({clave, nombre}) => {
      return {clave: clave, nombre: nombre}; 
    })
    return results;
  }).catch(err => {
    console.warn("Posible fallo de conexion")
    return [{clave: "ERROR", nombre: "ERROR"}]
  })
}

