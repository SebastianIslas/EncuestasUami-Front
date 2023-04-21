import React from "react";

function InfoEncuesta({maxMaterias}){
  return(
    <div className="px-4 pb-2">
      <p className="text-xs font-normal text-slate-500">
        Puedes elegir hasta <span className='font-bold'>{maxMaterias}</span> materias/UEAs.
        <br/>
        Las opciones por defecto son en modalidad <b>Presencial</b> y en 
        horario <b>Sin preferencia</b>.
        <br/>

        Para cambiar estas opciones puedes dar al botón a la derecha de cada
        materia (<b>Opciones</b> en computadora y <b>+</b> en dispositivos
        móviles).
      </p>
    </div>
  )
}

export default InfoEncuesta