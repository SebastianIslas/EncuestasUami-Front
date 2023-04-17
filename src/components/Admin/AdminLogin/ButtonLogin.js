export default function ButtonLogin(props) {
    return (  
    <div className="flex justify-end">
        <input type="button" value="Iniciar" onClick={props.onClick} className="btn btn-accent" />
    </div>
    );
}