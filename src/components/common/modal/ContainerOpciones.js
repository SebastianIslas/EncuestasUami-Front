import React from "react";
import {useState, useContext} from "react";
import { ModalContext } from "../../../context/modalContext";

function ContainerOpciones({
  text,
  prop,
  placeHolderText,
  info
}){
  const {modalData, changePropModal} = useContext(ModalContext);
  const [valueContent, setValueContent] = useState(modalData[prop]);
  console.log("prop", prop, modalData[prop]);

  return (<div>
    <p className="text-xl pb-2">
      {text}</p>

      <div className="form-control">
          <input type="text" 
              placeholder={placeHolderText} 
              value={valueContent} 
              onChange={(e)=>{
                setValueContent(e.target.value)
                changePropModal(prop, e.target.value)
              }} 
              className="input input-bordered" />
              {info}
        </div>    


    <br/>

  </div>)
}

export default ContainerOpciones