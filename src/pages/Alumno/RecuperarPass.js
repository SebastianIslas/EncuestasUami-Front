import {useRef, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from '../../components/common/Button'
import CardLogin from '../../components/SignUp/CardLogin.js'
import InfoLogin from '../../components/SignUp/InfoLogin.js'
import InputLogin from '../../components/SignUp/InputLogin.js'
import InputPassword from '../../components/SignUp/InputPassword.js'
import SelectSignIn from '../../components/SignUp/SelectSignIn.js'
import { AuthContextAlumnos } from '../../context/AuthContextAlumnos.js'
import {createCuenta, enviarCodigo, cambiarPass} from '../../services/auth/signUp.js'

export default function RecuperarPass() {
    const inputRefCodigo = useRef(null);
    const inputRefMatricula = useRef(null);
    const inputRefPsswrd = useRef(null);
    const inputRefPsswrdC = useRef(null);
    const {user} = useContext(AuthContextAlumnos);
    const navigate = useNavigate();

    const sendCode = () => {
        let errors
        if(! inputRefMatricula.current.value){
            errors = true
        }
       
        if(! errors){
            console.log(inputRefMatricula.current.value)
            enviarCodigo(inputRefMatricula.current.value).then((code) =>{
                console.log(code)
                if(code.status >= 200 && code.status < 300){
                    alert('Hemos enviado un codigo al correo registrado para esta matricula')
                }else{
                    alert("No se ha encontrado correo asociado a esta matricula")
                }
            })
        }else{
            alert('Ingresa la matricula')
        }
    }

    const changePass = () => {
        let errors
        if(! inputRefMatricula.current.value || ! inputRefPsswrdC.current.value
            || inputRefPsswrd.current.value !== inputRefPsswrdC.current.value){
            errors = true
        }
        
        if(! errors){
            console.log(inputRefMatricula.current.value, inputRefPsswrd.current.value)
            cambiarPass(inputRefPsswrd.current.value,  inputRefMatricula.current.value, inputRefCodigo.current.value).then((code) =>{
                console.log(code)
                if(code.status >= 200 && code.status < 300){
                    alert('Se ha cambiado la contraseña correctamente')
                    navigate('/login')
                }else{
                    alert("Ha ocurrido un error al cambiar la contraseña")
                }
            })
        }else{
            alert('Las contraseñas no coinciden o el codigo es incorrecto')
        }
    }

    useEffect(() => {
        if(user.authToken)
            navigate('/encuesta')
    }, [user])

    return (
        <CardLogin>
            <p className="text-2xl text-center">Recuperar Contraseña</p>
            <p className="text-xs font-normal text-slate-500 pt-2">1. Escribe tu matricula y da click en el boton de 'Enviar codigo'" </p>
            <p className="text-xs font-normal text-slate-500 pt-2">2. Escribe tu nueva contraseña y el codigo que te enviaremos al correo asociado a tu matricula"</p>
            <InputLogin name="Matrícula" inputRef={inputRefMatricula} placeHolderText="2202020201" />
            <InputLogin name="Codigo" inputRef={inputRefCodigo} placeHolderText="Ingresa tu codigo" />
            <InputPassword name="Nueva contraseña"  inputRef={inputRefPsswrd} placeHolderText="Ingresar nueva contraseña" />
            <InputPassword name="Confirmar nueva contraseña"  inputRef={inputRefPsswrdC} placeHolderText="Confirmar nueva contraseña"  />
            <Button onClick={sendCode} text={"Enviar codigo"} />
            <Button onClick={changePass} text={"Cambiar contraseña"} />
        </CardLogin>
    );
}
