import React from 'react'
import { Link } from 'react-router-dom'
import uamiPrecovid from '../../assets/UAMI.jpg'

export default function Trolleando() {
  return (
    <>
    <div className='flex flex-col text-xl'>

        <div className="hero min-h-max bg-base-200">

            <div className="hero-content pb-16 pt-16 text-center">
                <div>
                    <h1 className="text-5xl font-bold">Encuestas UAMI</h1>
                    <p className="py-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non quam lacus suspendisse faucibus interdum posuere. Facilisis leo vel fringilla est ullamcorper eget. Curabitur gravida arcu ac tortor. Habitasse platea dictumst quisque sagittis purus sit amet. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet non. Pellentesque elit eget gravida cum. Amet risus nullam eget felis eget nunc lobortis. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Felis donec et odio pellentesque diam volutpat commodo sed egestas. Risus feugiat in ante metus dictum at tempor commodo. Odio ut sem nulla pharetra diam sit amet. Volutpat odio facilisis mauris sit amet massa. Volutpat maecenas volutpat blandit aliquam. Vitae tortor condimentum lacinia quis vel eros donec ac.</p>
                </div>
            </div>
        </div>

        <div className="hero min-h-max bg-base-200 pb-16">

            <div className="hero-content flex-col lg:flex-row">
                <img src={ uamiPrecovid }
                     alt="Fotografía de las intalaciones de la UAM Iztapalapa"
                     className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">La App de encuestas UAM!</h1>
                    <p className="py-6">Nuestro objetivo es que abran las materias que los estudiantes desean. ¿Alguna vez te has quedado sin poder inscribir una UEA porque no la abrieron? Vota por las que deseas y logra un cambio en la universidad.</p>
                    <button className="btn btn-primary"><Link to="/login">Realizar la encuesta</Link></button>
                </div>
            </div>
        </div>

    </div>
  </>



  )
}
