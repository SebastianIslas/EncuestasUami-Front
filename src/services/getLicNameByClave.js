import LICENCIATURAS from "../data/LICENCIATURAS"

// Función que regresa el nombre de una Licenciatura por su clave
export function getLicNameByClave(claveLic) {
  for (let i = 0; i < LICENCIATURAS.length; i++){
    if (LICENCIATURAS[i].clave == claveLic){
      return [LICENCIATURAS[i].nombre];
    }
  }

  return "ERROR: No se encontró licenciatura con la clave" + claveLic;
}