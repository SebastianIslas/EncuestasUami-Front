import { createContext, useEffect } from 'react';
import {useAuth} from '../hooks/useAuth.js'


export const AuthContext = createContext(null);


export const AuthProvider = props => {
  const { state, user, login, logout, verifyAuth } = useAuth();


  return (
    <AuthContext.Provider
      value={{
        state,
        user,
        login,
        logout,
        verifyAuth
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
