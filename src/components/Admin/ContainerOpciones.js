import React from "react";

function ContainerOpciones({
  text,
  prop,
  opciones,
  handleClassBtnModal,
  changePropModal
}){
  return (<div>
    <p className="text-sm pb-2">
      {text}</p>


    {/* Grupo de botones relacionados con la modalidad del curso */}
    <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
      {opciones.map(opcion =>
      <button key={opcion} className={handleClassBtnModal(prop, opcion)}
                onClick={() => {
                  changePropModal(prop, opcion)}}>
        {opcion}</button>
      )}
    </div>
    <br/>

  </div>)
}

export default ContainerOpciones
