import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Platform, Pressable } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import SubjectGrade from '../../model/SubjectGrade';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '@env';
import { Card, DataTable, Text } from 'react-native-paper';
import CustomDropdown from '../../component/form/custom-dropdown';
import { useTheme } from '../../context/ThemeContext';

type FilterType = 
  | 'ALL'
  | '1'
  | '2'
  | '3'
  | '4';

function AverageGrade() {
    const { userState } = useAuth();
    const config = {
        headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
    };
    const [passedSubjects, setPassedSubjects] = useState<SubjectGrade[]>([]);
    const [failedSubjects, setFailedSubjects] = useState<SubjectGrade[]>([]);
    const [year, setYear] = useState('all');
    const [grades, setGrades] = useState<{ [key: string]: number }>({});
    const {theme} = useTheme();
    const [selectedFilterType, setSelectedFilterType] = useState<FilterType | null>('ALL');

    const filterOptions: { value: FilterType; label: string }[] = [
        { label: 'Any', value: 'ALL' },
        { label: 'First', value: '1' },
        { label: 'Second', value: '2' },
        { label: 'Third', value: '3' },
        { label: 'Fourth', value: '4' }
    ];

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

    const handleYearChange = (value: FilterType) => {
        if(value === 'ALL') {
            setYear('all');
        }
        else if(value === '1') {
            setYear('1');
        }
        else if(value === '2') {
            setYear('2');
        }
        else if(value === '3') {
            setYear('3');
        }
        else if(value === '4') {
            setYear('4');
        }
        setSelectedFilterType(value);
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
        <ScrollView style={theme === 'light' ? styles.pageContainerLight : styles.pageContainerDark}>
            <View style={styles.container}>
                {filterOptions.map((option) => (
                <View style={Platform.OS === 'web' ? styles.radioButtons : styles.radioButtonsMobile} key={option.value}>
                    <Pressable key={option.value} style={[theme === 'light' ? styles.pressableLight : styles.pressableDark, selectedFilterType === option.value ? { backgroundColor: theme === 'light' ? '#4dabf7' : '#9775fa' } : { borderColor: 'grey' },]} onPress={() => handleYearChange(option.value)}>
                        <Text style={[Platform.OS === 'web' ? styles.text : styles.textMobile, { color: selectedFilterType === option.value ? '#fff' : theme === 'light' ?  '#4dabf7' : '#9775fa' }, ]}>{option.label}</Text>
                    </Pressable>
                </View>
                ))}
            </View>

            <Card style={Platform.OS === 'web' ? theme === 'light' ? styles.qaContainerLight : styles.qaContainerDark : theme === 'light' ? styles.qaContainerLightMobile : styles.qaContainerDarkMobile}>
            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.headingLight : styles.headingDark) : (theme === 'light' ? styles.headingLightMobile : styles.headingDarkMobile)}>Subjects</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title textStyle={theme === 'light' ? {color:'black'} : {color:'white'}} style={styles.subjectWidth}>
                        <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.textLight : styles.textDark) : (theme === 'light' ? styles.textLightMobile : styles.textDarkMobile)}>Subject Name</Text>
                    </DataTable.Title>
                    <DataTable.Title textStyle={theme === 'light' ? {color:'black'} : {color:'white'}} style={styles.gradeWidth}>
                    <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.textLight : styles.textDark) : (theme === 'light' ? styles.textLightMobile : styles.textDarkMobile)}>Grade</Text>
                    </DataTable.Title>
                    <DataTable.Title textStyle={theme === 'light' ? {color:'black'} : {color:'white'}} style={styles.dateWidth}>
                        <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.textLight : styles.textDark) : (theme === 'light' ? styles.textLightMobile : styles.textDarkMobile)}>Date</Text>
                    </DataTable.Title>
                </DataTable.Header>
                {combinedSubjects.map((subject) => {
                    const date = new Date(subject.date);
                    const formattedDate = isNaN(date.getTime()) ? 'Invalid date' : formatDate(date);
                    return (
                        <DataTable.Row key={subject.id}>
                            <DataTable.Cell textStyle={theme === 'light' ? {color:'black'} : {color:'white'}} style={styles.subjectWidth}>
                                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.textLight : styles.textDark) : (theme === 'light' ? styles.textLightMobile : styles.textDarkMobile)}>{subject.subjectName}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell textStyle={theme === 'light' ? {color:'black'} : {color:'white'}} style={styles.gradeWidth}>
                                {subject.grade === -1 ? (
                                    <CustomDropdown
                                        data={[6, 7, 8, 9, 10].map((grade) => ({ label: grade.toString(), value: grade }))}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={Platform.OS === 'web' ? 'Grade' : ''}
                                        style={Platform.OS === 'web' ? (theme === 'light' ? styles.dropdownLight : styles.dropdownDark) : (theme === 'light' ? styles.dropdownLightMobile : styles.dropdownDarkMobile)}
                                        value={grades[subject.subjectName]}
                                        onChange={({ value }) => handleGradeChange(subject.subjectName, value)}
                                    />
                                ) : (
                                    <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.textLight : styles.textDark) : (theme === 'light' ? styles.textLightMobile : styles.textDarkMobile)}>{subject.grade}</Text>
                                )}
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.dateWidth}>
                                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.textLight : styles.textDark) : (theme === 'light' ? styles.textLightMobile : styles.textDarkMobile)}>{formattedDate}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    );
                })}
            </DataTable>
            {average !== null && (
                <Text style={theme === 'light' ? styles.averageTextLight : styles.averageTextDark}>Average: {average.toFixed(2)}</Text>
            )}
            </Card>
            <View style={{height:150}}/>
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
    },

    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
    },

    pressableLight: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 2,
        backgroundColor: 'white',
    },

    pressableDark: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 2,
        backgroundColor: '#242526',
    },

    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    textMobile: {
        fontSize: 12,
        fontWeight: 'bold',
    },

    radioButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },

    radioButtonsMobile: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'center',
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

    dropdownContainer: {
        marginBottom: 24,
    },

    dropdownLight: {
        backgroundColor: '#f0f0f0',
        width: '70%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
    },

    dropdownLightMobile: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 5,
        fontSize: 16,
        height: 50,
        width: 75,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 0,
    },

    dropdownDark: {
        backgroundColor: "#18191a",
        width: '70%'
    },

    dropdownDarkMobile: {
        backgroundColor: "#18191a",
        borderRadius: 5,
        padding: 5, 
        fontSize: 16,
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
        flex:0.8,
        width: '30%',
        justifyContent: 'center'
    },

    textLight: {
        flexWrap:'wrap',
        fontSize: 18,
        color: 'black'
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
});

export default AverageGrade;
