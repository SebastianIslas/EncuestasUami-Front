const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;

export function createCuenta(email, psswrd, matricula, clave_lic) {
    return fetch(`${ENDPOINT}/alumno/crear`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email, matricula: matricula, clave_lic: clave_lic, password: psswrd})
    })
    .then(response => ({...response.json(), status: response.status}))
    .then(res => {
      return res;
    }).catch(err => {
      console.warn("Posible fallo de conexion")
      return err;
    })
  }

export function enviarCodigo(matricula) {
  return fetch(`${ENDPOINT}/alumno/login/recuperar/${matricula}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(response => ({...response.json(), status: response.status}))
  .then(res => {
    return res;
  }).catch(err => {
    console.warn("Posible fallo de conexion")
    return err;
  })
}

export function cambiarPass(psswrd, matricula, codigo) {
  return fetch(`${ENDPOINT}/alumno/login/reestablecer`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({codigo: codigo, matricula: matricula, password: psswrd})
  })
  .then(response => ({...response.json(), status: response.status}))
  .then(res => {
    return res;
  }).catch(err => {
    console.warn("Posible fallo de conexion")
    return err;
  })
}