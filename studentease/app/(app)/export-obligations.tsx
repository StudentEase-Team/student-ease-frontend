import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import axios, { AxiosResponse } from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'; 
import { API_BASE_URL } from '@env';
import { UserRole } from '../../model/UserRole';
import Toast from 'react-native-toast-message'; 
import { Platform } from 'react-native';

const exportObligationsICS: React.FC = () => {
    const router = useRouter();
    const { userState } = useAuth();

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
                text1: 'File Downloaded',
                text2: `The file has been successfully downloaded.`,
                position: 'bottom',
                type: 'success',
                visibilityTime: 4000, 
                autoHide: true, 
            });
            setTimeout(() => {
                router.push('/homepage');
            }, 4000);

        } catch (error) {
            console.error("Error sharing file:", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            download();
        }, [])
    );

    return (
        <>
            <Toast />
        </>
    );
};

export default exportObligationsICS;
