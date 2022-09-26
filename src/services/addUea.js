const ENDPOINT = 'http://localhost:4000/api';

export function addUEA(_nombre,_clave, id_licenciatura){
    return fetch(ENDPOINT+'/PlanEstudio', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({nombre_UEA: _nombre, clave_carrera: id_licenciatura, clave: _clave}),
});
}
