const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;


export function getUEASByLic (licenciatura_id) {
  return fetch(`${ENDPOINT}/administrador/materia/`+licenciatura_id, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }).then(response => response.json())
  .then(res => {
    console.log(res);
    let results = res.cursos.map(({clave, nombre}) => {
      return {clave: clave, nombre: nombre}; 
    })
    return results;
  }).catch(err => {
    console.warn("Posible fallo de conexion")
    return [{clave: "ERROR", nombre: "ERROR"}]
  })

/*  
  .then(res => {
    
    if (!res.ok) throw new Error("Ha ocurrido un error, al recuperar los datos");
    return res.json()
  }).then(res => {
    let results = res.materias.map(({claveUEA, nombre}) => {
      return {clave: claveUEA, nombre: nombre}; })
    return results;
  }).catch(res => {
    console.warn("Posible fallo de conexion")
    return [{clave: "ERROR", nombre: "ERROR"}]
  })
  */
}

