import React, {useState} from 'react';
//import {useAuth} from '../hooks/useAuth.js'


export const ModalContext = React.createContext(null);


export const ModalProvider = props => {
  console.log('ModalProvider', props);
  const [modalData,setModalData] = useState(props.initialModalData)

  return (
    <ModalContext.Provider
      value={[
        modalData,
        setModalData,
      ]}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
