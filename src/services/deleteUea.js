const ENDPOINT = 'http://localhost:4000/api';


export function borrarUEA(licenciaturas_id, clave_uea){                                                            
    return fetch(ENDPOINT+'/PlanEstudios', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({clave_carrera: licenciaturas_id, clave: clave_uea}),
      }).catch(res => {
        console.warn("Posible fallo de conexion en BORRAR UEA")
      });                                      

}
