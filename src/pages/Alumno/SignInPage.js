import {useRef, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import ButtonLogin from '../../components/SignIn/ButtonLogin.js'
import CardLogin from '../../components/SignIn/CardLogin.js'
import InfoLogin from '../../components/SignIn/InfoLogin.js'
import InputLogin from '../../components/SignIn/InputLogin.js'
import InputPassword from '../../components/SignIn/InputPassword.js'
import SelectSignIn from '../../components/SignIn/SelectSignIn.js'
import { AuthContextAlumnos } from '../../context/AuthContextAlumnos.js'
import {createCuenta} from '../../services/auth/signIn.js'

export default function SignInPage() {
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
            createCuenta(inputRefCorreo.current.value, inputRefPsswrd.current.value,  inputRefMatricula.current.value, inputRefLic.current.value).then((data) =>{
                console.log(data)
                if(! data.errorContent){
                    alert('Se ha creado su usuario')
                    navigate('/login')
                }else{
                    alert("Ha ocurrido un error")
                }
            })
        }else{
            alert('Los datos no son validos para crear una cuenta')
        }
    }

    useEffect(() => {
        if(user.authToken)
            navigate('/encuesta')
    }, [user])

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
