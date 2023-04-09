import React from "react";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


///Solo busca en 2 columnas (recibe el nombre de las key del objeto datos)
export const filteredData = (datos, query, keys) => {
  const filteredData = Object.keys(datos).filter((key) => {
    const dato = datos[key];
    return (
      //Se hace esto por que por ejemplo la clave en profesores es claveEmpleado
      dato[keys[0]].toLowerCase().includes(query.toLowerCase()) || //Nombre
      dato[keys[1]].toString().includes(query.toLowerCase())       //Clave
    );
  }).map((key) => datos[key]);
  return filteredData;
}


export default function Buscador({query, setQuery}) {
  return (  
    <div className="relative w-full mb-4">
      <input type="text" className="w-full input input-bordered"
        placeholder="Buscar"
        value={query}
        onChange={(event)=>{
          setQuery(event.target.value)
        }}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
      </div>
    </div>
  );
}