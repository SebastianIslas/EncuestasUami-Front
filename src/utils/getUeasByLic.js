// Función que regresa una lista de objetos
// Los objetos representan una lista de todas la materias de una carrera dada en
// forma de clave
// Los datos por materia son:
//    clave de la materia - integer
//    nombre de la materia - string
//    la materia está activa - booleano
export function getUeasByLic(claveLic) {
  console.log("Obteniendo las materias de la Licenciatura " + claveLic);

  return [
    { clave: 1111, nombre: `Materia 1 de la Lic ${claveLic}`, activa: true},
    { clave: 1112, nombre: `Materia 2 de la Lic ${claveLic}`, activa: true},
    { clave: 1113, nombre: `Materia 3 de la Lic ${claveLic}`, activa: false},
    { clave: 1114, nombre: `Materia 4 de la Lic ${claveLic}`, activa: true},
    { clave: 1115, nombre: `Materia 5 de la Lic ${claveLic}`, activa: true},
    { clave: 1116, nombre: `Materia 6 de la Lic ${claveLic}`, activa: false},
    { clave: 1117, nombre: `Materia 7 de la Lic ${claveLic}`, activa: true},
    { clave: 1118, nombre: `Materia 8 de la Lic ${claveLic}`, activa: false},
  ]
}