import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Platform, TouchableHighlight, TouchableHighlightBase } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const HomePage = () => {
    const router = useRouter();
    const {theme} = useTheme();
    
    const cards = [
        { title: 'Show Noticeboard', route: '/noticeboard', lightColors: ['#ff6a88', '#f78fb3'], darkColors: ['#4e54c8', '#8f94fb'] },
        { title: 'Show FAQ', route: 'faq/faq-show', lightColors: ['#9b6ecc', '#d0b3ff'], darkColors: ['#6a3093', '#a044ff'] },
        { title: 'Calculate your grades', route: 'average-grade', lightColors: ['#f5a623', '#fbd786'], darkColors: ['#333333', '#4c4c4c'] },
        { title: 'Repository', route: 'Repository', lightColors: ['#67e6dc', '#3dc1d3'], darkColors: ['#2c3e50', '#4ca1af'] },
        { title: 'See your calendar', route: 'See Calendar', lightColors: ['#fd79a8', '#ffb6b9'], darkColors: ['#2b5876', '#4e4376'] },
    ];

    return (
        <ScrollView style={Platform.OS === 'web' ? (theme === 'light' ? styles.containerLight : styles.containerDark) : (theme === 'light' ? styles.containerLightMobile : styles.containerDarkMobile)}>
            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.welcomeTextLight : styles.welcomeTextDark) : (theme === 'light' ? styles.welcomeTextLightMobile : styles.welcomeTextDarkMobile)}>Welcome back, Ana!</Text>
            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.quoteTextLight : styles.quoteTextDark) : (theme === 'light' ? styles.quoteTextLightMobile : styles.quoteTextDarkMobile)}>“Education is the most powerful weapon which you can use to change the world.” – Nelson Mandela</Text>
            <View style={Platform.OS === 'web' ? styles.cardContainer : styles.cardContainerMobile}>
                {cards.map((card, index) => (
                    <TouchableOpacity activeOpacity={0.7} key={index} onPress={ () => {router.push(card.route)}}>
                        <LinearGradient key={index} colors={theme === 'light' ? card.lightColors : card.darkColors} style={Platform.OS === 'web' ? styles.gradient : styles.gradientMobile}>
                            <View style={styles.cardContent}>
                                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardTitleLight : styles.cardTitleDark) : (theme === 'light' ? styles.cardTitleLightMobile : styles.cardTitleDarkMobile)}>{card.title}</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        padding: 40,
        backgroundColor: '#fff',
    },

    containerLightMobile: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },

    containerDark: {
        flex: 1,
        padding: 40,
        backgroundColor: '#18191a',
    },

    containerDarkMobile: {
        flex: 1,
        padding: 20,
        backgroundColor: '#18191a',
    },

    welcomeTextLight: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: 'black', 
    },

    welcomeTextLightMobile: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 16,
        color: 'black', 
    },

    welcomeTextDark: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: 'white'
    },

    welcomeTextDarkMobile: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 16,
        color: 'white'
    },

    quoteTextLight: {
        fontSize: 18,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 100,
        color: 'black',
    },

    quoteTextLightMobile: {
        fontSize: 15,
        fontStyle: 'italic',
        textAlign: 'left',
        marginBottom: 60,
        color: 'black',
    },

    quoteTextDark: {
        fontSize: 18,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 100,
        color: 'white',
    },

    quoteTextDarkMobile: {
        fontSize: 15,
        fontStyle: 'italic',
        textAlign: 'left',
        marginBottom: 60,
        color: 'white',
    },

    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '50%',
        alignSelf: 'center',
    },

    cardContainerMobile: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '90%',
        alignSelf: 'center',
    },

    gradient: {
        borderRadius: 20,
        marginBottom: 16,
        width: 300,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },

    gradientMobile: {
        borderRadius: 20,
        marginBottom: 16,
        width: 160,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardTitleLight: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },

    cardTitleLightMobile: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    cardTitleDark: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    cardTitleDarkMobile: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomePage;
