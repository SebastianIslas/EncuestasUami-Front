import { useState } from 'react';
import { useUser } from './useUser';
import {fetchLogin} from '../services/auth/login.js'

const initialState = {
    isLoggedIn: false,
    isLoginPending: false,
    loginError: null
}

export const useAuth = () => {
/*  const { user, addUser, removeUser } = useUser();

  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []); */

  const [state, setState] = useState(initialState);
  const { user, addUser, removeUser } = useUser()

  const setLoginPending = (isLoginPending) => setState({isLoginPending});
  const setLoginSuccess = (isLoggedIn) => setState({isLoggedIn});
  const setLoginError = (loginError) => setState({loginError});

  const login = (email, password) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    fetchLogin( email, password, error => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);
        addUser({
            id: 2183011316,
            nombre: 'Administrador',
            email: email,
            authToken: password
        })
      } else {
        setLoginError(error);
      }
    })
  }

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
    removeUser();
  }

  return { state, user, login, logout };
};
