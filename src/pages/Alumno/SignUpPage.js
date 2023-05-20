import {useRef, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import ButtonLogin from '../../components/SignUp/ButtonLogin.js'
import CardLogin from '../../components/SignUp/CardLogin.js'
import InfoLogin from '../../components/SignUp/InfoLogin.js'
import InputLogin from '../../components/SignUp/InputLogin.js'
import InputPassword from '../../components/SignUp/InputPassword.js'
import SelectSignIn from '../../components/SignUp/SelectSignIn.js'
import { AuthContextAlumnos } from '../../context/AuthContextAlumnos.js'
import {createCuenta} from '../../services/auth/signUp.js'

export default function SignUpPage() {
    const inputRefCorreo = useRef(null);
    const inputRefMatricula = useRef(null);
    const inputRefPsswrd = useRef(null);
    const inputRefPsswrdC = useRef(null);
    const inputRefLic = useRef(null);
    const {login, user} = useContext(AuthContextAlumnos);
    const navigate = useNavigate();

    const handleSubmit = () => {
        let errors
        if(! inputRefCorreo.current.value){
            errors = true
        }
        if(! inputRefMatricula.current.value){
            errors = true
        }
        if(! inputRefLic.current.value){
            errors = true
        }
        if(! inputRefPsswrd.current.value){
            errors = true
        }
        if(! inputRefPsswrdC.current.value){
            errors = true
        }

        if(inputRefPsswrd.current.value !== inputRefPsswrdC.current.value){
            errors = true
        }
        
        if(! errors){
            console.log(inputRefCorreo.current.value, inputRefMatricula.current.value, inputRefLic.current.value, inputRefPsswrd.current.value)
            createCuenta(inputRefCorreo.current.value, inputRefPsswrd.current.value,  inputRefMatricula.current.value, inputRefLic.current.value).then((code) =>{
                console.log(code)
                if(code.status >= 200 && code.status < 300){
                    alert('Confirme el enlace que hemos enviado a su correo para terminar el registro.')
                    navigate('/login')
                }else{
                    alert("Ha ocurrido un error al crear la cuenta")
                }
            })
        }else{
            alert('Los datos no son validos para crear una cuenta')
        }
    }

/*
    useEffect(() => {
        if(user.authToken)
            navigate('/encuesta')
    }, [user])
*/
    return (
        <CardLogin>
            <p className="text-2xl text-center">Registrarse</p>
            <InputLogin name="Matrícula" inputRef={inputRefMatricula} placeHolderText="2202020201" />
            <InputLogin name="Correo" inputRef={inputRefCorreo} placeHolderText="2202020201@titlani.uam.mx" />
            <SelectSignIn name="Licenciatura"  inputRef={inputRefLic}/>
            <InputPassword name="Contraseña"  inputRef={inputRefPsswrd} placeHolderText="30122000" />
            <InputPassword name="Confirmar contraseña"  inputRef={inputRefPsswrdC} placeHolderText="30122000"  />
            <InfoLogin text="Se recomienda ampliamente usar el correo institucional." />
            <ButtonLogin onClick={handleSubmit} />
        </CardLogin>
    );
}
