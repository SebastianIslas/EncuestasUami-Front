import React, {useState} from 'react';
import ContainerOpciones from "../components/common/modal/ContainerOpciones";


export const ModalContext = React.createContext(null);


export const ModalProvider = props => {
  const [modalData, setModalData] = useState(props.initialModalData);
  //Sirve para recorrer modalData sin obtener las keys por parametro de nuevo en funciones
  const [keys, setKeys] = useState(Object.keys(modalData)); 

  const [showModal, setShowModal] = useState({    
    agregar: false,
    opciones: false,
    confirmacion: false
  });

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
      //Algunas propiedades del objeto modalData se inicializaron con null y otras con "". No se estandarizaron por flojera.
      if (modalData[key] == "" || modalData[key] == null){  
        return true;
      }
    }
    return false;
  }

  //Cambia estilo de los botones del modal según las opciones elegidas por el usuario.
  // Considera la propiedad (modalidad o horario) y su valor.
  const handleClassBtnModal = (propiedad, valor) =>{
  //Activar o desactivar el boton si la opción en esa propiedad ha sido elegida
    if (modalData[propiedad] === valor){
      return "btn btn-active btn-accent";
    } else {
      return "btn btn-active btn-ghost";
    }
  }

  //Para el modal que recibe valores de una tabla (si no usa modalData solo llamar onClick={()=>setShowModal(!showModal)} en el button)
  const toggleModal = (values, modalName) => {
    if (!showModal[modalName]){
      let newObject = {};
      for (let i = 0; i < keys.length; i++) {
        newObject[keys[i]] = values[i];   //Crea nuevo objeto key: value con las mismas keys de initialModalData
      }
      setModalData(newObject);
    }
    showModal[modalName] = true;
  }

  const renderContainerOpciones = (texts) => {
    //Dejar mensajes en el mismo orden en que se define el modalData en initialModalData
    const Inputs = [];
    for (let i = 0; i < texts.length; i++) {
      Inputs.push(
        <ContainerOpciones key={keys[i]} text={texts[i]} prop={keys[i]}
        />
      );
    }
    return Inputs;
  }

  const cleanModalData = () => {
    setModalData(props.initialModalData);
  }

  return (
    <ModalContext.Provider
      value={{
        modalData, setModalData,
        showModal, setShowModal,
        handleBtnAceptar,
        changePropModal,
        handleClassBtnModal,
        renderContainerOpciones,
        toggleModal,
        cleanModalData
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};