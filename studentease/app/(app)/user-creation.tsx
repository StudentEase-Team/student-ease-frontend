import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet} from 'react-native'
import { ScrollView, } from "react-native-gesture-handler";
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
import axios, { AxiosResponse } from 'axios';
import { College } from '../../model/College';
import { I18n } from 'i18n-js';
import { translations } from '../../localization';
import { LocaleContext } from '../../context/LocaleContext';
import UserCreationContent from '../../components/user-creation/user-creation-content';

function UserCreation() {
    const { theme } = useTheme();
    const { userState } = useAuth();
    const initialCollegeData = [{ label: 'Any', value: 'any' }];
    const [collegeData, setCollegeData] = useState<{ label: any, value: any }[]>(initialCollegeData);
    const i18n = new I18n(translations)
    const { locale} = useContext(LocaleContext);
    i18n.locale = locale

    const config = {
        headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
    };

    const fetchColleges = async () => {
        const response: AxiosResponse = await axios.get(`${API_BASE_URL}/college`, config);
            if (response.status === 200) {
                const colleges: College[] = response.data;
                const updatedCollegeData = [ ...colleges.map(c => ({ label: c.abbreviation, value: c.name }))];
                setCollegeData(updatedCollegeData);
            }
        }

    useEffect(() => {
        fetchColleges();
    },[]);

    return (
        <ScrollView style={theme === 'light' ? styles.pageContainerLight : styles.pageContainerDark}>
            <UserCreationContent 
                i18n={i18n} 
                collegeData={collegeData}/>
            <Toast/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pageContainerLight: {
        flex: 1,
        padding: 20,
    },

    pageContainerDark: {
        flex: 1,
        padding: 20,
        backgroundColor: '#18191A'
    },
})

export default UserCreation;
