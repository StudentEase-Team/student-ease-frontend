import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserState } from '../model/UserState';
import Toast from 'react-native-toast-message';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { API_BASE_URL } from '@env';
import { useRouter } from 'expo-router';
import { I18n } from 'i18n-js';
import { translations } from '../localization';
import { LocaleContext } from '../context/LocaleContext';

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
  const router = useRouter();
  const i18n = new I18n(translations)
  const { locale } = useContext(LocaleContext);
  i18n.locale = locale

  useEffect(() => {
    const loadUserState = async () => {
      try {
        let storedUserState: string | null = null;
        
        if (Platform.OS === 'web') {
          let state = Cookies.get('userState');
          if(state !== undefined)
            storedUserState = state;
        } else {
          storedUserState = await SecureStore.getItemAsync('userState');
        }

        if (storedUserState) {
          const userState: UserState = JSON.parse(storedUserState);
          
          const isTokenValid = true;

          if (isTokenValid) {
            setUserState(userState);
            setIsAuthenticated(true);
          } else {
            await clearUserState();
            router.replace('/');
          }
        }
      } catch (error) {
        console.log('Failed to load user state from storage', error);
      }
    };

    loadUserState();
  }, []);

  const saveUserState = async (userState: UserState) => {
    try {
      const userStateString = JSON.stringify(userState);
      if (Platform.OS === 'web') {
        Cookies.set('userState', userStateString, { expires: 7 });
      } else {
        await SecureStore.setItemAsync('userState', userStateString);
      }
    } catch (error) {
      console.log('Failed to save user state to storage', error);
    }
  };

  const clearUserState = async () => {
    try {
      if (Platform.OS === 'web') {
        Cookies.remove('userState');
      } else {
        await SecureStore.deleteItemAsync('userState');
      }
    } catch (error) {
      console.log('Failed to clear user state from storage', error);
    }
  };

  const login = async (email: string, password: string): Promise<UserState | null> => {
    setIsAuthenticated(false);
    const request: LoginRequest = {
      email: email,
      password: password,
      platform: Platform.OS === 'web'? 'web':'mobile'
    };

    try {
      const result: AxiosResponse = await axios.post(`${API_BASE_URL}/login`, request);
      if (result.status === 200) {
        Toast.show({
          type: 'success',
          text1: i18n.t('successfully_logged_toast'),
        });
        const userState: UserState = result.data;
        setIsAuthenticated(true);
        setUserState(userState);
        await saveUserState(userState);
        router.replace('/homepage');
        return userState;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `${error}`,
      });
      return null;
    }

    return null;
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUserState(null);
    await clearUserState();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userState, login, logout }}>
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
