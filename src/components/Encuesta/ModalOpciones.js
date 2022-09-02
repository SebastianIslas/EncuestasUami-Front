import React from "react";

function BtnModalOpciones({
  clave,
  nombreMateria,
  isDisabled
}) {

  // Clase para desactivar los botones que abren el modal
  let btnClass = `btn btn-accent modal-button\
                     btn-xs sm:btn-sm md:btn-md\
                     before:content-['+'] md:before:content-['Opciones']\
                     w-8 md:w-24`;

  return (
    <div className='flex flex-row-reverse'>
      <label htmlFor={clave}
             className={isDisabled ? btnClass + " btn-disabled": btnClass}>
      </label>

      <input type="checkbox" id={clave} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-min">

          <label htmlFor={clave} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

          <h2 className="font-bold text-lg">{nombreMateria}</h2>
          <br></br>

          <p className="text-sm">¿En qué modalidad te gustaría que se abriera esta UEA?</p>
          <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
            <input type="radio" name="room_type" id="presencial" checked hidden/>
            <label htmlFor="presencial">
              <button class="btn btn-active btn-ghost">Presencial</button>
            </label>

            <input type="radio" name="room_type" id="presencial" hidden/>
            <label htmlFor="presencial">
              <button class="btn btn-active btn-ghost">Virtual</button>
            </label>
          </div>
          <br></br>
          <p className="text-sm">¿En qué horario te gustaría llevar esta UEA?</p>
          <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center">
            <input type="radio" name="room_type" id="presencial" checked hidden/>
            <label htmlFor="presencial">
              <button class="btn btn-active btn-ghost">Mañana</button>
            </label>

            <input type="radio" name="room_type" id="presencial" hidden/>
            <label htmlFor="presencial">
              <button class="btn btn-active btn-ghost">Tarde</button>
            </label>

            <input type="radio" name="room_type" id="presencial" hidden/>
            <label htmlFor="presencial">
              <button class="btn btn-active btn-ghost">Tarde-noche</button>
            </label>

            <input type="radio" name="room_type" id="presencial" hidden/>
            <label htmlFor="presencial">
              <button class="btn btn-active btn-ghost">Sin preferencia</button>
            </label>
          </div>

          <p className="text-xs font-normal text-slate-500">Mañana: 8:00 a 12:00</p>
          <p className="text-xs font-normal text-slate-500">Tarde: 12:00 a 16:00</p>
          <p className="text-xs font-normal text-slate-500">Tarde-noche: 16:00 a 21:00</p>
          <div className="modal-action">
            <label htmlFor={clave} className="btn">Aceptar</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BtnModalOpciones