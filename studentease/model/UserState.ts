import { UserRole } from "./UserRole";

export interface UserState {
    token: AccessToken,
    role: UserRole
}