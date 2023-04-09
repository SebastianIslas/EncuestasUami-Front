
import React from 'react'

import { Link } from "react-router-dom";
import Button from './Button';
import { faEye, faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RowOptions(props) {
  return (
    <>
    {/*Opciones de cada row dentro de la tabla */}
    <div className='flex justify-end gap-6'>
      {props.objeto.btnVer ? (
      //Agregar url en key btnVer=`/admin/licenciatura/${props.licenciatura.clave}`
        <Link to={props.objeto.btnVer}>
          <Button text={<FontAwesomeIcon icon={faEye} />} />
        </Link>
      ) : null}
      {/*Intente pasar el objeto completo para dejarlo mas genero y definir en el toogle que hacer si existia el atributo
      pero no salio */}
      <Button text={<FontAwesomeIcon icon={faEdit} />} onClick={() => {
          props.toggleModal(props.objeto.clave, props.objeto.nombre, props.objeto.tipo)
        }          
      } />
      <Button text={<FontAwesomeIcon icon={faTrashCan} />} onClick={() => {
          props.toggleModalConfirmacion(props.objeto.clave, props.objeto.nombre)
      }} />


    </div>
    </>
  )
}
