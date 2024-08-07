import { Redirect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useAuth } from '../../context/AuthContext';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function AppLayout() {
  const { isAuthenticated, userState } = useAuth();
  const { theme } = useTheme()
  if (!isAuthenticated || isAuthenticated === undefined) {
    return <Redirect href="/" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
            
                <Drawer
                  screenOptions={{
                    drawerStyle: {
                      backgroundColor: theme === 'light' ? '#FFF' : '#333',
                    },
                    headerStyle: {
                      backgroundColor: theme === 'light' ? '#FFF' : '#333',
                    },
                    headerTintColor: theme === 'light' ? '#000' : '#FFF',
                    headerShadowVisible: false, 
                    drawerActiveTintColor: theme === 'light' ? '#000' : '#FFF',
                    drawerInactiveTintColor: theme === 'light' ? '#888' : '#BBB',
                  }}>

                <Drawer.Screen
                  name="homepage"
                  options={{
                    drawerLabel: 'Homepage',
                    title: 'Homepage',
                  }}
                />

                <Drawer.Screen
                  name="noticeboard"
                  options={{
                    drawerLabel: 'Noticeboard',
                    title: 'Noticeboard',
                  }}
                />

                {userState?.role === 'ADMIN' ? (
                <Drawer.Screen
                    name="college_list"
                    options={{
                    drawerLabel: 'College list',
                    title: 'Colleges',
                    }}
                />
                ) : (
                <Drawer.Screen
                    name="college_list"
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
                    title: 'FAQ',
                  }}
                />

                {userState?.role === 'ADMIN' || userState?.role === 'PROFESSOR' ? (
                <Drawer.Screen
                    name="faq/faq-answer"
                    options={{
                    drawerLabel: 'Answer FAQ',
                    title: 'Answer FAQ',
                    }}
                />
                ) : (
                <Drawer.Screen
                    name="faq/faq-answer"
                    options={{
                    drawerLabel: '',
                    drawerItemStyle: { display: 'none' }
                    }}
                />
                )}

              {userState?.role === 'STUDENT' ? (
                <Drawer.Screen
                    name="average-grade"
                    options={{
                    drawerLabel: 'Calculate grades',
                    title: 'Grades',
                    }}
                />
                ) : (
                <Drawer.Screen
                    name="average-grade"
                    options={{
                    drawerLabel: '',
                    drawerItemStyle: { display: 'none' }
                    }}
                />
                )}

              {userState?.role === 'ADMIN' ? (
                <Drawer.Screen
                    name="user-creation"
                    options={{
                    drawerLabel: 'Create user',
                    title: 'Create user',
                    }}
                />
                ) : (
                <Drawer.Screen
                    name="user-creation"
                    options={{
                    drawerLabel: '',
                    drawerItemStyle: { display: 'none' }
                    }}
                />
                )}

                <Drawer.Screen
                  name="map"
                  options={{
                    drawerLabel: 'Show maps of buildings',
                    title: 'Maps',
                  }}
                />

                <Drawer.Screen
                    name="change-theme"
                    options={{
                    drawerLabel: 'Change theme',
                    }}
                />

                <Drawer.Screen
                    name="logout"
                    options={{
                    drawerLabel: 'Logout',
                    }}
                />


            </Drawer>
              
    </GestureHandlerRootView>
  );
}