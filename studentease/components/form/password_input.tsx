import { Input } from "@rneui/base";
import { Icon } from '@rneui/themed';
import { useState } from "react";

export function PasswordInput() {
    const [hidden, setHidden] = useState(false);
    const [text, setText] = useState("");

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
        placeholder="Password"
        rightIcon={
            <Icon name={selectedIcon}
            type="font-awesome-5"
            onPress={() => setHidden(hidden? false:true)}
            />
        }
        onChangeText={
            (t: string) => {
            setText(t);
            }
        }
        />
    )
}