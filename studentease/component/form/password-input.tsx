import { useState } from "react";
import React from 'react';
import { useTheme } from "../../context/ThemeContext";
import { TextInput } from "react-native-paper";

export type PasswordProps = {
    passwordCallback : React.Dispatch<React.SetStateAction<string>>
};


export function PasswordInput(props : PasswordProps) {
    const [hidden, setHidden] = useState(false);
    const [text, setText] = useState("");
    const { theme } = useTheme()

    let selectedIcon = "eye";
    let hiddenText = true
    if(hidden) {
        selectedIcon = "eye-off";
        hiddenText = false
    }
    else {
        selectedIcon = "eye"
        hiddenText = true
    }
    
    return (
        <TextInput
            label="Password"
            secureTextEntry={hiddenText}
            mode="outlined"
            value={text}
            theme={{
                roundness: 5, 
              }}
            style={theme === 'light' ? { color: 'black' } : { color: 'white' }}
            right={<TextInput.Icon icon={selectedIcon} 
                color={theme === 'light' ? 'black' : 'white'}
                onPress={() => setHidden(hidden ? false : true)}/>} 
                onChangeText={(t: string) => {
                    setText(t);
                    props.passwordCallback(t);
                } }/>
    )
}