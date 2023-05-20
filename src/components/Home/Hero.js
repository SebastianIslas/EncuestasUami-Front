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
                    <p className="py-6">
                    ¡Hola estudiantes de UAM-Iztapalapa <br/>
                    ¡Queremos escuchar tu voz y saber qué cursos te gustaría tomar en el próximo trimestre! Tu opinión es muy importante para nosotros y nos ayudará a diseñar una oferta académica que se ajuste a tus intereses y necesidades.
                    </p>
                    <p className="py-6">
                    Te invitamos a contestar nuestra encuesta de cursos, donde podrás seleccionar los cursos que más te llamen la atención y compartir tus preferencias. Tu participación es anónima y solo tomará unos minutos completarla.
                    Agradecemos de antemano tu colaboración y esperamos contar con tu valiosa opinión. 
                    </p>
                    <p className="py-6">
                    ¡Esperamos recibir tus respuestas y ayudarte a tener una experiencia educativa excepcional
                    </p>
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