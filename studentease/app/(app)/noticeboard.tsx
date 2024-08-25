import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import { Button, IconButton } from 'react-native-paper';;
import dayjs from 'dayjs';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useFocusEffect } from 'expo-router';
import axios, { AxiosResponse } from 'axios';
import { NoticeboardItem } from '../../model/NoticeboardItem';
import { API_BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
import NewNoticeboardItemModal from '../../components/noticeboard/new-noticeboard-item-modal';
import NoticeboardSearchFilter from '../../components/noticeboard/noticeboard-filter';
import NoticeboardContent from '../../components/noticeboard/noticeboard-content';
import { I18n } from 'i18n-js';
import { translations } from '../../localization';
import { LocaleContext } from '../../context/LocaleContext';
import NoticeboardContentMobile from '../../components/noticeboard/noticeboard-content-mobile';
import NoticeboardContentWeb from '../../components/noticeboard/noticeboard-content';

export default function NoticeboardShow() {
    const { userState } = useAuth();
    const { theme } = useTheme();
    const [date, setDate] = useState(dayjs());
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [isFloatingButtonVisible, setIsFloatingButtonVisible] = useState(true);
    const [collegeSearchParam, setCollegeSearchParam] = useState('');
    const [subjectSearchParam, setSubjectSearchParam] = useState('');
    const [items, setItems] = useState<NoticeboardItem[]>();
    const [itemsBak, setItemsBak] = useState<NoticeboardItem[]>();
    const [newNoticeboardItemModalVisible, setNewNoticeboardItemModalVisible] = useState(false);
    const i18n = new I18n(translations)
    const { locale } = useContext(LocaleContext);
    i18n.locale = locale

    const fetchNoticeboardItems = useCallback(async () => {
        if (!userState?.token.accessToken) return;

        const config = {
            headers: { Authorization: `Bearer ${userState.token.accessToken}` }
        };
        try {
            const response: AxiosResponse = await axios.get(`${API_BASE_URL}/noticeboard/items/all`, config);
            if (response.status === 200) {
                const sortedItems = response.data.sort((a, b) => {
                    const dateA = new Date(a.updatedAt);
                    const dateB = new Date(b.updatedAt);
    
                    return dateB.getTime() - dateA.getTime();
                });
    
                setItems(sortedItems);
                setItemsBak(sortedItems);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: i18n.t('failed_to_fetch_toast'),
            });
        }
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchNoticeboardItems();
        }, []));

    useEffect(() => {
        if (collegeSearchParam === 'any' && subjectSearchParam === 'any')
            setItems(itemsBak);
        else if (collegeSearchParam === 'any')
            setItems(itemsBak?.filter(i => i.subjectName.toLocaleLowerCase().includes(subjectSearchParam.toLocaleLowerCase())))
        else if (subjectSearchParam === 'any')
            setItems(itemsBak?.filter(i => i.collegeName.toLocaleLowerCase().includes(collegeSearchParam.toLocaleLowerCase())))
        else
            setItems(itemsBak?.filter(i => i.subjectName.toLocaleLowerCase().includes(subjectSearchParam.toLocaleLowerCase()) && i.collegeName.toLocaleLowerCase().includes(collegeSearchParam.toLocaleLowerCase())))
    }, [collegeSearchParam, subjectSearchParam])

    useEffect(() => {
        const formattedDate = date.format('DD/MM/YYYY');
        setItems(
            items?.filter(item => dayjs(item.updatedAt).format('DD/MM/YYYY') === formattedDate)
        );
    }, [date]);

    useEffect(() => {
        if (newNoticeboardItemModalVisible || dateModalVisible) {
            setIsFloatingButtonVisible(false);
        } else {
            setIsFloatingButtonVisible(true);
        }
    }, [newNoticeboardItemModalVisible, dateModalVisible]);

    return (
        <>
            <ScrollView style={theme === 'light' ? styles.pageContainerLight : styles.pageContainerDark}>
                <NoticeboardSearchFilter items={itemsBak} setItems={setItems}
                    collegeSearchParam={collegeSearchParam}
                    setCollegeSearchParam={setCollegeSearchParam}
                    subjectSearchParam={subjectSearchParam}
                    setSubjectSearchParam={setSubjectSearchParam}
                    date={date}
                    setDate={setDate}
                    setDateModalVisible={setDateModalVisible} />

                {Platform.OS === 'web'? (
                    <NoticeboardContentWeb items={items} fetchNoticeboardItems={fetchNoticeboardItems} />
                ):(
                    <NoticeboardContentMobile items={items} fetchNoticeboardItems={fetchNoticeboardItems} />
                )}

                <View style={{ height: 50 }} />
            </ScrollView>

            <NewNoticeboardItemModal newNoticeboardItemModalVisible={newNoticeboardItemModalVisible} setNewNoticeboardItemModalVisible={setNewNoticeboardItemModalVisible} items={itemsBak} />

            {userState?.role !== 'STUDENT' && isFloatingButtonVisible ? (
                Platform.OS === 'web' ? (
                    <Button mode='contained' style={theme === 'light' ? styles.addNoticeboardItemButtonLight : styles.addNoticeboardItemButtonDark} onPress={() => setNewNoticeboardItemModalVisible(true)}>
                        {i18n.t('noticeboard_createNotification')}
                    </Button>
                ) : (
                    <IconButton icon='plus' iconColor='white' size={45} style={theme === 'light' ? styles.addNoticeboardItemButtonLightMobile : styles.addNoticeboardItemButtonDarkMobile} onPress={() => setNewNoticeboardItemModalVisible(true)}>
                    </IconButton>
                )
            ) : ('')}

            <Toast />
        </>
    );
};

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

    addNoticeboardItemButtonLight: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#4dabf7',
    },

    addNoticeboardItemButtonLightMobile: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#4dabf7',
    },

    addNoticeboardItemButtonDark: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#9775fa',
    },

    addNoticeboardItemButtonDarkMobile: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#9775fa',
    },
});