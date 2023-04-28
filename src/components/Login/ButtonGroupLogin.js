export default function ButtonGroupLogin(props) {
    return (  
    <div className="flex justify-between">
        <input type="button" value="Registrarse" className="btn btn-accent" onClick={props.onClickSign}/>
        <input type="button" value="Iniciar" className="btn btn-primary" onClick={props.onClickLogin}/>
    </div>
    );
}