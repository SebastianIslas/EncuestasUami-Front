export default function InputLogin(props) {
    return (   
        <div className="form-control">
            <label className="label">
                <span className="label-text">{props.name}</span>
            </label> 
            <input type="text" ref={props.inputRef} placeholder={props.placeHolderText} className="input input-bordered placeholder-shown:italic" />
                {props.info}
        </div>      
    );
}