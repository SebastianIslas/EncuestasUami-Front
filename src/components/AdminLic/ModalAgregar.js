// TODO: separar los botones en más componentes
import React, {useState} from "react";

import Modal from "../Modal";
import BtnCancelar from "../../components/BtnCancelar";
import ContainerOpciones from "./ContainerOpciones";

//Services
import { addUEAtoLic } from "../../services/licenciaturas/addUea.js";
import { getLicNameByClave } from "../../services/licenciaturas/getLicNameByClave";


function ModalAgregar({
  setShowModalAgregar,
  materias,
  setMaterias,
  cursosLic,
  setCursosLic,
  claveLic
}) {
  
  const [modalData,setModalData] = useState({
    clave: "",
    nombre: ""
  })
  //** Lista cursos, opc seleccionada */
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    setSelectedValue(event.target.value);
  };

  const closeModal = (e) => {
    // Verficamos que el boton con el que se llama no es el de "Cerrar"
    if (e.target.className !== "btn btn-sm btn-circle"){
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
      }
    }
    // Cerramos el modal
    setShowModalAgregar(false);
  }

  const handleClassBtnModal = (propiedad, valor) => {
    // Si la opción en esa propiedad ha sido elegida activamos el botón
    if (modalData[propiedad] === valor){
      return "btn btn-active btn-accent";
    // Desactivamos el botón si no está elegida esa opción
    } else {
      return "btn btn-active btn-ghost";
    }
  }
  

  // Función que permite cambiar dentro del modal los valores de cada propiedad
  // o campo relacionado con la encuesta
  const changePropModal = (propiedad, valor) => {

    let copyObjectModalData = {...modalData};
    copyObjectModalData[propiedad] = valor;
    setModalData(copyObjectModalData);
  
  }


  return (
    <Modal>
      {/* Div que cubre toda la pantalla del modal */}
      <div className="fixed bg-black/80 w-full h-screen z-50 pt-10">
      {/* Div que contiene la ventana del modal */}
      <div className="modal-box bg-base-300 mx-auto">
        {/* Botón cerrar/cancelar */}
        <div className="absolute right-2 top-2">
          <BtnCancelar functionOnClick={closeModal} />
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
          <label className="btn btn-primary"
                    onClick={closeModal}>Agregar</label>
        </div>
      </div>
      </div>
    </Modal>
  )
}

export default ModalAgregar
