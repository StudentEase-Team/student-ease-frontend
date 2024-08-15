import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from '@env';
import axios, { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { NoticeboardItem } from "../../model/NoticeboardItem";
import StackGrid from 'react-stack-grid';

type NoticeboardContentProps = {
    items: NoticeboardItem[] | undefined,
    fetchNoticeboardItems: () => void
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

    if(Platform.OS === 'web')
    return (
        <StackGrid
            columnWidth={'30%'}
            gutter={15}
            style={styles.contentGrid}
        >
            {props.items?.map((item, index) => {
                const date = new Date(item.updatedAt);
                const formattedDate = isNaN(date.getTime()) ? 'Invalid date' : formatDate(date);
                return (
                    <Card key={index} style={theme === 'light' ? styles.qaContainerLight : styles.qaContainerDark}>
                        <Card.Content>
                            <Title style={theme === 'light' ? styles.titleLight : styles.titleDark }> {item.title} </Title>
                            <Paragraph style={theme === 'light' ? styles.descriptionLight : styles.descriptionDark}> {item.message} </Paragraph>
                            <Paragraph style={theme === 'light' ? styles.metaLight : styles.metaDark}> Date: {formattedDate} </Paragraph>
                            {item.creatorName !== '' && (
                                <Paragraph style={theme === 'light' ? styles.metaLight : styles.metaDark} > Creator: {item.creatorName} </Paragraph>
                            )}
                            {item.subjectName !== '' && (
                                <Paragraph style={theme === 'light' ? styles.metaLight : styles.metaDark} > Subject: {item.subjectName} </Paragraph>
                            )}
                            {item.collegeName !== '' && (<Paragraph style={theme === 'light' ? styles.metaLight : styles.metaDark}> College: {item.collegeName} </Paragraph>
                            )}
                            <View style={{ height: 10 }}></View>
                        </Card.Content>

                        {userState?.role !== 'STUDENT' && (
                            <Card.Actions>
                                <IconButton icon="delete" mode={theme === 'light' ? 'contained' : 'outlined'} size={25} iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'} onPress={() => deleteNoticeboardItem(item.id)}/>
                            </Card.Actions>
                        )}
                    </Card>
                );
            })}
        </StackGrid>
    );
    else return (
        <View style={styles.contentGridMobile}>
        {props.items?.map((item, index) => {
            const date = new Date(item.updatedAt);
            const formattedDate = isNaN(date.getTime()) ? 'Invalid date' : formatDate(date);
            return (
                <Card key={index} style={theme === 'light' ? styles.qaContainerLightMobile : styles.qaContainerDarkMobile}>
                    <Card.Content>
                        <Title style={theme === 'light'? styles.titleLightMobile : styles.titleDarkMobile}> {item.title} </Title>
                        <Paragraph style={theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile}> {item.message} </Paragraph>
                        <Paragraph style={theme === 'light' ? styles.metaLightMobile : styles.metaDarkMobile} > Date: {formattedDate} </Paragraph>
                        {item.creatorName !== '' && (
                            <Paragraph style={theme === 'light' ? styles.metaLightMobile : styles.metaDarkMobile}> Creator: {item.creatorName} </Paragraph>
                        )}
                        {item.subjectName !== '' && (
                            <Paragraph style={theme === 'light' ? styles.metaLightMobile : styles.metaDarkMobile}> Subject: {item.subjectName} </Paragraph>
                        )}
                        {item.collegeName !== '' && (
                            <Paragraph style={theme === 'light' ? styles.metaLightMobile : styles.metaDarkMobile}> College: {item.collegeName} </Paragraph>
                        )}
                        <View style={{height: 10}}></View>
                    </Card.Content>

                    {userState?.role !== 'STUDENT' && (
                        <Card.Actions>
                            <IconButton icon="delete" mode={theme === 'light' ? 'contained' : 'outlined'} size={25} iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'} onPress={() => deleteNoticeboardItem(item.id)}/>
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
        backgroundColor: 'white',
        margin: 10
    },

    qaContainerLightMobile: {
        backgroundColor: 'white',
        marginBottom: 10
    },

    qaContainerDark: {
        backgroundColor: '#242526',
        margin: 10
    },

    qaContainerDarkMobile: {
        backgroundColor: '#242526',
        marginBottom: 10
    },

    contentGrid: {
        marginTop: 20,
        width: '80%',
        alignSelf:'center',
    },

    contentGridMobile: {
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
});

export default NoticeboardContent;
