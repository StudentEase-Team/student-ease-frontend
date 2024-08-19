import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { Slot } from 'expo-router';
import { LocaleProvider } from '../context/LocaleContext';

export default function layout() {
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

