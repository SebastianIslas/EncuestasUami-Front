import React, { useEffect, useState } from "react";

import Button from '../../components/common/Button';
import HeaderEncuesta from '../../components/Encuesta/HeaderEncuesta';
import InfoEncuesta from "../../components/Encuesta/InfoEncuesta";
import TablaMateriasEncuesta from "../../components/Encuesta/TablaMateriasEncuesta";
import EncuestaResuelta from "../../components/Encuesta/EncuestaResuelta";
import HomeHeader from "../../components/HomeHeader";
import ModalConfirmacion from "../../components/Encuesta/ModalConfirmacion";

// Services
import { getUEASByLic } from "../../services/licenciaturas/getUeasByLic";
import { consultarEncuestaActiva } from "../../services/encuestas/consultarEncuestaActiva";
import { enviarEncRes } from "../../services/encuestas/enviarEncRes";
import { getLastEncRes } from "../../services/encuestas/getLastEncRes";

function EncuestaPage() {
  let user = Object();
  user.matricula = 2183011316;
//  user.matricula = 2183012662;
//  user.matricula = 2183011630;

  user.licenciatura = "Computación";
  user.claveLic = 30;

  // Variables de materias máximas que se pueden elegir
  const [maxMaterias, setMaxMaterias] = useState(0);
  // Lista de las materias de la licenciatura
  const [materias, setMaterias] = useState([]);
  // Lista de las materias elegidas
  const [materiasEncuesta, setMateriasEncuesta] = useState({});
  // Variable para el id de la encuesta
  const [periodoEnc, setPeriodoEnc] = useState("");
  // Variable para encuesta resuelta
  const [encRes, setEncRes] = useState(null);
  // Variable para modal enviar encuesta
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
  
  
  useEffect(() => {
    document.title = "UEA Encuestas UAMI";

    // Se cargan las materias, y el MaxdeMaterias
    consultarEncuestaActiva().then((res)=>{
      if(res.activo == false){
        window.location.href = "/"; //Mandar a home o estadisticas
      } else{
        if(!isEncRes(res.periodo)){
          setMaxMaterias(res.maxMaterias);
          getUEASByLic(user.claveLic).then(setMaterias);
//          console.log("materias", materias);
          setPeriodoEnc(res.periodo);  
        }
      }
    });
  }, []);

  // TODO: Pruebas de las estructuras que tenemos para enviar
  useEffect(() => {
    console.log(materiasEncuesta);
  }, [materiasEncuesta]);

  const isEncRes = (periodo) => {
    getLastEncRes(periodo, user.matricula).then((response)=>{
      if(response.encuesta){  //Ya contesto la encuesta
        setEncRes(response);
        return true;
      } else{                 //Mostrar vista para conestar encuesta
        setEncRes(null);
        return false;
      }
    });
  }

  const handleBtnEnviar = () =>{
    if(Object.keys(materiasEncuesta).length == 0){
      return true;
    }else{
      return false;
    }
  }

  return (
    <React.Fragment>
      <HomeHeader/>
      <div className="bg-base-200">
        <div className="min-h-screen bg-base-200 max-w-4xl container px-2 md:px-10 mx-auto">
            <HeaderEncuesta user={user} periodoEnc={periodoEnc}/>
            {!encRes ?
              <div>
                <InfoEncuesta maxMaterias={maxMaterias} />
                <TablaMateriasEncuesta materias={materias} 
                                      maxMaterias={maxMaterias} 
                                      materiasEncuesta={materiasEncuesta}
                                      setMateriasEncuesta={setMateriasEncuesta}
                />
                <div className="fixed bottom-4 left-4">
                  <Button onClick={()=>{setShowModalConfirmacion(true)}} 
                          disabled={handleBtnEnviar()} text={"Enviar encuesta"} />
                </div>
                <ModalConfirmacion  periodoEnc={periodoEnc}
                                    user = {user}
                                    isEncRes = {isEncRes}
                                    materiasEncuesta = {materiasEncuesta}
                                    showModalConfirmacion={showModalConfirmacion} 
                                    setShowModalConfirmacion={setShowModalConfirmacion}
                />
              </div>
              :<EncuestaResuelta periodoEnc={periodoEnc} encRes={encRes}/>
            }
        </div>
      </div>
    </React.Fragment>

  );
}

export default EncuestaPage
