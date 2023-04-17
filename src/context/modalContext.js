import React, {useState} from 'react';
import ContainerOpciones from "../components/common/modal/ContainerOpciones";


export const ModalContext = React.createContext(null);


export const ModalProvider = props => {
  const [modalData, setModalData] = useState(props.initialModalData);
  const [keys, setKeys] = useState(Object.keys(modalData)); //Sirve para poder recorrer modalData sin obtener las keys por parametro de nuevo en funciones

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
      //Habia modalData con null y otros con "" inicializados, me dio flojera poner todos igual
      if (modalData[key] == "" || modalData[key] == null){  
        return true;
      }
    }
    return false;
  }


  // Cambiar estilo de los botones del modal dependiendo si
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

  //Para el modal que recibe valores de una tabla (si no usa modalData solo llamar onClick={()=>setShowModal(!showModal)} en el button)
  const toggleModal = (values, modalName) => {
  //  console.log(values, modalName);
    if (!showModal[modalName]){
      let newObject = {};
      for (let i = 0; i < keys.length; i++) {
        newObject[keys[i]] = values[i];   //Crea nuevo objeto key: value con las mismas keys de initialModalData
      }
      setModalData(newObject);
    }
    showModal[modalName] = true;
//    console.log("Final", showModal);
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