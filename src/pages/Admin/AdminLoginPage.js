import {useRef, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import ButtonLogin from '../../components/AdminLogin/ButtonLogin.js'
import CardLogin from '../../components/AdminLogin/CardLogin.js'
import InfoLogin from '../../components/AdminLogin/InfoLogin.js'
import InputLogin from '../../components/AdminLogin/InputLogin.js'
import InputPassword from '../../components/AdminLogin/InputPassword.js'
import { AuthContext } from '../../context/AuthContext.js'

export default function LoginPage() {
    const inputRefID = useRef(null);
    const inputRefPsswrd = useRef(null);
    const {login, user} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSubmit = () => {
        
        login(inputRefID.current.value, inputRefPsswrd.current.value)

    }

    useEffect(() => {
        if(user.authToken)
            navigate('/admin')
    }, [user])

    return (
        <CardLogin>
            <p className="text-2xl text-center">Iniciar Sesión de Administrador</p>
            <InputLogin name="ID" inputRef={inputRefID} placeHolderText="2202020201" />
            <InputPassword name="Contraseña" inputRef={inputRefPsswrd} placeHolderText="passw0rd" info={<InfoLogin text="En caso de olvidar la contraseña comuníquese con el Sysadmin del equipo de encuestas UAM" />} />
            <ButtonLogin onClick={handleSubmit} />
        </CardLogin>
    );
}
