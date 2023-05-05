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