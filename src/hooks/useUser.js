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
  const { setItem, getItem } = useLocalStorage();

  const addUser = (user) => {
    setUser(user);
    setItem('user', JSON.stringify(user));
  };

  const loadUser = () => {
    const userStorage = JSON.parse(getItem('user'));
  
    if (!userStorage) {
      return null;
    }
    setUser(userStorage);
    return userStorage;
  };

  const removeUser = () => {
    setUser(null);
    setItem('user', '');
  };

  return { user, addUser, loadUser, removeUser };
};
