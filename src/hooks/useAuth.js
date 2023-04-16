import { useState } from 'react';
import { useUser } from './useUser';
import {fetchLogin} from '../services/auth/login.js'

const initialState = {
    isLoggedIn: false,
    isLoginPending: true,
    loginError: null
}

export const useAuth = () => {

  const [state, setState] = useState(initialState);
  const { user, addUser, loadUser, removeUser } = useUser()

  const login = (email, password) => {
    fetchLogin( email, password, error => {

      if (!error) {
        addUser({
            id: 2183011316,
            nombre: 'Administrador',
            email: email,
            authToken: password
        })
        setState({...state, isLoggedIn: true, isLoginPending: false})
      } else {
        setState({...state, loginError: error})
      }
    })
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
