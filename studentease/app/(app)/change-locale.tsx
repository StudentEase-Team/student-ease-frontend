import { useFocusEffect, useRouter } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { LocaleContext } from '../../context/LocaleContext';

const changeLocale: React.FC = () => {
    const router = useRouter();
    const { locale, setLocale } = useContext(LocaleContext);

    useFocusEffect(
        React.useCallback(() => {
            if(locale === 'sr') {
                setLocale('en');
                router.push('/homepage');
            }
            else {
                setLocale('sr');
                router.push('/homepage');
            }
        }, [locale, setLocale, router])
    );
    return null;
 }

 export default changeLocale;