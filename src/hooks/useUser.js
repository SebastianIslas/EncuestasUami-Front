import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

const UserInitial = {
    id: '',
    nombre: '',
    email: '',
    authToken: null
}

export const useUser = (key = 'user') => {
  const [ user, setUser ] = useState(UserInitial);
  const { setItem, getItem } = useLocalStorage();

  const addUser = (user) => {
    setUser(user);
    setItem(key, JSON.stringify(user));
  };

  const loadUser = () => {
    const userStorage = JSON.parse(getItem(key));
  
    if (!userStorage) {
      return null;
    }
    setUser(userStorage);
    return userStorage;
  };

  const removeUser = () => {
    setUser(null);
    setItem(key, '');
  };

  return { user, addUser, loadUser, removeUser };
};
