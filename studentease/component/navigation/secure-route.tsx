import { Link } from "expo-router";
import { Drawer } from "react-native-paper";
import { UserRole } from "../../model/UserRole";
import { useAuth } from "../../context/AuthContext";

export type SecureRouteProps = {
    route: string, 
    label: string, 
    role: UserRole
}

export function SecureRoute({route, label, role} : SecureRouteProps) {
    const {userState} = useAuth();
    if(userState?.role === role || role === UserRole.ANY)
    return (
        <Link replace href={route}>
            <Drawer.Item label={label}/>
        </Link>
    )
    else return false;
}