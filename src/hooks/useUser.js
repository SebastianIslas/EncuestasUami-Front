import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

const UserInitial = {
    id: '',
    nombre: '',
    email: '',
    authToken: null
}

export const useUser = () => {
  const [ user, setUser ] = useState(UserInitial);
  const { setItem } = useLocalStorage();

  const addUser = (user) => {
    setUser(user);
    setItem('user', JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem('user', '');
  };

  return { user, addUser, removeUser };
};
