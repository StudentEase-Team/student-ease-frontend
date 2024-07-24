import React from "react";
import { Link } from "expo-router";
import { Drawer, PaperProvider } from "react-native-paper";
import { UserRole } from "../../model/UserRole";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { StyleSheet } from "react-native";
import { themeDark, themeLight } from "../../context/PaperTheme";

export type SecureRouteProps = {
    route: string, 
    label: string, 
    role: UserRole
}

export function SecureRoute({ route, label, role }: SecureRouteProps) {
    const { userState } = useAuth();
    const { theme } = useTheme();

    if (userState?.role === role || role === UserRole.ANY)
        return (
            <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
            <Link replace href={route}>
                <Drawer.Item 
                    label={label}
                />
            </Link>
            </PaperProvider>
        )
    else return null;
}

