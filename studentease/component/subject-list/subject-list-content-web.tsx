import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import StackGrid from 'react-stack-grid';
import { useTheme } from "../../context/ThemeContext";
import { I18n } from "i18n-js";
import { Subject } from "../../model/Subject";

type SubjectListContentWebProp = {
    i18n: I18n,
    subjects: Subject[]
}

function SubjectListContentWeb({i18n, subjects}: SubjectListContentWebProp) {
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
        const colorGroup = themeColors[(colorGroupIndex * 2 + rowIndex) % themeColors.length];
    
        return colorGroup[colorPosition];
    }; 

    return (
        <StackGrid
        columnWidth={'30%'}
        gutter={15}
        style={styles.contentGrid}
        >
            {subjects.map((subject, index) => (
                <TouchableOpacity key={index} 
                    onPress={() => { router.navigate(`/repository/${subject.id}`) }}>
                    <Card style={[ styles.cardContent, { backgroundColor: getColorForSubject(subject.id - 1, theme) }]}>
                        <Card.Content>
                            <Text style={theme === 'light' ? styles.titleLight : styles.titleDark}>
                                {subject.name}
                            </Text>
                            <Text style={theme === 'light' ? styles.infoLight : styles.infoDark}>
                                {i18n.t('subjectList_professor') + subject.professorName}
                            </Text>
                            <Text style={theme === 'light' ? styles.infoLight : styles.infoDark}>
                                {i18n.t('subjectList_college') + subject.collegeName}
                            </Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            ))}
        </StackGrid>
    )
}

const styles = StyleSheet.create({
    cardContent: {
        padding: 10,
        margin: 10
    },

    contentGrid: {
        marginTop: 20,
        width: '80%',
        alignSelf:'center',
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

    titleDark: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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

export default SubjectListContentWeb;