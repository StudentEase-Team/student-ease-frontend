import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model"
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


    return(
    <Dropdown 
    style={combinedStyle}
    onFocus={() => {setIsFocus(true)}}
    onBlur={() => {setIsFocus(false)}}
    disable={props.disable}
    activeColor={theme === 'light' ? '#f2f2f2' : '#18191a'}
    placeholderStyle={theme === 'light' ? styles.placeholderStyleLight : styles.placeholderStyleDark}
    itemTextStyle={theme === 'light'? styles.selectedTextStyleLight:styles.selectedTextStyleDark}
    containerStyle={theme === 'light'? styles.itemLight:styles.itemDark}
    itemContainerStyle={theme === 'light'? styles.itemLight:styles.itemDark}
    selectedTextStyle={theme === 'light'? styles.selectedTextStyleLight:styles.selectedTextStyleDark}
    inputSearchStyle={theme === 'light'? styles.inputSearchStyleLight:styles.inputSearchStyleDark}
    data={props.data} labelField={props.labelField} valueField={props.valueField} onChange={props.onChange}
    value={props.value}
    />
    )
}

export default CustomDropdown

const styles = StyleSheet.create({
        //DROP DOWN
        itemLight: {
            backgroundColor:'#f6f6f6',
        },    
        itemDark: {
            backgroundColor:'#121212',
        }, 
        dropdownLight: {
            alignSelf: 'center',
            height: 45,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 4,
            backgroundColor:'#f6f6f6',
            width:'100%',
        },        
        dropdownLightFocus: {
            alignSelf: 'center',
            height: 45,
            borderColor: '#4dabf7',
            borderWidth: 2,
            borderRadius: 5,
            backgroundColor:'#f6f6f6',
            width:'100%',
        },
        dropdownDark: {
            alignSelf: 'center',
            height: 45,
            borderColor: 'white',
            borderWidth: 0.1,
            borderRadius: 5,
            backgroundColor:'#121212',
            width:'100%',
        }, 
        dropdownDarkFocus: {
            alignSelf: 'center',
            height: 45,
            borderColor: '#9775fa',
            borderWidth: 2,
            borderRadius: 8,
            backgroundColor:'#121212',
            width:'100%',
        }, 
        icon: {
            marginRight: 5,
        },
        label: {
            position: 'absolute',
            backgroundColor: 'white',
            left: 22,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 8,
            fontSize: 14,
        },

        placeholderStyleLight: {
            fontSize: 16,
            color: 'black',
            padding: 10
        },
        placeholderStyleDark: {
            fontSize: 16,
            color: 'white',
            padding: 10
        },
        selectedTextStyleLight: {
            color:'black',
            fontSize: 16,
        },
        selectedTextStyleDark: {
            color:'white',
            fontSize: 16,
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyleLight: {
            height: 40,
            fontSize: 16,
            borderColor: '#ffffff',
            borderWidth: 1,
            borderRadius: 1,
            backgroundColor: '#ffffff',
        },
        inputSearchStyleDark: {
            height: 40,
            fontSize: 16,
            borderColor: '#242526',
            borderWidth: 1,
            borderRadius: 1,
            backgroundColor: '#242526',
        },
        //DROP DOWN
})