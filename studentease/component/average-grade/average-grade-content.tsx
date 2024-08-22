import React, { useState } from "react";
import { Card, DataTable } from "react-native-paper";
import CustomDropdown from "../form/custom-dropdown";
import { useTheme } from '../../context/ThemeContext';
import { StyleSheet, Text, Platform } from 'react-native';
import { I18n } from 'i18n-js';
import SubjectGrade from "../../model/SubjectGrade";

type AverageGradeContentProps = {
    i18n: I18n,
    passedSubjects: SubjectGrade[],
    setPassedSubjects: React.Dispatch<React.SetStateAction<SubjectGrade[]>>,
    failedSubjects: SubjectGrade[],
    setFailedSubjects: React.Dispatch<React.SetStateAction<SubjectGrade[]>>,
    grades:{ [key: string]: number }
    setGrades: React.Dispatch<React.SetStateAction<{[key: string]: number;}>>
}

function AverageGradeContent({i18n, passedSubjects, setPassedSubjects, failedSubjects, setFailedSubjects, grades, setGrades}:AverageGradeContentProps) {
    const {theme} = useTheme();
    const combinedSubjects = [...passedSubjects, ...failedSubjects];

    const handleGradeChange = (subjectName: string, grade: number) => {
        setGrades(prevGrades => ({ ...prevGrades, [subjectName]: grade }));
    };

    const allGradesValid = combinedSubjects.every(subject => subject.grade !== -1 || grades[subject.subjectName]);
    const average = allGradesValid
        ? combinedSubjects.reduce((sum, subject) => {
            const grade = subject.grade !== -1 ? subject.grade : grades[subject.subjectName];
            return sum + grade;
        }, 0) / combinedSubjects.length
        : null;

    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return(
        <Card style={Platform.OS === 'web' ? theme === 'light' ? styles.qaContainerLight : styles.qaContainerDark : theme === 'light' ? styles.qaContainerLightMobile : styles.qaContainerDarkMobile}>
            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.headingLight : styles.headingDark) : (theme === 'light' ? styles.headingLightMobile : styles.headingDarkMobile)}>
                {i18n.t('averageGrade_title')}
            </Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title textStyle={theme === 'light' ? {color:'black'} : {color:'white'}} style={styles.subjectWidth}>
                        <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.textLight : styles.textDark) : (theme === 'light' ? styles.textLightMobile : styles.textDarkMobile)}>
                            {i18n.t('averageGrade_subjectName')}
                        </Text>
                    </DataTable.Title>
                    <DataTable.Title textStyle={theme === 'light' ? {color:'black'} : {color:'white'}} style={styles.gradeWidth}>
                        <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.textLight : styles.textDark) : (theme === 'light' ? styles.textLightMobile : styles.textDarkMobile)}>
                            {i18n.t('averageGrade_grade')}
                        </Text>
                    </DataTable.Title>
                    <DataTable.Title textStyle={theme === 'light' ? {color:'black'} : {color:'white'}} style={styles.dateWidth}>
                        <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.textLight : styles.textDark) : (theme === 'light' ? styles.textLightMobile : styles.textDarkMobile)}>
                            {i18n.t('averageGrade_date')}
                        </Text>
                    </DataTable.Title>
                </DataTable.Header>
                {combinedSubjects.map((subject) => {
                    const date = new Date(subject.date);
                    const formattedDate = isNaN(date.getTime()) ? i18n.t('averageGrade_invalidDate') : formatDate(date);
                    return (
                        <DataTable.Row key={subject.id} style={{ height:70}}>
                            <DataTable.Cell textStyle={theme === 'light' ? {color:'black'} : {color:'white'}} style={styles.subjectWidth}>
                                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.textLight : styles.textDark) : (theme === 'light' ? styles.textLightMobile : styles.textDarkMobile)}>
                                    {subject.subjectName}
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell textStyle={theme === 'light' ? {color:'black'} : {color:'white'}} style={styles.gradeWidth}>
                                {subject.grade === -1 ? (
                                    <CustomDropdown
                                        data={[6, 7, 8, 9, 10].map((grade) => ({ label: grade.toString(), value: grade }))}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={Platform.OS === 'web' ? i18n.t('averageGrade_grade') : ''}
                                        style={Platform.OS === 'web' ? (theme === 'light' ? styles.dropdownLight : styles.dropdownDark) : (theme === 'light' ? styles.dropdownLightMobile : styles.dropdownDarkMobile)}
                                        value={grades[subject.subjectName]}
                                        onChange={({ value }) => handleGradeChange(subject.subjectName, value)}
                                        selectedTextStyle={{fontSize: 18, textAlign: 'center'}}
                                        placeholderStyle={{fontSize: 18}}
                                    />
                                ) : (
                                    <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.textLight : styles.textDark) : (theme === 'light' ? styles.textLightMobile : styles.textDarkMobile)}>
                                        {subject.grade}
                                    </Text>
                                )}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.dateWidth}>
                                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.textLight : styles.textDark) : (theme === 'light' ? styles.textLightMobile : styles.textDarkMobile)}>
                                    {formattedDate}
                                </Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    );
                })}
            </DataTable>
            {average !== null && (
                <Text style={theme === 'light' ? styles.averageTextLight : styles.averageTextDark}>
                    {i18n.t('averageGrade_average')}{average.toFixed(2)}
                </Text>
            )}
        </Card>
    ); 
}

const styles = StyleSheet.create({
    qaContainerLight: {
        width: '80%',
        marginTop: 20,
        backgroundColor: 'white',
        alignSelf: 'center'
    },

    qaContainerLightMobile: {
        width: '100%',
        marginTop: 10,
        backgroundColor: 'white',
    },

    qaContainerDark: {
        width: '80%',
        marginTop: 20,
        backgroundColor: '#242526',
        alignSelf: 'center'
    },

    qaContainerDarkMobile: {
        width: '100%',
        marginTop: 10,
        backgroundColor: '#242526',
    },

    headingLight: {
        fontSize: 24, 
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
        color: 'black'
    },

    headingLightMobile: {
        fontSize: 20, 
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
        color: 'black'
    },

    headingDark: {
        fontSize: 24, 
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
        color: 'white'
    },

    headingDarkMobile: {
        fontSize: 20, 
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
        color: 'white'
    },

    subjectWidth: {
        flex:1.4,
    },

    gradeWidth: {
        flex:0.8,
        width: '40%',
        justifyContent: 'center',
        padding:2
    },

    dateWidth: {
        flex:0.9,
        width: '30%',
        justifyContent: 'center'
    },

    textLight: {
        flexWrap:'wrap',
        fontSize: 18,
        color: 'black', 
    },

    textLightMobile: {
        flexWrap:'wrap',
        fontSize: 16,
        color: 'black'
    },

    textDark: {
        flexWrap:'wrap',
        fontSize: 18,
        color: 'white'
    },

    textDarkMobile: {
        flexWrap:'wrap',
        fontSize: 16,
        color: 'white'
    },

    dropdownLight: {
        backgroundColor: '#f0f0f0',
        width: '50%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
        height: 60
    },

    dropdownLightMobile: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 5,
        fontSize: 16,
        height: 50,
        width: 65,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
    },

    dropdownDark: {
        backgroundColor: "#18191a",
        width: '50%'
    },

    dropdownDarkMobile: {
        backgroundColor: "#18191a",
        borderRadius: 5,
        padding: 5, 
        fontSize: 16,
    },

    averageTextLight: {
        marginTop: 40,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: 'black',
    },

    averageTextDark: {
        marginTop: 40,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: 'white',
    },
})

export default AverageGradeContent;