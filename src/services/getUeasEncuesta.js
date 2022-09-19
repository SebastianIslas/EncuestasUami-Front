const ENDPOINT = 'http://loaclhost:4000/api'


export function getUEAS () {
  return fetch(`${ENDPOINT}/PlanEstudios`, {
    method: 'GET',
  }).then(res => {
    if (!res.ok) throw new Error("Ha ocurrido un error,al recuperar los datos");
    return res.json()
  }).then(res => {
    let results = res.map(({clave, nombre_UEA}) => {
                            return {clave: clave, nombre: nombre_UEA}; })
    return results
  })
}

