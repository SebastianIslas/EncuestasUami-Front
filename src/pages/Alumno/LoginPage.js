import {useRef, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import ButtonGroupLogin from '../../components/Login/ButtonGroupLogin.js'
import CardLogin from '../../components/Login/CardLogin.js'
import InfoLogin from '../../components/Login/InfoLogin.js'
import InputLogin from '../../components/Login/InputLogin.js'
import InputPassword from '../../components/Login/InputPassword.js'
import { AuthContextAlumnos } from '../../context/AuthContextAlumnos.js'

export default function LoginPage() {
    const inputRefCorreo = useRef(null);
    const inputRefPsswrd = useRef(null);
    const {login, state} = useContext(AuthContextAlumnos)
    const navigate = useNavigate();

    const handleSubmit = () => {
        login(inputRefCorreo.current.value, inputRefPsswrd.current.value)
    }

    const handleRedirect = () => {
        navigate('/sign')
    }

    useEffect(() => {
        if(state.isLoggedIn)
            navigate('/encuesta')
    }, [state])

    return (
        <CardLogin>
            <p className="text-2xl text-center">Iniciar Sesión</p>
            <InputLogin name="Correo" inputRef={inputRefCorreo} placeHolderText="2202020201@titlani.uam.mx" />
            <InputPassword name="Contraseña"  inputRef={inputRefPsswrd} placeHolderText="30122000" info={<InfoLogin text="La contraseña inicial es tu fecha de nacimiento con el formato: DDMMAAAA" />} />
            <ButtonGroupLogin onClickLogin={handleSubmit} onClickSign={handleRedirect}/>
        </CardLogin>
    );
}
