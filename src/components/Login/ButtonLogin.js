export default function ButtonLogin(props) {
    return (  
    <div className="flex justify-end">
        <input type="button" value="Iniciar" className="btn btn-primary" onClick={props.onClick}/>
    </div>
    );
}