import React from 'react'

import { Link } from "react-router-dom";
import Button from '../../components/Button';
import { faEye, faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RowOptions(props) {
    
  return (
    <>
    {/*Opciones de cada row dentro de la tabla */}
    <div className='flex justify-end gap-6'>

        <Button text={<FontAwesomeIcon icon={faEdit} />} onClick={() => {
            props.toggleModal(props.curso.clave, props.curso.nombre, props.curso.tipo)
          }          
        } />
        <Button text={<FontAwesomeIcon icon={faTrashCan} />} onClick={() => {
            props.toggleModalConfirmacion(props.curso.clave, props.curso.nombre)
        }} />


    </div>
    </>
  )
}
