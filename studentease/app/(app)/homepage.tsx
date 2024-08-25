import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { I18n } from 'i18n-js';
import { translations } from '../../localization';
import { LocaleContext } from '../../context/LocaleContext';

const HomePage = () => {
    const router = useRouter();
    const { theme } = useTheme();
    const { userState } = useAuth();

    const i18n = new I18n(translations)
    const { locale } = useContext(LocaleContext);
    i18n.locale = locale

    const adminCards = [
        { title: i18n.t('adminCards_showNoticeboard'), route: '/noticeboard', lightColors: ['#ff6a88', '#f78fb3'], darkColors: ['#4e54c8', '#8f94fb'] },
        { title: i18n.t('adminCards_collegeList'), route: '/college-list', lightColors: ['#9b6ecc', '#d0b3ff'], darkColors: ['#6a3093', '#a044ff'] },
        { title: i18n.t('adminCards_subjectList'), route: '/subject-list', lightColors: ['#f5a623', '#fbd786'], darkColors: ['#333333', '#4c4c4c'] },
        { title: i18n.t('adminCards_createUser'), route: '/user-creation', lightColors: ['#67e6dc', '#3dc1d3'], darkColors: ['#2c3e50', '#4ca1af'] },
        { title: i18n.t('adminCards_answerFAQ'), route: 'faq/faq-answer', lightColors: ['#fd22a8', '#ffb6b9'], darkColors: ['#2b5876', '#4e4376'] },
    ];

    const professorCards = [
        { title: i18n.t('professorCards_showNoticeboard'), route: '/noticeboard', lightColors: ['#ff6a88', '#f78fb3'], darkColors: ['#4e54c8', '#8f94fb'] },
        { title: i18n.t('professorCards_subjects'), route: '/subject-list', lightColors: ['#67e6dc', '#3dc1d3'], darkColors: ['#2c3e50', '#4ca1af'] },
        { title: i18n.t('professorCards_answerFAQ'), route: 'faq/faq-answer', lightColors: ['#fd22a8', '#ffb6b9'], darkColors: ['#2b5876', '#4e4376'] },
        { title: i18n.t('professorCards_seeCalendar'), route: 'calendar', lightColors: ['#9b6ecc', '#d0b3ff'], darkColors: ['#6a3093', '#a044ff'] },
    ];

    const studentCards = [
        { title: i18n.t('studentCards_showNoticeboard'), route: '/noticeboard', lightColors: ['#ff6a88', '#f78fb3'], darkColors: ['#4e54c8', '#8f94fb'] },
        { title: i18n.t('studentCards_showFAQ'), route: 'faq/faq-show', lightColors: ['#9b6ecc', '#d0b3ff'], darkColors: ['#6a3093', '#a044ff'] },
        { title: i18n.t('studentCards_calculateGrades'), route: 'average-grade', lightColors: ['#f5a623', '#fbd786'], darkColors: ['#333333', '#4c4c4c'] },
        { title: i18n.t('studentCards_seeCalendar'), route: 'calendar', lightColors: ['#67e6dc', '#3dc1d3'], darkColors: ['#2b5876', '#4e4376'] },
    ];

    let cardsToShow: { title: string; route: string; lightColors: string[]; darkColors: string[]; }[] = [];

    if (userState?.role === 'ADMIN') {
        cardsToShow = adminCards;
    } else if (userState?.role === 'PROFESSOR') {
        cardsToShow = professorCards;
    } else if (userState?.role === 'STUDENT') {
        cardsToShow = studentCards;
    }

    return (
        <ScrollView style={Platform.OS === 'web' ? (theme === 'light' ? styles.pageContainerLight : styles.pageContainerDark) : (theme === 'light' ? styles.pageContainerLightMobile : styles.pageContainerDarkMobile)}>
            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.welcomeTextLight : styles.welcomeTextDark) : (theme === 'light' ? styles.welcomeTextLightMobile : styles.welcomeTextDarkMobile)}>{i18n.t('welcomeBack')}</Text>
            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.quoteTextLight : styles.quoteTextDark) : (theme === 'light' ? styles.quoteTextLightMobile : styles.quoteTextDarkMobile)}>{i18n.t('quoteText')}</Text>
            <View style={Platform.OS === 'web' ? styles.cardContainer : styles.cardContainerMobile}>
                {cardsToShow.map((card, index) => (
                    <TouchableOpacity activeOpacity={0.7} key={index} onPress={() => { router.push(card.route) }}>
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
    pageContainerLight: {
        flex: 1,
        padding: 40,
        backgroundColor: '#fff',
    },

    pageContainerLightMobile: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },

    pageContainerDark: {
        flex: 1,
        padding: 40,
        backgroundColor: '#18191a',
    },

    pageContainerDarkMobile: {
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
        marginBottom: 40,
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
        marginBottom: 40,
        color: 'white',
    },

    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '45%',
        alignSelf: 'center',
    },

    cardContainerMobile: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
        alignSelf: 'center',
        marginTop: 40
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
        textAlign: 'center'
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
        textAlign: 'center'
    },

    cardTitleDarkMobile: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomePage;
