import React from "react";
import {useState} from "react";

function ContainerOpciones({
  text,
  prop,
  inputValue,
  changePropModal,
  modalData,
  setModalData
}){
  const [valueContent, setValueContent] = useState(inputValue);

  return (<div>
    <p className="text-xl pb-2">
      {text}</p>

      {/* POR EL MOMENTO NO SIRVE DE NA' */}
      <div className="form-control">
            <label className="label">
                <span className="label-text">{prop.name}</span>
            </label> 
            <input type="text" 
                placeholder={prop.placeHolderText} 
                value={valueContent} 
                onChange={(e)=>{setValueContent(e.target.value)
                                changePropModal(modalData, setModalData, prop, e.target.value)
                                }} 
                className="input input-bordered" />
                {prop.info}
        </div>    


    <br/>

  </div>)
}

export default ContainerOpciones
