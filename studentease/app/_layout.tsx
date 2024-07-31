import React from 'react';
import NavigationBar from '../component/navigation/navigation-bar';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { themeDark, themeLight } from '../context/PaperTheme';

export default function layout() {
  return (
    <>
        <AuthProvider>
          <ThemeProvider>
            <NavigationBar />
            <Stack  screenOptions={{headerShown: false }}/>
          </ThemeProvider>
        </AuthProvider>
      
    </>
  );
};


