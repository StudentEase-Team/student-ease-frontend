import React from 'react';
import NavigationBar from '../component/navigation/navigation-bar';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from 'react-native-elements';
import { PaperProvider } from 'react-native-paper';
import customTheme from '../context/ThemeContext';

export default function layout() {
  return (
    <>
        <AuthProvider>
          <ThemeProvider>
            <PaperProvider theme={customTheme}>
            <NavigationBar />
            <Stack  screenOptions={{headerShown: false }}/>
            </PaperProvider>
          </ThemeProvider>
        </AuthProvider>
      
    </>
  );
};


