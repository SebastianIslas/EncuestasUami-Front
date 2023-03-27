import React from 'react';
import {useAuth} from '../hooks/useAuth.js'


export const AuthContext = React.createContext(null);


export const AuthProvider = props => {
  const { state, user, login, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        state,
        user,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
