import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import SubjectGrade from '../../model/SubjectGrade';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '@env';
import { DataTable, Text } from 'react-native-paper';
import CustomDropdown from '../../component/form/custom-dropdown';

function AverageGrade() {
    const { userState } = useAuth();
    const config = {
        headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
    };
    const [passedSubjects, setPassedSubjects] = useState<SubjectGrade[]>([]);
    const [failedSubjects, setFailedSubjects] = useState<SubjectGrade[]>([]);
    const [year, setYear] = useState('all');
    const [grades, setGrades] = useState<{ [key: string]: number }>({});

    const getGrades = async () => {
        try {
            const response1: AxiosResponse = await axios.get(`${API_BASE_URL}/subjects/passed/${year}`, config);
            if (response1.status === 200) {
                setPassedSubjects(response1.data);
            }
            const response2: AxiosResponse = await axios.get(`${API_BASE_URL}/subjects/failed/${year}`, config);
            if (response2.status === 200) {
                setFailedSubjects(response2.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getGrades();
    }, [year]);

    const handleGradeChange = (subjectName: string, grade: number) => {
        setGrades(prevGrades => ({ ...prevGrades, [subjectName]: grade }));
    };

    const handleYearChange = (item: { value: string }) => {
        setYear(item.value);
    };

    const combinedSubjects = [...passedSubjects, ...failedSubjects];

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

    return (
        <ScrollView style={styles.pageContainer}>
            <View style={styles.dropdownContainer}>
                <CustomDropdown
                    data={[
                        { label: 'Any', value: 'all' },
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' },
                        { label: '4', value: '4' }
                    ]}
                    labelField="label"
                    valueField="value"
                    value={year}
                    onChange={handleYearChange}
                />
            </View>
            <Text style={styles.heading}>Subjects</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Subject Name</DataTable.Title>
                    <DataTable.Title>Grade</DataTable.Title>
                    <DataTable.Title>Date</DataTable.Title>
                </DataTable.Header>
                {combinedSubjects.map((subject) => {
                    const date = new Date(subject.date);
                    const formattedDate = isNaN(date.getTime()) ? 'Invalid date' : formatDate(date);
                    return (
                        <DataTable.Row key={subject.subjectName}>
                            <DataTable.Cell>{subject.subjectName}</DataTable.Cell>
                            <DataTable.Cell>
                                {subject.grade === -1 ? (
                                    <CustomDropdown
                                        data={[6, 7, 8, 9, 10].map((grade) => ({ label: grade.toString(), value: grade }))}
                                        labelField="label"
                                        valueField="value"
                                        value={grades[subject.subjectName]}
                                        onChange={({ value }) => handleGradeChange(subject.subjectName, value)}
                                    />
                                ) : (
                                    subject.grade
                                )}
                            </DataTable.Cell>
                            <DataTable.Cell>{formattedDate}</DataTable.Cell>
                        </DataTable.Row>
                    );
                })}
            </DataTable>
            {average !== null && (
                <Text style={styles.averageText}>Prosek: {average.toFixed(2)}</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        width: '100%',
        padding: 16,
    },
    heading: {
        fontSize: 24, 
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
    },
    averageText: {
        marginTop: 24,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 60,
    },
    dropdownContainer: {
        marginBottom: 24,
    }
});

export default AverageGrade;
