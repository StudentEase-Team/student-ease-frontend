import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserState } from '../model/UserState';
import Toast from 'react-native-toast-message';
import axios, { AxiosResponse } from 'axios';

//TODO: Cuvaj u secure storage, jer prilikom refresh se gube ove stvari!

type AuthContextType = {
  isAuthenticated: boolean;
  userState: UserState | null;
  login: (email: string, password: string) => Promise<UserState | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userState, setUserState] = useState<UserState | null>(null);

  const login = async (email: string, password: string) : Promise<UserState | null> => {
    
    setIsAuthenticated(false);
    const request : LoginRequest = {
      email : email,
      password : password,
    }

    try {
      const result: AxiosResponse = await axios.post('http://localhost:8080/api/login', request);
      if (result.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Logged in successfully!',
        });
        const userState: UserState =  result.data;
        setIsAuthenticated(true);
        setUserState(userState);
        return userState;
      }
    } 
    
    catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Wrong email or password!',
      });
      return null;
    }

    return null;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserState(null)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userState, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
