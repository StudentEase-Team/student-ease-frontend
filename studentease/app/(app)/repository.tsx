import React from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import { Text, Card, IconButton, Paragraph, TextInput, PaperProvider } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import { themeDark, themeLight } from '../../context/PaperTheme';

const materials = [
    { type: 'Video materijal', description: 'Predavanje o algoritmima', details: 'Ovo je video materijal koji pokriva osnove algoritama i njihovu implementaciju u različitim programskim jezicima.', icon: 'video', lightColor: '#80cbc4', darkColor: '#546e7a' },
    { type: 'Prezentacija', description: 'Prezentacija za seminar', details: 'Prezentacija koja obuhvata ključne tačke i rezultate seminara o pravnim aspektima poslovanja.', icon: 'presentation', lightColor: '#ffcc80', darkColor: '#bd9424' },
    { type: 'Dokument', description: 'Skripta za pripremu ispita', details: 'Detaljna skripta koja sadrži sve neophodne informacije za uspešnu pripremu ispita iz hemije.', icon: 'file-document', lightColor: '#b39ddb', darkColor: '#5e35b1' },
    { type: 'Program', description: 'Kod za vežbe iz programiranja', details: 'Kod primeri i zadaci za vežbe iz programiranja u jeziku Python.', icon: 'code-tags', lightColor: '#ffab91', darkColor: '#6d4c41' },
    { type: 'Ostalo', description: 'Razni dodatni materijali', details: 'Razni dodatni materijali koji pomažu u boljem razumevanju gradiva.', icon: 'folder', lightColor: '#ffccbc', darkColor: '#424242' },
];

const MaterialPage = () => {
    const { theme } = useTheme();

    return (
        <ScrollView style={theme === 'light' ? styles.containerLight : styles.containerDark}>
            <View style={Platform.OS === 'web' ? (theme === 'light' ? styles.containerSearchLight : styles.containerSearchDark) : (theme === 'light' ? styles.containerSearchLightMobile : styles.containerSearchDarkMobile)}>
                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleFilterLight : styles.titleFilterDark) : (theme === 'light' ? styles.titleFilterLightMobile : styles.titleFilterDarkMobile)}>Search</Text>
                <View style={styles.searchSortGrid}>
                    <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
                    <TextInput
                        label="Search..."
                        mode="outlined"
                        style={Platform.OS === 'web'? (theme === 'light' ? styles.inputLight : styles.inputDark): (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}>
                    </TextInput>
                    </PaperProvider>
                </View>
            </View>

            <View style={Platform.OS === 'web' ? styles.containerContent : styles.containerContentMobile}>
                {materials.map((material, index) => (
                    <Card key={index} style={[Platform.OS === 'web' ? styles.card : styles.cardMobile, { backgroundColor: theme === 'light' ? material.lightColor : material.darkColor }]}>
                        <Card.Content style={styles.cardContent}>
                            <IconButton icon={material.icon} size={Platform.OS === 'web' ? 60 : 30} style={Platform.OS === 'web' ? styles.icon : styles.iconMobile} iconColor={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'}/>
                            <View style={styles.textContainer}>
                                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>{material.type}</Text>
                                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>{material.description}</Text>
                                <Paragraph style={Platform.OS === 'web' ? (theme === 'light' ? styles.detailsLight : styles.detailsDark) : (theme === 'light' ? styles.detailsLightMobile : styles.detailsDarkMobile)}>{material.details}</Paragraph>
                            </View>
                        </Card.Content>
                    </Card>
                ))}
            </View>
            <View style={{height: 10}}></View>
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

    containerSearchLight: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 40,
        backgroundColor: 'white',
        width: '70%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
        alignSelf: 'center',
    },

    containerSearchLightMobile: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    containerSearchDark: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 40,
        backgroundColor: '#242526',
        width: '70%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
        alignSelf: 'center',
    },

    containerSearchDarkMobile: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: '#242526',
        width: '100%',
        borderRadius: 20,
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
        marginBottom: 10,
        color: 'black'
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
        marginBottom: 10,
        color: 'white'
    },

    titleFilterDarkMobile: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        color: 'white'
    },

    searchSortGrid: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },

    inputLight: {
        marginTop: 10,
        color: '#242526',
        height: 45
    },

    inputLightMobile: {
        marginTop: 10,
        color: '#242526',
        width: '100%',
        alignSelf: 'center',
        height: 45,
    },
    
    inputDark: {
        marginTop: 10,
        color: 'white',
        height: 45
    },

    inputDarkMobile: {
        marginTop: 10,
        color: 'white',
        width: '100%',
        alignSelf: 'center',
        height: 45,
        fontSize: 14
    },

    containerContent: {
        width: '70%',
        alignSelf: 'center',
    },

    containerContentMobile: {
        width: '100%',
        flex: 1,
        flexDirection: 'column'
    },

    card: {
        borderRadius: 10,
        marginBottom: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },

    cardMobile: {
        borderRadius: 10,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },

    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    icon: {
        marginRight: 40,
    },

    iconMobile: {
        marginRight: 20,
    },

    textContainer: {
        flexDirection: 'column',
        width: '80%'
    },

    titleLight: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },

    titleLightMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 4,
    },

    titleDark: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },

    titleDarkMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },

    descriptionLight: {
        fontSize: 18,
        color: 'black',
        marginBottom: 4,
    },

    descriptionLightMobile: {
        fontSize: 16,
        color: 'black',
        marginBottom: 4,
    },
    
    descriptionDark: {
        fontSize: 18,
        color: 'white',
        marginBottom: 4,
    },

    descriptionDarkMobile: {
        fontSize: 16,
        color: 'white',
        marginBottom: 4,
    },

    detailsLight: {
        fontSize: 16,
        color: 'black',
    },

    detailsLightMobile: {
        fontSize: 14,
        color: 'black',
    },

    detailsDark: {
        fontSize: 16,
        color: 'white',
    },

    detailsDarkMobile: {
        fontSize: 14,
        color: 'white',
    },
});

export default MaterialPage;
