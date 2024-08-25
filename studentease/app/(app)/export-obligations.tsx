import React, { useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios, { AxiosResponse } from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { API_BASE_URL } from '@env';
import { UserRole } from '../../model/UserRole';
import Toast from 'react-native-toast-message';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper'
import { useTheme } from '../../context/ThemeContext';
import { I18n } from 'i18n-js';
import { translations } from '../../localization';
import { LocaleContext } from '../../context/LocaleContext';

const ExportObligationsICS: React.FC = () => {
    const { theme } = useTheme();
    const { userState } = useAuth();
    const i18n = new I18n(translations)
    const { locale } = useContext(LocaleContext);
    i18n.locale = locale

    const download = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${userState?.token.accessToken}` },
            };

            const endpoint = userState?.role === UserRole.STUDENT
                ? `${API_BASE_URL}/obligations/student/download`
                : userState?.role === UserRole.PROFESSOR
                    ? `${API_BASE_URL}/obligations/professor/download`
                    : null;

            if (endpoint) {
                const response: AxiosResponse = await axios.get(endpoint, config);

                if (response.status === 200) {
                    const calendarContent = response.data;
                    await downloadFile(calendarContent);
                }
            }
        } catch (error) {
            console.error("Error downloading obligations:", error);
        }
    };

    const downloadFile = async (calendarContent: string) => {
        try {
            if (Platform.OS !== 'web') {
                const fileUri = `${FileSystem.documentDirectory}obligations.ics`;
                await FileSystem.writeAsStringAsync(fileUri, calendarContent, { encoding: FileSystem.EncodingType.UTF8 });
                console.log(`File downloaded to: ${fileUri}`);
                await Sharing.shareAsync(fileUri, {
                    mimeType: 'text/calendar',
                    dialogTitle: 'Save ICS File',
                });
            } else if (Platform.OS === 'web') {
                const blob = new Blob([calendarContent], { type: 'text/calendar' });
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = 'obligations.ics';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }

            Toast.show({
                text1: i18n.t('exportObligations_toast'),
                position: 'top',
                type: 'success',
                visibilityTime: 4000,
                autoHide: true,
            });

        } catch (error) {
            console.error("Error sharing file:", error);
        }
    };

    const handleDownload = () => {
        download();
    };

    return (
        <View style={theme === 'light' ? styles.pageContainerLight : styles.pageContainerDark}>
            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>{i18n.t('exportObligations_title')}</Text>
            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>
                {i18n.t('exportObligations_downloadInstructions')}
            </Text>
            <Button mode='contained' onPress={handleDownload} style={theme === 'light' ? styles.downloadButtonLight : styles.downloadButtonDark}>{i18n.t('exportObligations_downloadButton')}</Button>
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainerLight: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    pageContainerDark: {
        flex: 1,
        padding: 20,
        backgroundColor: '#18191A',
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleLight: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },

    titleLightMobile: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },

    titleDark: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
    },

    titleDarkMobile: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
    },

    descriptionLight: {
        fontSize: 18,
        marginBottom: 40,
        textAlign: 'center',
        color: '#666',
        width: '35%',
        fontStyle: 'italic',
        paddingHorizontal: 10,
    },

    descriptionLightMobile: {
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic',
        paddingHorizontal: 10,
    },

    descriptionDark: {
        fontSize: 18,
        marginBottom: 40,
        textAlign: 'center',
        color: '#dddddd',
        width: '35%',
        fontStyle: 'italic',
        paddingHorizontal: 10,
    },

    descriptionDarkMobile: {
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center',
        color: '#dddddd',
        fontStyle: 'italic',
        paddingHorizontal: 10,
    },

    downloadButtonLight: {
        backgroundColor: '#4dabf7',
        marginTop: 30,
        borderRadius: 50,
        height: 50,
        justifyContent: 'center',
    },

    downloadButtonDark: {
        backgroundColor: '#9775fa',
        marginTop: 30,
        borderRadius: 50,
        height: 50,
        justifyContent: 'center',
    },
});

export default ExportObligationsICS;
