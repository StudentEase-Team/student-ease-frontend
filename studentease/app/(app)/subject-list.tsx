import React, { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Platform } from 'react-native';
import { Text, Card, Searchbar, PaperProvider } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
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
        ['#8E24AA', '#1976D2', '#D32F2F'],
        ['#E91E63', '#00796B', '#8E24AA'],
        ['#5C6BC0', '#66BB6A', '#FFA726'], 
        ['#00897B', '#7B1FA2', '#FF7043'],
        ['#7E57C2', '#F4511E', '#9CCC65'],
        ['#3949AB', '#EF5350', '#42A5F5'],
        ['#FB8C00', '#6D4C41', '#26A69A'],
        ['#FF7043', '#7E57C2', '#26C6DA'],
        ['#9CCC65', '#FF5722', '#66BB6A'],
        ['#26C6DA', '#EF5350', '#5C6BC0'],
        ['#FFA726', '#EC407A', '#66BB6A']
    ],    
    
    dark: [
        ['#8E24AA', '#2196F3', '#E57373'],
        ['#EC407A', '#00897B', '#8E24AA'],
        ['#3949AB', '#2E7D32', '#FBC02D'],  
        ['#00796B', '#8E24AA', '#F57C00'],
        ['#673AB7', '#FF5722', '#689F38'],
        ['#303F9F', '#D32F2F', '#3949AB'],
        ['#E64A19', '#5D4037', '#00796B'],
        ['#F57C00', '#673AB7', '#26A69A'],
        ['#689F38', '#FF5722', '#2E7D32'],
        ['#26A69A', '#D32F2F', '#303F9F'],
        ['#FBC02D', '#EC407A', '#2E7D32']
    ]
};

const getColorForSubject = (index: number, theme: string) => {
    const themeColors = colors[theme];
    const colorGroupIndex = Math.floor(index / 10) % themeColors.length;
    const colorIndex = index % 10;
    const rowIndex = Math.floor(colorIndex / 3);
    const colorPosition = colorIndex % 3;
    return themeColors[colorGroupIndex * 2 + rowIndex][colorPosition];
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
                const allColleges = response.data;
                setColleges(allColleges);
    
                const allSubjects = allColleges.reduce((acc: Subject[], college: College) => {
                    return [...acc, ...college.subjects];
                }, []);
    
                setSubjects(allSubjects);
                setOriginalSubjects(allSubjects);
    
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
        const collegeId = typeof selectedCollege.value === 'string' ? parseInt(selectedCollege.value, 10) : selectedCollege.value;
    
        if (colleges !== undefined) {
            if (collegeId === 'any') {
                setSubjects(originalSubjects);
            } else {
                const selectedCollegeData = colleges.find(college => college.id === collegeId);
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

    return (
        <ScrollView style={theme === 'light' ? styles.containerLight : styles.containerDark}>
        {Platform.OS === 'web' ? (
            <View>
                <CustomDropdown style={{ width: '40%' }}
                data={collegeDropdownData}
                labelField={'label'}
                valueField={'value'}
                placeholder='Select a college'
                onChange={handleCollegeChange} /><PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
                    <Searchbar placeholder='Search here...' style={Platform.OS === 'web' ? styles.searchBar : styles.searchBarMobile} value={searchQuery} onChangeText={handleSearchChange} />
                </PaperProvider>
            </View>
        ) : (
            <View style={styles.inputColumn}>
                <CustomDropdown style={{ width: '100%', height: 50, padding: 5, borderRadius: 5, marginBottom: 10,}}
                    data={collegeDropdownData}
                    labelField={'label'}
                    valueField={'value'}
                    placeholder='Select a college'
                    onChange={handleCollegeChange}
                />
                <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
                    <Searchbar placeholder='Search here...' style={{ width: '100%', marginBottom: 20}} onChangeText={handleSearchChange} value={searchQuery}/>
                </PaperProvider>
            </View>
        )}

        <View style={Platform.OS === 'web' ? styles.contentGrid : styles.contentGridMobile}>
            {subjects.map((subject, index) => (
                <TouchableOpacity key={index} style={Platform.OS === 'web' ? styles.cardContent : styles.cardContentMobile}
                    onPress={() => { router.navigate(`/repository/${subject.id}`) }}>
                    <Card style={[styles.card, { backgroundColor: getColorForSubject(subject.id - 1, theme) }]}>
                        <Card.Content>
                            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>{subject.name}</Text>
                            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.infoLight : styles.infoDark) : (theme === 'light' ? styles.infoLightMobile : styles.infoDarkMobile)}>Professor: {subject.professorName}</Text>
                            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.infoLight : styles.infoDark) : (theme === 'light' ? styles.infoLightMobile : styles.infoDarkMobile)}>College: {subject.collegeName}</Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            ))}
        </View>
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
    },

    searchBar: {
        marginTop: 10,
        marginBottom: 20,
        width: '40%',
        alignSelf: 'center',
        borderRadius: 10,
        height: 60,
    },
    
    searchBarMobile: {
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center',
        borderRadius: 10,
    },

    contentGrid: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        marginTop: 40,
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
        borderRadius: 15,
        marginBottom: 10,
        padding: 10,
    },

    titleLight: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },

    titleLightMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    
    titleDark: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },

    titleDarkMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    
    infoLight: {
        fontSize: 18,
        color: 'white',
    },

    infoLightMobile: {
        fontSize: 16,
        color: 'white',
    },

    infoDark: {
        fontSize: 18,
        color: 'white',
    },

    infoDarkMobile: {
        fontSize: 16,
        color: 'white',
    },
});

export default SubjectPage;
