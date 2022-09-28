const ENDPOINT = 'http://localhost:4000/api'


export function getUEASByLic (licenciatura_id) {
  return fetch(`${ENDPOINT}/PlanEstudios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({claveCarrera: licenciatura_id})
  }).then(res => {
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
}

