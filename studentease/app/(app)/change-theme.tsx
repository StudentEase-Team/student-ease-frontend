import { useFocusEffect, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const changeTheme: React.FC = () => {
    const router = useRouter();
    const { toggleTheme } = useTheme()

    useFocusEffect(
        React.useCallback(() => {
            toggleTheme();
            router.back();
        }, [])
    );
    return null;
 }

 export default changeTheme;