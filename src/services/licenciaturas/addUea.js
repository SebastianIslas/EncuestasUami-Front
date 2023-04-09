const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;

export function addUEAtoLic(claveCurso, idLic){
  console.log("ENTRO",claveCurso,idLic);
return fetch(ENDPOINT+'/administrador/licenciatura/agregarMateriaExistenteALic/'+idLic+'/'+claveCurso, {
  method: 'PUT', 
  headers: {'Content-Type': 'application/json'}

}).then(response => { return response})
.catch(res => {
  console.warn("Posible fallo de conexion en AGREGAR UEA")
});;
}
