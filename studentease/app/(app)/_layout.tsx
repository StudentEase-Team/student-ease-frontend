import { Redirect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useAuth } from '../../context/AuthContext';
import React, { useContext } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { IconButton } from 'react-native-paper';
import { Platform } from 'react-native';
import { I18n } from 'i18n-js';
import { translations } from '../../localization';
import { LocaleContext } from '../../context/LocaleContext';

export default function AppLayout() {
  const { isAuthenticated, userState } = useAuth();
  const { theme } = useTheme()
  const i18n = new I18n(translations)
    const { locale} = useContext(LocaleContext);
    i18n.locale = locale
    
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
                      drawerLabel: i18n.t('homepage'),
                      title: i18n.t('homepage'),
                      drawerIcon: () => (
                        <IconButton icon='home' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                      )
                    }}
                  />

                  <Drawer.Screen
                    name="noticeboard"
                    options={{
                      drawerLabel: i18n.t('noticeboard'),
                      title: i18n.t('noticeboard'),
                      drawerIcon: () => (
                        <IconButton icon='view-dashboard' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                      )
                    }}
                  />

                  {userState?.role === 'ADMIN' ? (
                    <Drawer.Screen
                      name="college-list"
                      options={{
                        drawerLabel: i18n.t('collegeList'),
                        title: i18n.t('collegeList'),
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
                      drawerLabel: i18n.t('showFAQ'),
                      title: i18n.t('showFAQ'),
                      drawerIcon: () => (
                        <IconButton icon='frequently-asked-questions' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                      )
                    }}
                  />

                  {userState?.role === 'ADMIN' || userState?.role === 'PROFESSOR' ? (
                    <Drawer.Screen
                      name="faq/faq-answer"
                      options={{
                        drawerLabel: i18n.t('answerFAQ'),
                        title: i18n.t('answerFAQ'),
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
                        drawerLabel: i18n.t('calculateGrades'),
                        title: i18n.t('calculateGrades'),
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
                        drawerLabel: i18n.t('createUser'),
                        title: i18n.t('createUser'),
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
                      drawerLabel: i18n.t('showMaps'),
                      title: i18n.t('showMaps'),
                      drawerIcon: () => (
                        <IconButton icon='office-building-marker' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                      )
                    }}
                  />

                  <Drawer.Screen
                    name="subject-list"
                    options={{
                      drawerLabel: i18n.t('subjectList'),
                      title: i18n.t('subjectList'),
                      drawerIcon: () => (
                        <IconButton icon='view-list' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                      )
                    }}
                  />

                  {userState?.role !== 'ADMIN' ? (
                    <Drawer.Screen
                      name="calendar"
                      options={{
                        drawerLabel: i18n.t('calendar'),
                        title: i18n.t('calendar'),
                        drawerIcon: () => (
                          <IconButton icon='calendar-month' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                        )
                      }}
                    />
                  ) : (
                    <Drawer.Screen
                      name="calendar"
                      options={{
                        drawerLabel: '',
                        title: i18n.t('calendar'),
                        drawerItemStyle: { display: 'none' }
                      }}
                    />
                  )}
                  

                  <Drawer.Screen
                    name="repository/[id]"
                    options={{
                      drawerLabel: i18n.t('repository'),
                      drawerItemStyle: { display: 'none' },
                      title: i18n.t('repository'),
                      drawerIcon: () => (
                        <IconButton icon='database' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                      )
                    }}
                  />

                  {Platform.OS !== 'ios' && userState?.role !== 'ADMIN' ? (
                    <Drawer.Screen
                      name="export-obligations"
                      options={{
                        drawerLabel: i18n.t('exportObligations'),
                        title: i18n.t('exportObligations'),
                        drawerIcon: () => (
                          <IconButton icon='calendar-export' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                        )
                      }}
                    />
                  ) : (
                    <Drawer.Screen
                      name="export-obligations"
                      options={{
                        drawerLabel: '',
                        drawerItemStyle: { display: 'none' }
                      }}
                    />
                  )}

                  <Drawer.Screen
                    name="change-theme"
                    options={{
                      drawerLabel: i18n.t('changeTheme'),
                      drawerIcon: () => (
                        <IconButton icon={theme === 'light' ? 'white-balance-sunny' : 'moon-waning-crescent'} iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                      )
                    }}
                  />

                  <Drawer.Screen
                    name="change-locale"
                    options={{
                      drawerLabel: i18n.t('changeLocale'),
                      drawerIcon: () => (
                        <IconButton icon='web' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                      )
                    }}
                  />

                  <Drawer.Screen
                    name="logout"
                    options={{
                      drawerLabel: i18n.t('logout'),
                      drawerIcon: () => (
                        <IconButton icon='logout' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}></IconButton>
                      )
                    }}
                  />

            </Drawer>
              
    </GestureHandlerRootView>
  );
}