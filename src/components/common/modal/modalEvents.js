
// Dentro del modal, si no se han elegido las dos propiedades que se piden no
// se deja pulsar el botón de guardar opciones elegidas.
export function handleBtnAceptar(modalData){
  for (const key in modalData) {
    if (modalData[key] == ""){
      return true;
    }
  }
  return false;
}

// Función para cambiar el estilo de los botones del modal dependiendo si
// están dentro de las opciones elegidas anteriormente por el usuario. Se
// basa en tomar una propiedad (modalidad o horario) y también considera el
// valor de esa proiedad
export function handleClassBtnModal2(modalData, propiedad, valor){
  console.log("modalData2", modalData);
  console.log("propiedad2", propiedad);
  console.log("valor2", valor);
// Si la opción en esa propiedad ha sido elegida activamos el botón
  if (modalData[propiedad] === valor){
    return "btn btn-active btn-accent";
  // Desactivamos el botón si no está elegida esa opción
  } else {
    return "btn btn-active btn-ghost";
  }
}
