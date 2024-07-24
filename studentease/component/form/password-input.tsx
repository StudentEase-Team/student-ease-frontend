import { Input } from "@rneui/base";
import { Icon } from '@rneui/themed';
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

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
        selectedIcon = "eye-slash";
        hiddenText = false
    }
    else {
        selectedIcon = "eye"
        hiddenText = true
    }
    
    return (
        <Input secureTextEntry={hiddenText}
        style={theme === 'light'? {color:'black'}:{color:'white'}}
        placeholder="Password"
        rightIcon={
            <Icon name={selectedIcon}
            color={theme === 'light'? 'black':'white'}
            type="font-awesome-5"
            onPress={() => setHidden(hidden? false:true)}
            />
        }
        onChangeText={
            (t: string) => {
            setText(t);
            props.passwordCallback(t)
            }
        }
        />
    )
}