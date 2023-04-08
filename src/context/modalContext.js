import React, {useState} from 'react';
//import {useAuth} from '../hooks/useAuth.js'


export const ModalContext = React.createContext(null);


export const ModalProvider = props => {
  console.log('ModalProvider', props);
  const [modalData, setModalData] = useState(props.initialModalData)


  // Función que permite cambiar dentro del modal los valores de cada propiedad
  // o campo relacionado con la encuesta
  const changePropModal = (propiedad, valor) =>{
    let copyObjectModalData = {...modalData};

    copyObjectModalData[propiedad] = valor;
    setModalData(copyObjectModalData);
  }

  // Dentro del modal, si no se han elegido las dos propiedades que se piden no
  // se deja pulsar el botón de guardar opciones elegidas.
  const handleBtnAceptar = () =>{
    for (const key in modalData) {
      //Habia modalData con null y otros con "" inicializados, me dio flojera poner todos igual
      if (modalData[key] == "" || modalData[key] == null){  
        return true;
      }
    }
    return false;
  }


  // Función para cambiar el estilo de los botones del modal dependiendo si
  // están dentro de las opciones elegidas anteriormente por el usuario. Se
  // basa en tomar una propiedad (modalidad o horario) y también considera el
  // valor de esa proiedad
  const handleClassBtnModal = (propiedad, valor) =>{
    // Si la opción en esa propiedad ha sido elegida activamos el botón
      if (modalData[propiedad] === valor){
        return "btn btn-active btn-accent";
      // Desactivamos el botón si no está elegida esa opción
      } else {
        return "btn btn-active btn-ghost";
      }
    }

  return (
    <ModalContext.Provider
      value={{
        modalData,
        setModalData,
        handleBtnAceptar,
        changePropModal,
        handleClassBtnModal,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
