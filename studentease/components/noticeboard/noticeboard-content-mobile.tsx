import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from '@env';
import axios, { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { NoticeboardItem } from "../../model/NoticeboardItem";
import { I18n } from 'i18n-js';
import { translations } from '../../localization';
import { LocaleContext } from '../../context/LocaleContext';

type NoticeboardContentMobileProps = {
    items: NoticeboardItem[] | undefined,
    fetchNoticeboardItems: () => void
}

function NoticeboardContentMobile(props: NoticeboardContentMobileProps){
    const { theme } = useTheme();
    const { userState } = useAuth();
    const i18n = new I18n(translations)
    const { locale } = useContext(LocaleContext);
    i18n.locale = locale

    async function deleteNoticeboardItem(id: number) {
        if (!userState?.token.accessToken) return;

        const config = {
            headers: { Authorization: `Bearer ${userState.token.accessToken}` }
        };
        try {
            const response: AxiosResponse = await axios.delete(`${API_BASE_URL}/noticeboard/item/${id}`, config);
            if (response.status === 200) {
                props.fetchNoticeboardItems();
                Toast.show({
                    type: 'success',
                    text1: i18n.t('successfully_deleted_toast'),
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: i18n.t('failed_to_delete_toast1'),
                text2: i18n.t('failed_to_delete_toast2')
            });
        }
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <View style={styles.contentGridMobile}>
            {props.items?.map((item, index) => {
                const date = new Date(item.updatedAt);
                const formattedDate = isNaN(date.getTime()) ? 'Invalid date' : formatDate(date);
                return (
                    <Card key={index} style={theme === 'light' ? styles.cardLightMobile : styles.cardDarkMobile}>
                        <Card.Content>
                            <Title style={theme === 'light' ? styles.cardTitleLightMobile : styles.cardTitleDarkMobile}>{item.title} </Title>
                            <Paragraph style={theme === 'light' ? styles.cardDescriptionLightMobile : styles.cardDescriptionDarkMobile}>{item.message}</Paragraph>
                            <Paragraph style={theme === 'light' ? styles.cardDetailsLightMobile : styles.cardDetailsDarkMobile} >{i18n.t('noticeboardCard_date')}: {formattedDate} </Paragraph>
                            {item.creatorName !== '' && (
                                <Paragraph style={theme === 'light' ? styles.cardDetailsLightMobile : styles.cardDetailsDarkMobile}>{i18n.t('noticeboardCard_creator')}: {item.creatorName} </Paragraph>
                            )}
                            {item.subjectName !== '' && (
                                <Paragraph style={theme === 'light' ? styles.cardDetailsLightMobile : styles.cardDetailsDarkMobile}>{i18n.t('noticeboardCard_subject')}: {item.subjectName} </Paragraph>
                            )}
                            {item.collegeName !== '' && (
                                <Paragraph style={theme === 'light' ? styles.cardDetailsLightMobile : styles.cardDetailsDarkMobile}>{i18n.t('noticeboardCard_college')}: {item.collegeName} </Paragraph>
                            )}
                            <View style={{ height: 10 }}></View>
                        </Card.Content>

                        {userState?.role !== 'STUDENT' && (
                            <Card.Actions>
                                <IconButton icon="delete" mode={theme === 'light' ? 'contained' : 'outlined'} size={25} iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'} onPress={() => deleteNoticeboardItem(item.id)} />
                            </Card.Actions>
                        )}
                    </Card>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    contentGridMobile: {
        marginTop: 10
    },

    cardLightMobile: {
        backgroundColor: 'white',
        marginBottom: 10
    },

    cardDarkMobile: {
        backgroundColor: '#242526',
        marginBottom: 10
    },

    cardTitleLightMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },

    cardTitleDarkMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },

    cardDescriptionLightMobile: {
        fontSize: 16,
        marginVertical: 5,
        color: 'black',
        marginBottom: 10
    },

    cardDescriptionDarkMobile: {
        fontSize: 16,
        marginVertical: 5,
        color: 'white',
        marginBottom: 10
    },

    cardDetailsLightMobile: {
        fontSize: 14,
        color: '#666',
    },

    cardDetailsDarkMobile: {
        fontSize: 14,
        color: '#d3d3d3',
    },
});

export default NoticeboardContentMobile;