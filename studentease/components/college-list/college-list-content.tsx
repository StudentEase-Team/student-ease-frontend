import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import { I18n } from "i18n-js";
import { College } from "../../model/College";

type CollegeListContentProps = {
    i18n: I18n,
    items: College[] | undefined
}

function CollegeListContent({ i18n, items }: CollegeListContentProps) {
    const { theme } = useTheme();

    return (
        <View style={Platform.OS === 'web' ? styles.contentGrid : styles.contentGridMobile}>
            {items?.map((item, index) => (
                <Card key={index} style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardLight : styles.cardDark) : (theme === 'light' ? styles.cardLightMobile : styles.cardDarkMobile)}>
                    <Card.Content>
                        <Title style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardTitleLight : styles.cardTitleDark) : (theme === 'light' ? styles.cardTitleLightMobile : styles.cardTitleDarkMobile)}>
                            {item.name}
                        </Title>
                        <Paragraph style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardDescriptionLight : styles.cardDescriptionDark) : (theme === 'light' ? styles.cardDescriptionLightMobile : styles.cardDescriptionDarkMobile)}>
                            {i18n.t('college_abbreviation')}: {item.abbreviation}
                        </Paragraph>
                        <Paragraph style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardDescriptionLight : styles.cardDescriptionDark) : (theme === 'light' ? styles.cardDescriptionLightMobile : styles.cardDescriptionDarkMobile)}>
                            {i18n.t('college_address')}: {item.address}
                        </Paragraph>
                        <Paragraph style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardDescriptionLight : styles.cardDescriptionDark) : (theme === 'light' ? styles.cardDescriptionLightMobile : styles.cardDescriptionDarkMobile)}>
                            {i18n.t('college_phone')}: {item.phoneNumber}
                        </Paragraph>
                        <Paragraph style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardDescriptionLight : styles.cardDescriptionDark) : (theme === 'light' ? styles.cardDescriptionLightMobile : styles.cardDescriptionDarkMobile)}>
                            {i18n.t('college_email')}: {item.email}
                        </Paragraph>
                    </Card.Content>

                    <Card.Actions>
                        <IconButton
                            icon="pencil"
                            mode={theme === 'light' ? 'contained' : 'outlined'}
                            size={25}
                            iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}
                            onPress={() => console.log('Edit', index)} />
                        <IconButton
                            icon="delete"
                            mode={theme === 'light' ? 'contained' : 'outlined'}
                            size={25}
                            iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}
                            onPress={() => console.log('Delete', index)} />
                    </Card.Actions>
                </Card>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    contentGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginTop: 20
    },

    contentGridMobile: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },

    cardLight: {
        marginTop: 15,
        width: '30%',
        backgroundColor: 'white',
    },

    cardDark: {
        marginTop: 15,
        width: '30%',
        backgroundColor: '#242526',
    },

    cardLightMobile: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'white',
    },

    cardDarkMobile: {
        width: '100%',
        marginTop: 15,
        backgroundColor: '#242526',
    },

    cardTitleLight: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },

    cardTitleLightMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },

    cardTitleDark: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },

    cardTitleDarkMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },

    cardDescriptionLight: {
        fontSize: 18,
        marginVertical: 5,
        color: 'black'
    },

    cardDescriptionLightMobile: {
        fontSize: 16,
        marginVertical: 5,
        color: 'black'
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

export default CollegeListContent;