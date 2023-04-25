import { createContext, useEffect } from 'react';
import {useAuthAlumnos} from '../hooks/useAuthAlumnos.js'


export const AuthContextAlumnos = createContext(null);


export const AuthProviderAlumnos = props => {
  const { state, user, login, logout, verifyAuth } = useAuthAlumnos();


  return (
    <AuthContextAlumnos.Provider
      value={{
        state,
        user,
        login,
        logout,
        verifyAuth
      }}
    >
      {props.children}
    </AuthContextAlumnos.Provider>
  );
};
