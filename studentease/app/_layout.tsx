import React from 'react';
import NavigationBar from '../component/navigation/navigation-bar';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';


export default function layout() {
  return (
    <>
        <AuthProvider>
            <NavigationBar />
            <Stack  screenOptions={{headerShown: false }}/>
        </AuthProvider>
    </>
  );
};


