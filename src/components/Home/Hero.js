import React from 'react'
import { Link } from 'react-router-dom'
import uamiPrecovid from '../../assets/UAMI.jpg'

export default function Hero() {
  return (
    <>
    <div className='bg-base-200 h-screen flex flex-col text-xl'>

        <div className="hero min-h-max bg-base-200">

            <div className="hero-content lg:pb-8 lg:pt-16 text-center">
                <div>
                    <h1 className="text-5xl font-bold">La App de encuestas UAM!</h1>
                    <p className="py-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non quam lacus suspendisse faucibus interdum posuere. Facilisis leo vel fringilla est ullamcorper eget. Curabitur gravida arcu ac tortor. Habitasse platea dictumst quisque sagittis purus sit amet. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet non. Pellentesque elit eget gravida cum. Amet risus nullam eget felis eget nunc lobortis. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Felis donec et odio pellentesque diam volutpat commodo sed egestas. </p>
                </div>
            </div>
        </div>

        <div className="hero min-h-max bg-base-300 pt-8 pb-16">

            <div className="hero-content flex-col lg:flex-row">
                <img src={ uamiPrecovid } 
                     alt="Fotografía de las intalaciones de la UAM Iztapalapa"
                     className="md:w-full overflow-hidden rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">Objetivo</h1>
                    <p className="py-6">Nuestro objetivo es que abran las materias que los estudiantes desean. ¿Alguna vez te has quedado sin poder inscribir una UEA porque no la abrieron? Vota por las que deseas y logra un cambio en la universidad.</p>
                    <Link className='btn btn-primary' to="/Login">Realizar la encuesta</Link>    
                </div>
            </div>
        </div>

    </div>
  </>



  )
}