import React from 'react'

export default function RowOptions(props) {
    
  return (
    <>
    {/*Opciones de cada row dentro de la tabla */}
    <div className='flex justify-end gap-6'>
                
        {/*Este botón lo que hará es mandar un link con la id de la lic para verla*/}
        <button className="btn btn-primary
                            btn-xs sm:btn-sm md:btn-md
                            before:content-['Ver']
                            md:before:content-['Ver']
                            w-8 md:w-24 right-0"
        ></button>

                
        {/* Este boton despliega un modal para cambiar el nombre de la uea*/}
        <button className="btn btn-primary
                            btn-xs sm:btn-sm md:btn-md
                            before:content-['Edit']
                            md:before:content-['Editar']
                            w-8 md:w-24 right-0"
                            onClick={() => {
                                props.toggleModal(props.licenciatura.clave, props.licenciatura.nombre)
                            }}
        ></button>

        <button className="btn btn-primary
                            btn-xs sm:btn-sm md:btn-md
                            before:content-['Elim']
                            md:before:content-['Eliminar']
                            w-8 md:w-24 right-0"
                            onClick={() => {
                                props.toggleModalConfirmacion(props.licenciatura.clave, props.licenciatura.nombre)
                            }}
        ></button>

    </div>
    </>
  )
}
