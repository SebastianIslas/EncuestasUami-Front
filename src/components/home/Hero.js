import React from 'react'
import uamiPrecovid from '../../assets/UAMI.jpg'
export default function Hero() {
  return (
    <div className="hero min-h-screen bg-base-200 text-xl text-justify">

        <div className="hero-content grid grid-cols-6 gap-2">

            <div className=" col-span-6 col-start-1 pb-24 text-center">
                <h1 className="text-5xl font-bold">Encuestas UAMI</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
        
            <div className='col-span-2'>
                <img src={ uamiPrecovid } className="max-w-sm rounded-lg shadow-2xl" />
            </div>
            
            <div className='col-span-4'>
                <h1 className="text-5xl font-bold">La App de encuestas UAM!</h1>
                <p className="py-6">Nuestro objetivo es que abran las materias que los estudiantes desean. ¿Alguna vez te has quedado sin poder inscribir una UEA porque no la abrieron? Vota por las que deseas y logra un cambio en la universidad.</p>
                <button className="btn btn-primary">Realizar la Encuesta</button>
            </div>
        </div>

    </div>
  )
}
