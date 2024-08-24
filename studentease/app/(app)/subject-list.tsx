import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '@env';
import axios, { AxiosResponse } from 'axios';
import { Subject } from '../../model/Subject';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from 'expo-router';
import { College } from '../../model/College';
import { I18n } from 'i18n-js';
import { translations } from '../../localization';

import { LocaleContext } from '../../context/LocaleContext';
import SubjectListFilterWeb from '../../component/subject-list/subject-list-filter-web';
import SubjectListContentWeb from '../../component/subject-list/subject-list-content-web';
import SubjectListFilterMobile from '../../component/subject-list/subject-list-filter-mobile';
import SubjectListContentMobile from '../../component/subject-list/subject-list-content-mobile';
import { UserRole } from '../../model/UserRole';

const SubjectPage = () => {
    const initialCollegeData = [{ label: 'Any', value: 'any' }];
    const { theme } = useTheme();
    const { userState } = useAuth();
    const [colleges, setColleges] = useState<College[]>();
    const [collegeDropdownData, setCollegeDropdownData] = useState<{ label: any, value: any }[]>(initialCollegeData);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [originalSubjects, setOriginalSubjects] = useState<Subject[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const i18n = new I18n(translations)
    const { locale} = useContext(LocaleContext);
    i18n.locale = locale

    const fetchColleges = useCallback(async () => {
        if (!userState?.token.accessToken) return;
    
        const config = {
            headers: { Authorization: `Bearer ${userState.token.accessToken}` }
        };
        try {
            const response: AxiosResponse = await axios.get(`${API_BASE_URL}/college`, config);
            if (response.status === 200) {
                const allColleges = response.data;
                setColleges(allColleges);
    
                const allSubjects = allColleges.reduce((acc: Subject[], college: College) => {
                    return [...acc, ...college.subjects];
                }, []);
    
                if(userState.role === UserRole.PROFESSOR) {
                    const response2: AxiosResponse = await axios.get(`${API_BASE_URL}/subjects/professor`, config);
                    if(response2.status === 200) {
                        setSubjects(response2.data);
                        setOriginalSubjects(response2.data);
                    }
                }
                else 
                {
                    setSubjects(allSubjects);
                    setOriginalSubjects(allSubjects);
                }
                const updatedCollegeData = [{ label: 'Any', value: 'any' }, ...allColleges.map(c => ({ label: c.abbreviation, value: c.id }))];
                setCollegeDropdownData(updatedCollegeData);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed to fetch colleges',
            });
        }
    }, []);
    
    useFocusEffect(
        React.useCallback(() => {
            fetchColleges();
        }, [])
    );

    function handleCollegeChange(selectedCollege: { label: any, value: any }) {
        const collegeId : string = selectedCollege.value;
    
        if (colleges !== undefined) {
            if (collegeId === 'any') {
                setSubjects(originalSubjects);
            } else {
                const selectedCollegeData = colleges.find(college =>  college.id === parseInt(collegeId, 10));
                if (selectedCollegeData) {
                    setSubjects(selectedCollegeData.subjects);
                } else {
                    setSubjects([]);
                }
            }
        }
    }
    
    const handleSearchChange = (query: string) => {
        setSearchQuery(query);

        if (query === '') {
            setSubjects(originalSubjects);
        } else {
            const filteredSubjects = originalSubjects.filter(subject =>
                subject.name.toLowerCase().includes(query.toLowerCase()) ||
                subject.professorName.toLowerCase().includes(query.toLowerCase()) ||
                subject.collegeName.toLowerCase().includes(query.toLowerCase())
            );
            setSubjects(filteredSubjects);
        }
    };

    if(Platform.OS === 'web')
    return (
        <ScrollView style={theme === 'light' ? styles.containerLight : styles.containerDark}>

            <SubjectListFilterWeb 
            handleCollegeChange={handleCollegeChange} 
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange} 
            collegeDropdownData={collegeDropdownData} 
            i18n={i18n} />

            <SubjectListContentWeb i18n={i18n} subjects={subjects} />

            <View style={{ height: 50 }}></View>
           </ScrollView>

    );
    else return (
        <ScrollView style={theme === 'light' ? styles.containerLight : styles.containerDark}>

            <SubjectListFilterMobile
                        handleCollegeChange={handleCollegeChange} 
                        searchQuery={searchQuery}
                        handleSearchChange={handleSearchChange} 
                        collegeDropdownData={collegeDropdownData} 
                        i18n={i18n}/>

            <SubjectListContentMobile i18n={i18n} subjects={subjects} />

            <View style={{ height: 50 }}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        padding: 20,
    },
    
    containerDark: {
        flex: 1,
        padding: 20,
        backgroundColor: '#18191a',
    }
});

export default SubjectPage;
