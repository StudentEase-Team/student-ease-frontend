import React from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import { Text, Card, IconButton, Paragraph, TextInput, PaperProvider, Searchbar } from 'react-native-paper';
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
            <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
                <Searchbar value='' placeholder="Search" style={Platform.OS === 'web'? styles.searchBar : styles.searchBarMobile}></Searchbar>
            </PaperProvider>

            <View style={Platform.OS === 'web' ? styles.containerContent : styles.containerContentMobile}>
                {materials.map((material, index) => (
                    <Card key={index} style={[Platform.OS === 'web' ? styles.card : styles.cardMobile, { backgroundColor: theme === 'light' ? material.lightColor : material.darkColor }]}>
                        <Card.Content style={styles.cardContent}>
                            <IconButton icon={material.icon} size={Platform.OS === 'web' ? 60 : 30} style={Platform.OS === 'web' ? styles.icon : styles.iconMobile} iconColor={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'}/>
                            <View style={Platform.OS === 'web' ? styles.textContainer : styles.textContainerMobile}>
                                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>{material.type}</Text>
                                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>{material.description}</Text>
                                <Paragraph style={Platform.OS === 'web' ? (theme === 'light' ? styles.detailsLight : styles.detailsDark) : (theme === 'light' ? styles.detailsLightMobile : styles.detailsDarkMobile)}>{material.details}</Paragraph>
                            </View>
                        </Card.Content>
                    </Card>
                ))}
            </View>
            <View style={{height: 20}}></View>
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
        marginBottom: 50,
        width: '40%',
        alignSelf: 'center',
        borderRadius: 10,
        height: 60
    },
    
    searchBarMobile: {
        marginTop: 10,
        marginBottom: 30,
        alignSelf: 'center',
        borderRadius: 10,
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
        width: '100%'
    },

    textContainerMobile: {
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
        width: '100%'
    },

    descriptionDarkMobile: {
        fontSize: 16,
        color: 'white',
        marginBottom: 4,
    },

    detailsLight: {
        fontSize: 16,
        color: 'black',
        flexWrap: 'wrap'
    },

    detailsLightMobile: {
        fontSize: 14,
        color: 'black',
        flexWrap: 'wrap',
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
