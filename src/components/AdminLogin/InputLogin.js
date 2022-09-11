export default function InputLogin(props) {
    return (   
        <div className="form-control">
            <label className="label">
                <span className="label-text">{props.name}</span>
            </label> 
            <input type="text" placeholder={props.placeHolderText} className="input input-bordered" />
                {props.info}
        </div>       
    );
}