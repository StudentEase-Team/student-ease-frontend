import * as React from 'react';
import { Appbar, Drawer } from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import { Icon } from '@rneui/themed';
import { Link } from 'expo-router';

export type NavigationBarProps = {
   
};

export default function NavigationBar(props : NavigationBarProps) {
    const [active, setActive] = React.useState('');
    const [drawerHidden, setDrawerHidden] = React.useState(true);

    if(drawerHidden)
    return (
        <>
            <View style={styles.navbar}>
                <Icon name="menu" type="feather" style={styles.navbarMenuItem} onPress={() => {setDrawerHidden(false)}}></Icon>
                <Icon name="sun-o" type="font-awesome" style={styles.navbarItem}></Icon>
                <Icon name="moon-o" type="font-awesome" style={styles.navbarItem}></Icon>
            </View>
        </>
    )

    else
    return (
        <>
        <View style={styles.navbar}>
            <Icon name="menu" type="feather" style={styles.navbarMenuItem} onPress={() => {setDrawerHidden(true)}}></Icon>
            <Icon name="sun-o" type="font-awesome" style={styles.navbarItem}></Icon>
            <Icon name="moon-o" type="font-awesome" style={styles.navbarItem}></Icon>
        </View>

        <Drawer.Section title="Some title">
            <Link replace href="/auth/login">
                <Drawer.Item
                label="Login"
                //active={active === 'first'}
                onPress={() => setActive('first')}
                />
            </Link>

            <Link replace href="/noticeboard/noticeboard-show">
                <Drawer.Item
                label="Show noticeboard"
                //active={active === 'second'}
                onPress={() => setActive('second')}
                />
            </Link>

            <Link replace href="/noticeboard/noticeboard-create-item">
                <Drawer.Item
                label="Create noticeboard item"
                //active={active === 'second'}
                onPress={() => setActive('second')}
                />
            </Link>
        </Drawer.Section>
        </>
    )
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
    },

    navbarItem: {
        flex: 1
    },

    navbarMenuItem: {
        marginRight: 'auto',
        flex: 1
    }
})