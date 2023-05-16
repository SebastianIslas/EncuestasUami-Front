const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;

// fake login
export const fetchLogin = (email, password, callback) => 
  setTimeout(() => {
    if (email === 'admin' && password === 'admin') {
      return callback(null);
    } else {
      return callback(new Error('Invalid email and password'));
    }
  }, 1000);

export const fetchLoginAlumnos = (email, password, callback) => 
setTimeout(() => {
  if (email === 'java1' && password === 'java') {
    return callback(null);
  } else {
    return callback(new Error('Invalid email and password'));
  }
}, 1000);

export function loginAlumnos(email, psswrd) {
  return fetch(`${ENDPOINT}/alumno/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email: email, password: psswrd})
  })
  .then(response => response.json())
  .then(res => {
    return res;
  }).catch(err => {
    console.warn("Posible fallo de conexion")
    return err;
  })
}