import React from "react";
import { ScrollView, View, Platform, Text, StyleSheet } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import { FAQItem } from "../../model/FAQItem";
import { I18n } from "i18n-js";

type FAQAnswerContentProps = {
    items: FAQItem[],
    i18n: I18n,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentItem: React.Dispatch<React.SetStateAction<FAQItem | undefined>>
}

function FAQAnswerContent({items, i18n, setModalVisible, setCurrentItem}: FAQAnswerContentProps) {
    const { theme } = useTheme();

    return (
        <ScrollView style={theme === 'light' ? styles.pageContainerLight : styles.pageContainerDark}>
            <View style={Platform.OS === 'web' ? styles.cardContainer : styles.cardContainerMobile}>
                {items.length === 0 ? (
                    <Card style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardLight : styles.cardDark) : (theme === 'light' ? styles.cardLightMobile : styles.cardDarkMobile)}>
                        <Card.Content>
                            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardTitleLight : styles.cardTitleDark) : (theme === 'light' ? styles.cardTitleLightMobile : styles.cardTitleDarkMobile)}>
                                {i18n.t('faq_noQuestions')}
                            </Text>
                        </Card.Content>
                    </Card>
                ) : (
                    items.map((item, index) => (
                        <Card key={index} style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardLight : styles.cardDark) : (theme === 'light' ? styles.cardLightMobile : styles.cardDarkMobile)}>
                            <Card.Content>
                                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardTitleLight : styles.cardTitleDark) : (theme === 'light' ? styles.cardTitleLightMobile : styles.cardTitleDarkMobile)}>
                                    {item.question}
                                </Text>
                                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardDescriptionLight : styles.cardDescriptionDark) : (theme === 'light' ? styles.cardDescriptionLightMobile : styles.cardDescriptionDarkMobile)}>
                                    {item.answer}
                                </Text>
                            </Card.Content>
                            <Card.Actions>
                                <IconButton icon="forum" mode={theme === 'light' ? 'contained' : 'outlined'} iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'} onPress={() => {setModalVisible(true); setCurrentItem(item)}}/>
                            </Card.Actions>
                        </Card>
                    ))
                )}
            </View>
        </ScrollView>
    )
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

    cardContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20,
    },

    cardContainerMobile: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    
    cardLight: {
        backgroundColor: 'white',
        width: '60%'
    },

    cardLightMobile: {
        backgroundColor: 'white',
        width: '100%'
    },

    cardDark: {
        backgroundColor: '#242526',
        width: '60%'
    },

    cardDarkMobile: {
        backgroundColor: '#242526',
        width: '100%'
    },

    cardTitleLight: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black', 
    },

    cardTitleLightMobile: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },

    cardTitleDark: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },

    cardTitleDarkMobile: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },

    cardDescriptionLight: {
        fontSize: 18,
        marginVertical: 5,
    },

    cardDescriptionLightMobile: {
        fontSize: 16,
        marginVertical: 5,
    },

    cardDescriptionDark: {
        fontSize: 18,
        marginVertical: 5,
        color: 'white'
    },

    cardDescriptionDarkMobile: {
        fontSize: 16,
        marginVertical: 5,
        color: 'white'
    },
})

export default FAQAnswerContent;