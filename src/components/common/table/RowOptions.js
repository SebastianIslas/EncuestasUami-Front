import React, { useContext } from "react";

import { Link } from "react-router-dom";
import Button from '../Button';
import { faEye, faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalContext } from "../../../context/modalContext";

export default function RowOptions({objeto}) {

  const {toggleModal} = useContext(ModalContext);

  return (
    <>
    {/*Opciones de cada row dentro de la tabla */}
    <div className='flex justify-end gap-6'>
      {objeto.btnVer ? (
      //Agregar url en key btnVer=`/admin/licenciatura/${props.licenciatura.clave}`
        <Link to={objeto.btnVer}>
          <Button text={<FontAwesomeIcon icon={faEye} />} />
        </Link>
      ) : null}
      {/*Intente pasar el objeto completo para dejarlo mas genero y definir en el toogle que hacer si existia el atributo
      pero no salio */}
      <Button text={<FontAwesomeIcon icon={faEdit} />} onClick={() => {
          toggleModal([objeto.clave, objeto.nombre, objeto.tipo], "opciones")
        }
      } />
      <Button text={<FontAwesomeIcon icon={faTrashCan} />} onClick={() => {
          toggleModal([objeto.clave, objeto.nombre], "confirmacion")
        }} />


    </div>
    </>
  )
}
