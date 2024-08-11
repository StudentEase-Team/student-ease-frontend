import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { Slot } from 'expo-router';

export default function layout() {
  return (
    <>
        <AuthProvider>
          <ThemeProvider>
            <Slot />
          </ThemeProvider>
        </AuthProvider>
      
    </>
  );
};

