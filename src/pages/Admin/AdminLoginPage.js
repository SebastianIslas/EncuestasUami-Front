import ButtonLogin from '../../components/AdminLogin/ButtonLogin.js'
import CardLogin from '../../components/AdminLogin/CardLogin.js'
import InfoLogin from '../../components/AdminLogin/InfoLogin.js'
import InputLogin from '../../components/AdminLogin/InputLogin.js'

export default function LoginPage() {
    return (
        <CardLogin>
            <p className="text-2xl text-center">Iniciar Sesión de Administrador</p>
            <InputLogin name="ID" placeHolderText="2202020201" />
            <InputLogin name="Contraseña" placeHolderText="passw0rd" info={<InfoLogin text="En caso de olvidar la contraseña comuníquese con el Sysadmin del equipo de encuestas UAM" />} />
            <ButtonLogin />
        </CardLogin>
    );
}
