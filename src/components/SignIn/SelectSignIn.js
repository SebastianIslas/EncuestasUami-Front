export default function SelectSignIn(props) {
    return (   
        <div className="form-control">
            <label className="label">
                <span className="label-text">{props.name}</span>
            </label> 
            <select className="select select-bordered w-full max-w-xs" ref={props.inputRef}>
                <option disabled selected hidden>Seleccione</option>
                <option value={30}>Computación</option>
                <option value={22}>Ingenieria Biomedica</option>
                <option value={27}>Ingenieria Electronica</option>
                <option value={44}>Extra</option>
            </select>
        </div>      
    );
}