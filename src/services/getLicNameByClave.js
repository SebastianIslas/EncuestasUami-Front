import LICENCIATURAS from "../data/LICENCIATURAS"

// Función que regresa el nombre de una Licenciatura por su clave
export function getLicNameByClave(claveLic) {
  for (let i = 0; i < LICENCIATURAS.length; i++){
    // NOTE: Luis: lo pongo a to String y no parseInt porque no estoy seguro que
    // las claves de las materias son sólo numéros
    if (claveLic === LICENCIATURAS[i].clave.toString()){
      return LICENCIATURAS[i].nombre;
    }
  }

  return "ERROR: No se encontró licenciatura con la clave " + claveLic;
}