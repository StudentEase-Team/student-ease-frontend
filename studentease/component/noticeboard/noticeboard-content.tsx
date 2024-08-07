import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from '@env';
import axios, { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { NoticeboardItem } from "../../model/NoticeboardItem";

type NoticeboardContentProps = {
    items: NoticeboardItem[] | undefined,
    fetchNoticeboardItems : () => {}
}

function NoticeboardContent(props: NoticeboardContentProps) {

    const { theme } = useTheme();
    const { userState } = useAuth();

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
              text1: 'Succesfully deleted!',
            });
          }
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Failed to delete question. Can delete only if you answered it.',
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
        <View style={Platform.OS === 'web' ? styles.contentGrid : styles.contentGridMobile}>
        {props.items?.map((item, index) => {
            const date = new Date(item.updatedAt);
            const formattedDate = isNaN(date.getTime()) ? 'Invalid date' : formatDate(date);
            return (
                <Card
                    key={index}
                    style={
                        Platform.OS === 'web'
                            ? theme === 'light'
                                ? styles.qaContainerLight
                                : styles.qaContainerDark
                            : theme === 'light'
                            ? styles.qaContainerLightMobile
                            : styles.qaContainerDarkMobile
                    }
                >
                    <Card.Content>
                        <Title
                            style={
                                Platform.OS === 'web'
                                    ? theme === 'light'
                                        ? styles.titleLight
                                        : styles.titleDark
                                    : theme === 'light'
                                    ? styles.titleLightMobile
                                    : styles.titleDarkMobile
                            }
                        >
                            {item.title}
                        </Title>
                        <Paragraph
                            style={
                                Platform.OS === 'web'
                                    ? theme === 'light'
                                        ? styles.descriptionLight
                                        : styles.descriptionDark
                                    : theme === 'light'
                                    ? styles.descriptionLightMobile
                                    : styles.descriptionDarkMobile
                            }
                        >
                            {item.message}
                        </Paragraph>
                        <Paragraph
                            style={
                                Platform.OS === 'web'
                                    ? theme === 'light'
                                        ? styles.metaLight
                                        : styles.metaDark
                                    : theme === 'light'
                                    ? styles.metaLightMobile
                                    : styles.metaDarkMobile
                            }
                        >
                            Date: {formattedDate}
                        </Paragraph>
                        {item.creatorName !== '' && (
                            <Paragraph
                                style={
                                    Platform.OS === 'web'
                                        ? theme === 'light'
                                            ? styles.metaLight
                                            : styles.metaDark
                                        : theme === 'light'
                                        ? styles.metaLightMobile
                                        : styles.metaDarkMobile
                                }
                            >
                                Creator: {item.creatorName}
                            </Paragraph>
                        )}
                        {item.subjectName !== '' && (
                            <Paragraph
                                style={
                                    Platform.OS === 'web'
                                        ? theme === 'light'
                                            ? styles.metaLight
                                            : styles.metaDark
                                        : theme === 'light'
                                        ? styles.metaLightMobile
                                        : styles.metaDarkMobile
                                }
                            >
                                Subject: {item.subjectName}
                            </Paragraph>
                        )}
                        {item.collegeName !== '' && (
                            <Paragraph
                                style={
                                    Platform.OS === 'web'
                                        ? theme === 'light'
                                            ? styles.metaLight
                                            : styles.metaDark
                                        : theme === 'light'
                                        ? styles.metaLightMobile
                                        : styles.metaDarkMobile
                                }
                            >
                                College: {item.collegeName}
                            </Paragraph>
                        )}
                        <View style={{height: 10}}></View>
                    </Card.Content>

                    {userState?.role !== 'STUDENT' && (
                        <Card.Actions>
                            <IconButton
                                icon="pencil"
                                mode='outlined'
                                size={25}
                                iconColor={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'}
                                onPress={() => console.log('Edit', index)}
                            />
                            <IconButton
                                icon="delete"
                                mode='outlined'
                                size={25}
                                iconColor={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'}
                                onPress={() => deleteNoticeboardItem(item.id)}
                            />
                        </Card.Actions>
                    )}
                </Card>
            );
        })}
    </View>
    )
}

const styles = StyleSheet.create({
    qaContainerLight: {
        width: '30%',
        marginTop: 15,
        backgroundColor: 'white',
    },

    qaContainerLightMobile: {
        width: '100%',
        marginTop: 15,
        backgroundColor: 'white',
    },

    qaContainerDark: {
        width: '30%',
        marginTop: 15,
        backgroundColor: '#242526',
    },

    qaContainerDarkMobile: {
        width: '100%',
        marginTop: 15,
        backgroundColor: '#242526',
    },

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
        marginTop: 10
    },

    metaLight: {
        fontSize: 16,
        color: '#666',
    },

    metaLightMobile: {
        fontSize: 14,
        color: '#666',
    },

    metaDark: {
        fontSize: 16,
        color: 'white',
    },

    metaDarkMobile: {
        fontSize: 14,
        color: 'white',
    },

    descriptionLight: {
        fontSize: 18,
        marginVertical: 5,
        color: 'black'
    },

    descriptionLightMobile: {
        fontSize: 16,
        marginVertical: 5,
        color: 'black'
    },

    descriptionDark: {
        fontSize: 18,
        marginVertical: 5,
        color: 'white'
    },

    descriptionDarkMobile: {
        fontSize: 16,
        marginVertical: 5,
        color: 'white'
    },

    titleLight: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },

    titleLightMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },

    titleDark: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },

    titleDarkMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },

})

export default NoticeboardContent;