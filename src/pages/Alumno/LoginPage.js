import ButtonLogin from '../../components/Login/ButtonLogin.js'
import CardLogin from '../../components/Login/CardLogin.js'
import InfoLogin from '../../components/Login/InfoLogin.js'
import InputLogin from '../../components/Login/InputLogin.js'

export default function LoginPage() {
    return (
        <CardLogin>
            <p className="text-2xl text-center">Iniciar Sesión</p>
            <InputLogin name="Matrícula" placeHolderText="2202020201" />
            <InputLogin name="Fecha de nacimiento" placeHolderText="30122000" info={<InfoLogin text="La contraseña es tu fecha de nacimiento con el formato: DDMMAAAA" />} />
            <ButtonLogin />
        </CardLogin>
    );
}
