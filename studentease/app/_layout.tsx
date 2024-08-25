import React, { useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { Slot } from 'expo-router';
import { LocaleProvider } from '../context/LocaleContext';
import { Platform } from 'react-native';

export default function layout() {
  
  useEffect(() => {
    if(Platform.OS === 'web')
      document.title = "StudentEase";
  }, []);

  return (
    <>
        <AuthProvider>
          <ThemeProvider>
              <LocaleProvider>
                <Slot />
            </LocaleProvider>
          </ThemeProvider>
        </AuthProvider>
      
    </>
  );
};

