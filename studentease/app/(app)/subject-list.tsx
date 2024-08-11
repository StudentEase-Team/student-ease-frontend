import React, { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Platform } from 'react-native';
import { Text, Card, Searchbar, PaperProvider } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import CollegeSubjectDropdownsRow from '../../component/form/college-subject-row';
import CollegeSubjectDropdowns from '../../component/form/college-subject';
import { useAuth } from '../../context/AuthContext';
import { themeDark, themeLight } from '../../context/PaperTheme';
import { API_BASE_URL } from '@env';
import axios, { AxiosResponse } from 'axios';
import { Subject } from '../../model/Subject';
import Toast from 'react-native-toast-message';
import { useFocusEffect, useRouter } from 'expo-router';
import CustomDropdown from '../../component/form/custom-dropdown';
import { College } from '../../model/College';

const colors = {
    light: [
        ['#AB47BC', '#42A5F5', '#E57373'], // Prvi red
        ['#F06292', '#004D40', '#AB47BC']  // Drugi red
    ],
    dark: [
        ['#6A1B9A', '#1E88E5', '#D32F2F'], // Prvi red
        ['#C2185B', '#00796B', '#6A1B9A']  // Drugi red
    ],
};

const getColorForSubject = (index: number, theme: string) => {
    const themeColors = colors[theme];
    const rowIndex = Math.floor(index / 3) % 2; // 0 for first row, 1 for second row
    const colorIndex = index % 3;
    return themeColors[rowIndex][colorIndex];
};

const SubjectPage = () => {
    const initialCollegeData = [{ label: 'Any', value: 'any' }];
    const { theme } = useTheme();
    const { userState } = useAuth();
    const [colleges, setColleges] = useState<College[]>();
    const [collegeDropdownData, setCollegeDropdownData] = useState<{ label: any, value: any }[]>(initialCollegeData);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [originalSubjects, setOriginalSubjects] = useState<Subject[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const router = useRouter();

    const fetchColleges = useCallback(async () => {
        if (!userState?.token.accessToken) return;
    
        const config = {
          headers: { Authorization: `Bearer ${userState.token.accessToken}` }
        };
        try {
          const response: AxiosResponse = await axios.get(`${API_BASE_URL}/college`, config);
          if (response.status === 200) {
            setColleges(response.data);
            const updatedCollegeData = [...response.data.map(c => ({ label: c.abbreviation, value: c.id }))];
            setCollegeDropdownData(updatedCollegeData);
          }
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Failed to noticeboard items',
          });
        }
      }, []);

    useFocusEffect(
        React.useCallback(() => {
          fetchColleges();
      }, []));

      function handleCollegeChange(selectedCollege: { label: any, value: number }) {
            if (colleges !== undefined) {
                const selectedCollegeData = colleges.find(college => college.id === selectedCollege.value);
                if (selectedCollegeData) {
                    setSubjects(selectedCollegeData.subjects);
                    setOriginalSubjects(selectedCollegeData.subjects);
                } else {
                    setSubjects([]);
                    setOriginalSubjects([]);
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

    return (
        <ScrollView style={theme === 'light' ? styles.containerLight : styles.containerDark}>
            <View style={Platform.OS === 'web' ? (theme === 'light' ? styles.containerFilterLight : styles.containerFilterDark) : (theme === 'light' ? styles.containerFilterLightMobile : styles.containerFilterDarkMobile)}>
                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleFilterLight : styles.titleFilterDark) : (theme === 'light' ? styles.titleFilterLightMobile : styles.titleFilterDarkMobile)}>Filter by parameters</Text>
                {Platform.OS === 'web'? (
                    <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                        <CustomDropdown style={{width:'48%'}}
                        data={collegeDropdownData} 
                        labelField={'label'} 
                        valueField={'value'} 
                        onChange={handleCollegeChange}></CustomDropdown>
                        <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
                            <Searchbar 
                            style={{width:'100%'}}
                            value={searchQuery}
                            onChangeText={handleSearchChange}
                            ></Searchbar>
                        </PaperProvider>
                    </View>
                ):(
                    <View style={styles.inputColumn}>
                        <CustomDropdown style={{width:'48%'}}
                        data={[]} 
                        labelField={''} 
                        valueField={''} 
                        onChange={handleCollegeChange}></CustomDropdown>

                    <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
                        <Searchbar 
                        style={{width:'100%'}}
                        onChangeText={handleSearchChange}
                        value={searchQuery}></Searchbar>
                    </PaperProvider>
                    </View>
                )}
            </View>

            <View style={Platform.OS === 'web' ? styles.contentGrid : styles.contentGridMobile}>
                {subjects.map((subject, index) => (
                    <TouchableOpacity key={index} style={Platform.OS === 'web' ? styles.cardContent : styles.cardContentMobile}
                        onPress={() => {router.navigate(`/repository/${subject.id}`)}}
                    >
                        <Card style={[styles.card, { backgroundColor: getColorForSubject(subject.id - 1, theme) }]}>
                            <Card.Content>
                                <Text style={theme === 'light' ? styles.titleLight : styles.titleDark}>{subject.name}</Text>
                                <Text style={theme === 'light' ? styles.infoLight : styles.infoDark}>Professor: {subject.professorName}</Text>
                                <Text style={theme === 'light' ? styles.infoLight : styles.infoDark}>College: {subject.collegeName}</Text>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{height: 50}}></View>
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
    },

    containerFilterLight: {
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '70%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
        alignSelf: 'center',
    },

    containerFilterLightMobile: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    containerFilterDark: {
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: '#242526',
        borderRadius: 20,
        width: '70%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
        alignSelf: 'center'
    },

    containerFilterDarkMobile: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: '#242526',
        borderRadius: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    titleFilterLight: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 30,
        color: 'black',
        marginLeft: 9,
    },

    titleFilterLightMobile: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        color: 'black'
    },

    titleFilterDark: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 30,
        color: 'white',
        marginLeft: 9,
    },

    titleFilterDarkMobile: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        color: 'white'
    },

    contentGrid: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        marginTop: 20,
        width: '90%',
        alignSelf: 'center'
    },

    contentGridMobile: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: 10
    },

    inputColumn: {
        flexDirection: 'column',
        width: '100%',
    },

    cardContent: {
        width: '28%'
    },

    cardContentMobile: {
        width: '100%'
    },

    card: {
        borderRadius: 20,
        marginBottom: 16,
        padding: 16,
    },

    titleLight: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white',
    },
    
    titleDark: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white',
    },
    
    infoLight: {
        fontSize: 18,
        color: 'white',
    },

    infoDark: {
        fontSize: 18,
        color: 'white',
    },
});

export default SubjectPage;
