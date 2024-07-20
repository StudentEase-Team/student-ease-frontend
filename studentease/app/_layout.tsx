import React from 'react';
import NavigationBar from '../component/navigation/navigation-bar';
import { Stack } from 'expo-router';


export default function layout() {
  return (
    <>
      <NavigationBar />
      <Stack  screenOptions={{
          headerShown: false // Hide the default header
        }}/>
    </>
  );
};


