import React from "react";

function ContainerOpciones({
  text,
  prop,
  opciones,
  handleClassBtnModal,
  changePropModal
}){
  return (<div>
    <p className="text-xl pb-2">
      {text}</p>

      {/* POR EL MOMENTO NO SIRVE DE NA' */}
      <div className="form-control">
            <label className="label">
                <span className="label-text">{prop.name}</span>
            </label> 
            <input type="text" placeholder={prop.placeHolderText} className="input input-bordered" />
                {prop.info}
        </div>    


    <br/>

  </div>)
}

// CAMBIAR ESTO POR EL DIV DE ARRIBA, INTENTAR ADAPTAR LAS FUNCIONALIDADES DE VALDO
    /* {/*Grupo de botones relacionados con la modalidad del curso * /} 
    <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
      {opciones.map(opcion =>
      <button key={opcion} className={handleClassBtnModal(prop, opcion)}
                onClick={() => {
                  changePropModal(prop, opcion)}}>
        {opcion}</button>
      )}
    </div>
    */

export default ContainerOpciones
