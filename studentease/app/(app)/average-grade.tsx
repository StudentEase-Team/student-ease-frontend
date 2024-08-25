import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import SubjectGrade from '../../model/SubjectGrade';
import axios from 'axios';
import { API_BASE_URL } from '@env';
import { useTheme } from '../../context/ThemeContext';
import { useFocusEffect } from 'expo-router';
import { I18n } from 'i18n-js';
import { translations } from '../../localization';
import { LocaleContext } from '../../context/LocaleContext';
import { FilterType } from '../../model/FilterType';
import AverageGradeFilter from '../../components/average-grade/average-grade-filter';
import AverageGradeContent from '../../components/average-grade/average-grade-content';

function AverageGrade() {
    const { userState } = useAuth();
    const config = {
        headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
    };
    const [passedSubjects, setPassedSubjects] = useState<SubjectGrade[]>([]);
    const [failedSubjects, setFailedSubjects] = useState<SubjectGrade[]>([]);
    const [year, setYear] = useState('all');
    const [grades, setGrades] = useState<{ [key: string]: number }>({});
    const { theme } = useTheme();
    const [selectedFilterType, setSelectedFilterType] = useState<FilterType | null>('ALL');
    const i18n = new I18n(translations)
    const { locale } = useContext(LocaleContext);
    i18n.locale = locale

    const getGrades = async () => {

        await axios.get(`${API_BASE_URL}/subjects/passed/${year}`, config).catch((reason) => {
            setPassedSubjects([]);
        }).then((res) => {
            if (res !== undefined)
                setPassedSubjects(res.data);
        });

        await axios.get(`${API_BASE_URL}/subjects/failed/${year}`, config).catch((reason) => {
            setFailedSubjects([]);
        }).then((res) => {
            if (res !== undefined)
                setFailedSubjects(res.data);
        });
    };

    useEffect(() => {
        getGrades();
    }, [year]);

    useFocusEffect(
        React.useCallback(() => {
            setGrades({});
            setSelectedFilterType('ALL');
            return () => { };
        }, [])
    );

    return (
        <ScrollView style={theme === 'light' ? styles.pageContainerLight : styles.pageContainerDark}>
            <AverageGradeFilter
                i18n={i18n}
                year={year}
                setYear={setYear} />

            <AverageGradeContent
                i18n={i18n}
                passedSubjects={passedSubjects}
                setPassedSubjects={setPassedSubjects}
                failedSubjects={failedSubjects}
                setFailedSubjects={setFailedSubjects}
                grades={grades}
                setGrades={setGrades} />

            <View style={{ height: 150 }} />
        </ScrollView>
    );
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
    }
});

export default AverageGrade;
