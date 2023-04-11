import React, {useState, useContext} from "react";

import Modal from "../common/modal/Modal";
import BtnCancelar from "../common/BtnCancelar";
import Button from '../../components/common/Button';
import { ModalContext } from "../../context/modalContext";

//Services
import { addUEAtoLic } from "../../services/licenciaturas/addUea.js";
import { getLicNameByClave } from "../../services/licenciaturas/getLicNameByClave";
import { getCursos } from "../../services/cursos/getCursos";


function ModalAgregar({setCursosLic, claveLic}) {
  const [materias, setMaterias] = useState([]); //Lista de cursos completa para agregar a la lic.
  const {showModal, setShowModal} = useContext(ModalContext);
  //** Opc seleccionada de la lista de cursos */
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
//    console.log(event.target.value);
//    console.log(event.target.name);
    setSelectedValue(event.target.value);
  };

  const fetch = () => {
    if(selectedValue == ""){
      alert("No se ha seleccionado algun curso");
    }else{
      addUEAtoLic(selectedValue, claveLic).then(res => {
        if (res.status == 200) {
          getLicNameByClave(claveLic).then(lic =>{
            setCursosLic(lic.cursos);
          });
          return res.json();
        }
      }).then(res => {  //Msg error o exito
        alert(res.message)
      });
      console.log("AGREGO UEA");
      console.log(selectedValue);
      setShowModal({...showModal, agregar: false}); // Cerramos el modal
    }
  }

  return (
    <React.Fragment>
      <div className="fixed bottom-4 left-4">
        <Button text={"Agregar UEA"} onClick={() => {
          getCursos().then(setMaterias)
          setShowModal({...showModal, agregar: true})
        }}/>
      </div>
      {showModal.agregar ? 
      <Modal>
        {/* Div que cubre toda la pantalla del modal */}
        <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
        {/* Div que contiene la ventana del modal */}
        <div className="modal-box bg-base-300 mx-auto">
          {/* Botón cerrar/cancelar */}
          <div className="absolute right-2 top-2">
            <BtnCancelar functionOnClick={() => setShowModal({...showModal, agregar: false})} />
          </div>

          <div className="form-control">
            <label htmlFor="dropdown" className="text-xl pb-2">Selecciona el curso a agaregar:</label>
            <select id="dropdown" value={selectedValue} onChange={handleChange} className="bg-base-300 text-white p-2 rounded-lg text-base">
              <option value="">UEA</option>
              {materias.map (materia => 
                <option value={materia.clave} key={materia.clave}>{materia.nombre}</option>
              )}
            </select>
          </div>

          <div className="modal-action text-right">
            {/* Botón que guarda las opciones elegidas por propiedad y luego cierra el modal */}
            <Button onClick={fetch} text={"Agregar"} />

          </div>
        </div>
        </div>
      </Modal>
      : null}
    </React.Fragment>
  )
}

export default ModalAgregar
