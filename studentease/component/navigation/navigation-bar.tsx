import * as React from 'react';
import { Appbar, Drawer } from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import { Icon } from '@rneui/themed';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../model/UserRole';
import { SecureRoute } from './secure-route';

export type NavigationBarProps = {
   
};

export default function NavigationBar(props : NavigationBarProps) {
    const [active, setActive] = React.useState('');
    const [theme, setTheme] = React.useState('light');
    const [drawerHidden, setDrawerHidden] = React.useState(true);
    const {isAuthenticated, userState, logout} = useAuth();

    function changeTheme() {
        theme === 'light'? setTheme('dark'):setTheme('light');
    }

    //TODO: Finish

    function MyDrawer() {
        if(!drawerHidden) {
            if(userState !== null && isAuthenticated) {
                return (
                    <Drawer.Section>  

                        <SecureRoute route="/noticeboard" label="Show noticeboard" role={UserRole.ANY}/>      

                        <SecureRoute route="/faq/faq-show" label="Show FAQ" role={UserRole.ANY}/> 

                        <SecureRoute route="/faq/faq-answer" label="Answer questions" role={UserRole.ANY}/>

                        <Link replace href="#" onPress={() => {logout()}}>
                            <Drawer.Item label="Logout"/>
                        </Link>
                    </Drawer.Section>
                )
            }
            else return (
                <Drawer.Section>
                    <Link replace href="/auth/login">
                        <Drawer.Item label="Login"/>
                    </Link>
                </Drawer.Section>
            )
        }
        else return false
    }

    function SunMoonIcon() {
        if(theme === 'light') {
            return(<Icon name="sun-o" type="font-awesome" style={styles.navbarItem} onPress={() => changeTheme()} size={35}></Icon>)
        }
        else 
            return(<Icon name="moon-o" type="font-awesome" style={styles.navbarItem} onPress={() => changeTheme()} size={35}></Icon>)
    }

    return (
        <>
            <View style={styles.navbar}>
                <Icon name="menu" type="feather" style={styles.navbarMenuItem} size={35} onPress={() => {drawerHidden? setDrawerHidden(false):setDrawerHidden(true);}}></Icon>
                <SunMoonIcon></SunMoonIcon>
            </View>
            <MyDrawer/>
        </>
    )
}



const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    navbarItem: {
        flex: 1,
    },

    navbarMenuItem: {
        flex: 1
    }
})