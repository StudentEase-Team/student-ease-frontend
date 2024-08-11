import { Redirect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useAuth } from '../../context/AuthContext';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { IconButton } from 'react-native-paper';

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
                    drawerLabel: 'Home',
                    title: 'Home',
                    drawerIcon: () => (
                      <IconButton icon='home' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                    )
                  }}
                />

                <Drawer.Screen
                  name="noticeboard"
                  options={{
                    drawerLabel: 'Noticeboard',
                    title: 'Noticeboard',
                    drawerIcon: () => (
                      <IconButton icon='view-dashboard' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                    )
                  }}
                />

                {userState?.role === 'ADMIN' ? (
                <Drawer.Screen
                    name="college-list"
                    options={{
                    drawerLabel: 'College list',
                    title: 'Colleges',
                    drawerIcon: () => (
                      <IconButton icon='school' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                    )
                    }}
                />
                ) : (
                <Drawer.Screen
                    name="college-list"
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
                    drawerIcon: () => (
                      <IconButton icon='frequently-asked-questions' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                    )
                  }}
                />

                {userState?.role === 'ADMIN' || userState?.role === 'PROFESSOR' ? (
                <Drawer.Screen
                    name="faq/faq-answer"
                    options={{
                    drawerLabel: 'Answer FAQ',
                    title: 'Answer FAQ',
                    drawerIcon: () => (
                      <IconButton icon='forum' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                    )
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
                    drawerIcon: () => (
                      <IconButton icon='calculator-variant' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                    )
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
                    drawerIcon: () => (
                      <IconButton icon='account-plus' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                    )
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
                    drawerIcon: () => (
                      <IconButton icon='office-building-marker' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                    )
                  }}
                />

                <Drawer.Screen
                  name="subject-list"
                  options={{
                    drawerLabel: 'Subject list',
                    title: 'Subject list',
                    drawerIcon: () => (
                      <IconButton icon='view-list' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                    )
                  }}
                />

                <Drawer.Screen
                  name="repository/[id]"
                  options={{
                    drawerLabel: 'Repository',
                    drawerItemStyle: { display: 'none' },
                    title: 'Repository',
                    drawerIcon: () => (
                      <IconButton icon='database' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                    )
                  }}
                />

                <Drawer.Screen
                    name="change-theme"
                    options={{
                    drawerLabel: 'Change theme',
                    drawerIcon: () => (
                      <IconButton icon={theme === 'light'? 'white-balance-sunny' : 'moon-waning-crescent'} iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                    )
                    }}
                />

                <Drawer.Screen
                    name="logout"
                    options={{
                    drawerLabel: 'Logout',
                    drawerIcon: () => (
                      <IconButton icon='logout' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                    )
                    }}
                />
            </Drawer>
              
    </GestureHandlerRootView>
  );
}