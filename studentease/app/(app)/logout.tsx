import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const logout: React.FC = () => {
    const router = useRouter();
    const { logout, userState } = useAuth();

    useEffect(() => {
        logout();
        router.replace('/')
    }, [userState]);
    return null;
 }

 export default logout;