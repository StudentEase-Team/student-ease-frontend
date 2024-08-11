import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { useTheme } from "../../context/ThemeContext";

function CustomDropdown(props: DropdownProps<any>) {
    const [isFocus, setIsFocus] = useState(false);
    const { theme } = useTheme();

    const combinedStyle = StyleSheet.flatten([
        theme === 'light'
            ? (isFocus ? styles.dropdownLightFocus : styles.dropdownLight)
            : (isFocus ? styles.dropdownDarkFocus : styles.dropdownDark),
        props.style
    ]);

    return (
        <Dropdown
            style={combinedStyle}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            disable={props.disable}
            activeColor={theme === 'light' ? '#f2f2f2' : '#18191a'}
            placeholderStyle={theme === 'light' ? styles.placeholderStyleLight : styles.placeholderStyleDark}
            itemTextStyle={theme === 'light' ? styles.selectedTextStyleLight : styles.selectedTextStyleDark}
            containerStyle={theme === 'light' ? styles.itemLight : styles.itemDark}
            itemContainerStyle={theme === 'light' ? styles.itemLight : styles.itemDark}
            selectedTextStyle={theme === 'light' ? styles.selectedTextStyleLight : styles.selectedTextStyleDark}
            inputSearchStyle={theme === 'light' ? styles.inputSearchStyleLight : styles.inputSearchStyleDark}
            data={props.data}
            labelField={props.labelField}
            valueField={props.valueField}
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
        />
    );
}

export default CustomDropdown;

const styles = StyleSheet.create({
    dropdownLight: {
        alignSelf: 'center',
        height: 60,
        borderRadius: 10,
        backgroundColor: 'white',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        padding: 20
    },

    dropdownLightFocus: {
        alignSelf: 'center',
        height: 60,
        borderRadius: 10,
        backgroundColor: 'white',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
        elevation: 5,
        padding: 20,
    },

    dropdownDark: {
        alignSelf: 'center',
        height: 60,
        borderRadius: 10,
        backgroundColor: '#272727',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    dropdownDarkFocus: {
        alignSelf: 'center',
        height: 60,
        borderRadius: 10,
        backgroundColor: '#272727',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
        elevation: 5,
        padding: 20,
    },

    placeholderStyleLight: {
        fontSize: 16,
        color: '#707070',
        padding: 10,
    },

    placeholderStyleDark: {
        fontSize: 16,
        color: 'white',
        padding: 10,
    },

    selectedTextStyleLight: {
        color: 'black',
        fontSize: 16,
    },

    selectedTextStyleDark: {
        color: 'white',
        fontSize: 16,
    },

    inputSearchStyleLight: {
        height: 40,
        fontSize: 16,
        backgroundColor: '#f6f6f6',
    },

    inputSearchStyleDark: {
        height: 40,
        fontSize: 16,
        backgroundColor: '#242526',
    },

    itemLight: {
        backgroundColor: 'white',
    },
    
    itemDark: {
        backgroundColor: '#121212',
    },
});
