import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Buscador({query, handleInputChange}) {
  return (  
    <div className="relative w-full mb-4">
      <input type="text" className="w-full input input-bordered"
        placeholder="Buscar"
        value={query}
        onChange={handleInputChange}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
      </div>
    </div>
  );
}