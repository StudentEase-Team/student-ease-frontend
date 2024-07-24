import * as React from 'react';
import { Appbar, Drawer, PaperProvider } from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
import { Icon } from '@rneui/themed';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../model/UserRole';
import { SecureRoute } from './secure-route';
import { useTheme } from '../../context/ThemeContext';
import { themeDark, themeLight } from '../../context/PaperTheme';

export default function NavigationBar() {
    const [drawerHidden, setDrawerHidden] = React.useState(true);
    const { isAuthenticated, userState, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    function MyDrawer() {
        if (!drawerHidden) {
            if (userState !== null && isAuthenticated) {
                return (
                    <Drawer.Section style={theme === 'light'? styles.drawerLight : styles.drawerDark}>  
                        <SecureRoute route="/noticeboard" label="Show noticeboard" role={UserRole.ANY}/>      
                        <SecureRoute route="/faq/faq-show" label="Show FAQ" role={UserRole.ANY}/> 
                        <SecureRoute route="/faq/faq-answer" label="Answer questions" role={UserRole.ANY}/>
                        <SecureRoute route="/college_list" label="List of colleges" role={UserRole.ANY}/>
                        <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
                            <Link replace href="#" onPress={() => { logout() }}>
                                <Drawer.Item label="Logout"/>
                            </Link>
                        </PaperProvider>
                    </Drawer.Section>
                );
            } else {
                return (
                    <Drawer.Section style={theme === 'light'? styles.drawerLight : styles.drawerDark}>
                        <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
                        <Link replace href="/auth/login">
                            <Drawer.Item label="Login"/>
                        </Link>
                        </PaperProvider>
                    </Drawer.Section>
                );
            }
        } else {
            return null;
        }
    }

    function SunMoonIcon() {
        return (
            <Icon 
                name={theme === 'light' ? "sun-o" : "moon-o"} 
                type="font-awesome" 
                style={styles.navbarItem} 
                onPress={toggleTheme} 
                size={35} 
                color={theme === 'light' ? '#000' : '#FFF'}
            />
        );
    }

    return (
        <>
            <View style={[styles.navbar, theme === 'light' ? styles.navbarLight : styles.navbarDark]}>
                <Icon 
                    name="menu" 
                    type="feather" 
                    style={styles.navbarMenuItem} 
                    size={35} 
                    onPress={() => setDrawerHidden(!drawerHidden)} 
                    color={theme === 'light' ? '#000' : '#FFF'}
                />
                <SunMoonIcon />
            </View>
            <MyDrawer />
        </>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    navbarLight: {
        backgroundColor: '#E0E0E0',
    },
    navbarDark: {
        backgroundColor: 'rgb(30,30,30)',
    },
    navbarItem: {
        flex: 1,
    },
    navbarMenuItem: {
        flex: 1,
    },
    navbarTitleLight: {
        flex: 2,
        textAlign: 'center',
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    navbarTitleDark: {
        flex: 2,
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    drawerLight: {
        backgroundColor: "#FFF"
    },
    drawerDark: {
        backgroundColor: "#333"
    },
});
