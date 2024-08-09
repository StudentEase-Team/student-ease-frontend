import React, { useMemo } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Platform } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import CollegeSubjectDropdownsRow from '../../component/form/college-subject-row';
import CollegeSubjectDropdowns from '../../component/form/college-subject';

const colors = {
    light: ['#AB47BC', '#42A5F5', '#E57373', '#F06292', '#004D40'],
    dark: ['#6A1B9A', '#1E88E5', '#D32F2F', '#C2185B', '#00796B'],
};

const colorMapping = new Map<string, string>();

const getColorForSubject = (title: string, theme: string) => {
    if (!colorMapping.has(title)) {
        const availableColors = colors[theme];
        const unusedColors = availableColors.filter(color => !Array.from(colorMapping.values()).includes(color));
        const color = unusedColors.length > 0
            ? unusedColors[Math.floor(Math.random() * unusedColors.length)]
            : availableColors[Math.floor(Math.random() * availableColors.length)];
        colorMapping.set(title, color);
    }
    return colorMapping.get(title) || '#FFFFFF';
};

const subjects = [
    { title: 'Programiranje', professor: 'Dr. Marko Janković', college: 'FTN' },
    { title: 'Ustavno pravo', professor: 'Prof. Jovana Milinković', college: 'Pravni' },
    { title: 'Hemija', professor: 'Dr. Nikola Stojanović', college: 'PMF' },
    { title: 'Agroekonomija', professor: 'Prof. Ljubica Ćosić', college: 'Poljoprivredni' },
    { title: 'Ekonomija', professor: 'Dr. Stefan Jovanović', college: 'Ekonomski' },
    { title: 'Osnovi elektrotehnike', professor: 'Dr. Marko Petrović', college: 'FTN' },
];

const SubjectPage = () => {
    const { theme } = useTheme();

    return (
        <ScrollView style={theme === 'light' ? styles.containerLight : styles.containerDark}>
            <View style={Platform.OS === 'web' ? (theme === 'light' ? styles.containerFilterLight : styles.containerFilterDark) : (theme === 'light' ? styles.containerFilterLightMobile : styles.containerFilterDarkMobile)}>
                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleFilterLight : styles.titleFilterDark) : (theme === 'light' ? styles.titleFilterLightMobile : styles.titleFilterDarkMobile)}>Filter by parameters</Text>
                {Platform.OS === 'web'? (
                    <CollegeSubjectDropdownsRow filterableData={[]} collegeEnabled={false} subjectEnabled={false} setSelectedCollege={function (value: React.SetStateAction<string>): void {
                        throw new Error('Function not implemented.');
                    } } setSelectedCollegeID={function (value: React.SetStateAction<number>): void {
                        throw new Error('Function not implemented.');
                    } } setSelectedSubject={function (value: React.SetStateAction<string>): void {
                        throw new Error('Function not implemented.');
                    } } setSelectedSubjectID={function (value: React.SetStateAction<number>): void {
                        throw new Error('Function not implemented.');
                    } } anyEnabled={false}/>
                ):(
                    <View style={styles.inputColumn}>
                        <CollegeSubjectDropdowns filterableData={[]} collegeEnabled={false} subjectEnabled={false} setSelectedCollege={function (value: React.SetStateAction<string>): void {
                                throw new Error('Function not implemented.');
                            } } setSelectedCollegeID={function (value: React.SetStateAction<number>): void {
                                throw new Error('Function not implemented.');
                            } } setSelectedSubject={function (value: React.SetStateAction<string>): void {
                                throw new Error('Function not implemented.');
                            } } setSelectedSubjectID={function (value: React.SetStateAction<number>): void {
                                throw new Error('Function not implemented.');
                            } } anyEnabled={false}/>
                    </View>
                )}
  
            </View>

            <View style={Platform.OS === 'web' ? styles.contentGrid : styles.contentGridMobile}>
            {subjects.map((subject, index) => (
                <TouchableOpacity key={index} style={Platform.OS === 'web' ? styles.cardContent : styles.cardContentMobile}>
                    <Card style={[styles.card, { backgroundColor: getColorForSubject(subject.title, theme) }]}>
                        <Card.Content>
                            <Text style={theme === 'light' ? styles.titleLight : styles.titleDark}>{subject.title}</Text>
                            <Text style={theme === 'light' ? styles.infoLight : styles.infoDark}>Professor: {subject.professor}</Text>
                            <Text style={theme === 'light' ? styles.infoLight : styles.infoDark}>College: {subject.college}</Text>
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
        justifyContent:'space-evenly',
        flexWrap:'wrap',
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
