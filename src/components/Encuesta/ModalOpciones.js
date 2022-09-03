// import React, { useEffect, useState } from "react";

// function ModalOpciones({
//   clave,
//   nombreMateria,
//   isDisabled,
//   materiaElegidaEncuesta
// }) {
  
//   // Objeto que contiene las opciones elegidas anteriormente, si no existen es
//   // un objeto en null
//   const [opcionesElegidas, setOpcionesElegidas] = useState(Object());

//   // Clase para desactivar los botones que abren el modal
//   let btnClass = `btn btn-accent modal-button\
//                   btn-xs sm:btn-sm md:btn-md\
//                   before:content-['+'] md:before:content-['Opciones']\
//                   w-8 md:w-24`;

//   return (
//     <div className='flex flex-row-reverse'>
//       {/* Controlar si el botón está activado */}
//       <label htmlFor={clave}
//              className={isDisabled ? btnClass + " btn-disabled": btnClass}
//              onClick={() => {
//                 if (materiaElegidaEncuesta){
//                   setOpcionesElegidas(materiaElegidaEncuesta);
//                 }
//              }}
//       >
//       </label>

//       {/* Checkbox relacionado con el botón de mostrar el modal */}
//       <input type="checkbox" id={clave} className="modal-toggle" />

//       {/* Ventana del modal */}
//       <div className="modal">
//         {/* Contenido del modal */}
//         <div className="modal-box relative w-min">

//           {/* Botón para cerrar el modal */}
//           <label htmlFor={clave} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

//           {/* El título del modal es el nombre de la materia */}
//           <h2 className="font-bold text-lg">{nombreMateria}</h2>
//           {/* También mostramos la clave de la materia */}
//           <p className="text-sm font-normal text-slate-500">({clave})</p>
//           <br/>

//           <p className="text-sm pb-2">¿En qué modalidad te gustaría que se abriera esta UEA?</p>
//           <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
//             <input type="radio" name="modalidad" id="Presencial" checked hidden/>
//             <label htmlFor="Presencial">
//               <button class="btn btn-active btn-ghost">Presencial</button>
//             </label>

//             <input type="radio" name="modalidad" id="Virtual" hidden/>
//             <label htmlFor="Virtual">
//               <button class="btn btn-active btn-ghost">Virtual</button>
//             </label>
//           </div>
//           <br/>

//           <p className="text-sm pb-2">¿En qué horario te gustaría llevar esta UEA?</p>
//           <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
//             <input type="radio" name="horario" id="Manana" checked hidden/>
//             <label htmlFor="Manana">
//               <button class="btn btn-active btn-ghost">Mañana</button>
//             </label>

//             <input type="radio" name="horario" id="Tarde" hidden/>
//             <label htmlFor="Tarde">
//               <button class="btn btn-active btn-ghost">Tarde</button>
//             </label>
//            <label htmlFor="Tade-noche">
//               <button class="btn btn-active btn-ghost">Tarde-noche</button>
//             </label>

//             <input type="radio" name="horario" id="Sin-preferencia" hidden/>
//             <label htmlFor="Sin-preferencia">
//               <button class="btn btn-active btn-ghost">Sin preferencia</button>
//             </label>
//           </div>

//           <div className="modal-action">
//             <div className="inset-y-0 left-0">
//             <p className="text-xs font-normal text-slate-500">Mañana: 8:00 a 12:00</p>
//             <p className="text-xs font-normal text-slate-500">Tarde: 12:00 a 16:00</p>
//             <p className="text-xs font-normal text-slate-500">Tarde-noche: 16:00 a 21:00</p>
//             </div>
//             <label htmlFor={clave} className="btn">Aceptar</label>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ModalOpciones