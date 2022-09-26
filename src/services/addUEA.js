const ENDPOINT = 'http://localhost:4000/api'


export function addUEA (_body) {
  return fetch(`${ENDPOINT}/PlanEstudio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: _body,
  }).then(res => {
    if (!res.ok) throw new Error("Ha ocurrido un error, al recuperar los datos");
    return res.json()
  }).then(res => {
    console.log(res.materias);
    let results = res.materias.map(({claveUEA, nombre}) => {
                            return {clave: claveUEA, nombre: nombre}; })
    return;
  })
}
