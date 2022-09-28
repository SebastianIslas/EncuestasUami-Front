const ENDPOINT = process.env.REACT_APP_ENDPOINT_API+'/api';


export function getUEASByLic (id_licenciatura) {
  return fetch(`${ENDPOINT}/PlanEstudios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      claveCarrera: id_licenciatura,
    }),
  }).then(res => {
    if (!res.ok) throw new Error("Ha ocurrido un error, al recuperar los datos");
    return res.json()
  }).then(res => {
    console.log(res.materias);
    let results = res.materias.map(({claveUEA, nombre}) => {
                            return {clave: claveUEA, nombre: nombre}; })
    console.log()
    return results;
  })
}
