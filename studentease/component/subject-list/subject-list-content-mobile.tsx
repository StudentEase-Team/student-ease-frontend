import { router } from "expo-router";
import React from "react";
import { View, TouchableOpacity, Platform, StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import { I18n } from "i18n-js";
import { Subject } from "../../model/Subject";

type SubjectListContentMobileProp = {
    i18n: I18n,
    subjects: Subject[]
}

function SubjectListContentMobile({i18n, subjects}: SubjectListContentMobileProp) {
    const {theme} = useTheme();

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

    return (
        <View style={styles.contentGridMobile}>
            {subjects.map((subject, index) => (
                <TouchableOpacity key={index} style={Platform.OS === 'web' ? styles.cardContent : styles.cardContentMobile}
                    onPress={() => { router.navigate(`/repository/${subject.id}`) }}>
                    <Card style={[styles.card, { backgroundColor: getColorForSubject(subject.id - 1, theme) }]}>
                        <Card.Content>
                            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>
                                {subject.name}
                            </Text>
                            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.infoLight : styles.infoDark) : (theme === 'light' ? styles.infoLightMobile : styles.infoDarkMobile)}>
                                {i18n.t('subjectList_professor') + subject.professorName}
                            </Text>
                            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.infoLight : styles.infoDark) : (theme === 'light' ? styles.infoLightMobile : styles.infoDarkMobile)}>
                                {i18n.t('subjectList_college') + subject.collegeName}
                            </Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    cardContent: {
        margin: 5
    },

    card: {
        borderRadius: 15,
        marginBottom: 10,
        padding: 10,
    },

    contentGridMobile: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: 10
    },

    cardContentMobile: {
        width: '100%'
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
})

export default SubjectListContentMobile;