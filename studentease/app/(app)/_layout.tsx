import { Redirect, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useAuth } from '../../context/AuthContext';
import React from 'react';

export default function AppLayout() {
  const { isAuthenticated, userState } = useAuth();

  if (!isAuthenticated || isAuthenticated === undefined) {
    return <Redirect href="/" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                  name="Noticeboard"
                  options={{
                    drawerLabel: 'noticeboard',
                    title: '',
                    //drawerItemStyle: { display: 'none' }
                  }}
                />

                {userState?.role === 'ADMIN' ? (
                <Drawer.Screen
                    name="college_list"
                    options={{
                    drawerLabel: 'College list',
                    title: '',
                    }}
                />
                ) : (
                <Drawer.Screen
                    name="college_list_hidden"
                    options={{
                    drawerLabel: '',
                    drawerItemStyle: { display: 'none' }
                    }}
                />
                )}


              <Drawer.Screen
                  name="faq/faq-show"
                  options={{
                    drawerLabel: 'Show FAQ',
                    title: '',
                    //drawerItemStyle: { display: 'none' }
                  }}
                />

                <Drawer.Screen
                  name="faq/faq-answer"
                  options={{
                    drawerLabel: 'Answer FAQs',
                    title: '',
                    //drawerItemStyle: { display: 'none' }
                  }}
                />
            </Drawer>
              
    </GestureHandlerRootView>
  );
}