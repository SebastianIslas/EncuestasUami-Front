import { useState } from 'react';
import { useUser } from './useUser';
import {fetchLoginAlumnos, loginAlumnos} from '../services/auth/login.js'

const initialState = {
    isLoggedIn: false,
    isLoginPending: true,
    loginError: null
}

export const useAuthAlumnos = () => {

  const [state, setState] = useState(initialState);
  const { user, addUser, loadUser, removeUser } = useUser('usuario')

  const login = async (email, password) => {
    const dataRes = await loginAlumnos(email, password);
    if (dataRes.token) {
      addUser({
          matricula: 2183011316,
          nombre: 'alumno',
          email: email,
          authToken: dataRes.token
      })
      setState({...state, isLoggedIn: true, isLoginPending: false})
    } else {
      setState({...state, loginError: dataRes.message})
    }
  }

  const verifyAuth = () => {
    const userLocal = loadUser()
    if (! userLocal?.authToken ) {
      setState({...state, isLoggedIn: false, isLoginPending: false})
      return
    }
    //setLoginPending(false);
    //setLoginSuccess(true);
    setState({...state, isLoggedIn: true, isLoginPending: false})
    /*
    try {
      const res = await fetch('/api/auth'); //Peticion para verificar el token
    } catch (err) {
      console.error(err);
      logout() // Se elimna usuario
    }*/
  };

  const logout = () => {
    setState({isLoggedIn: false, isLoginPending: false, loginError: null})
    removeUser();
  }

  return { state, user, login, logout, verifyAuth };
};
