import React from 'react'

export default function NavBar() {
  return (
    <div className='flex justify-between items-center h-24 max-w-[1280px] mx-auto px-4'>
        <h1 className='w-full text-3xl font-bold text-[#0da308]'>Encuestas UAMI</h1>
        <ul className='flex'>
           <li className='p-4'>Estadísticas</li>
           <li className='p-4'>Iniciar Encuesta</li>
           <li className='p-4'>UEAs Abiertas</li> 
        </ul>
    </div>
  )
}
