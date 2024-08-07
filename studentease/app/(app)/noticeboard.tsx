import React, { useCallback, useEffect, useState } from 'react';
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
import NewNoticeboardItemModal from '../../component/noticeboard/new-noticeboard-item-modal';
import NoticeboardDateModal from '../../component/noticeboard/noticeboard-date-modal';
import NoticeboardSearchFilter from '../../component/noticeboard/noticeboard-filter';
import NoticeboardContent from '../../component/noticeboard/noticeboard-content';

export default function NoticeboardShow() {

    const {userState} = useAuth();
    const {theme} = useTheme();
    const [date, setDate] = useState(dayjs());
    const [dateModalVisible, setDateModalVisible] = useState(false);

    const [collegeSearchParam, setCollegeSearchParam] = useState('');
    const [subjectSearchParam, setSubjectSearchParam] = useState('');
    const [items, setItems] = useState<NoticeboardItem[]>();
    const [itemsBak, setItemsBak] = useState<NoticeboardItem[]>();
    const [newNoticeboardItemModalVisible, setNewNoticeboardItemModalVisible] = useState(false);
    
    const fetchNoticeboardItems = useCallback(async () => {
        if (!userState?.token.accessToken) return;
    
        const config = {
          headers: { Authorization: `Bearer ${userState.token.accessToken}` }
        };
        try {
          const response: AxiosResponse = await axios.get(`${API_BASE_URL}/noticeboard/items/all`, config);
          if (response.status === 200) {
            setItems(response.data);
            setItemsBak(response.data);
          }
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Failed to noticeboard items',
          });
        }
      }, []);

    useFocusEffect(
        React.useCallback(() => {
          fetchNoticeboardItems();
      }, []));

    useEffect(() => {
        if(collegeSearchParam === 'any' && subjectSearchParam === 'any')
            setItems(itemsBak);
        else if(collegeSearchParam === 'any')
            setItems(itemsBak?.filter(i => i.subjectName.toLocaleLowerCase().includes(subjectSearchParam.toLocaleLowerCase())))
        else if(subjectSearchParam === 'any')
            setItems(itemsBak?.filter(i => i.collegeName.toLocaleLowerCase().includes(collegeSearchParam.toLocaleLowerCase())))
        else
            setItems(itemsBak?.filter(i => i.subjectName.toLocaleLowerCase().includes(subjectSearchParam.toLocaleLowerCase())&& i.collegeName.toLocaleLowerCase().includes(collegeSearchParam.toLocaleLowerCase())))
        
        
    },[collegeSearchParam, subjectSearchParam])

    return (
        <>
        <ScrollView style={theme === 'light' ? styles.containerLight : styles.containerDark}>

        <NoticeboardSearchFilter items={items} setItems={setItemsBak} 
            collegeSearchParam={collegeSearchParam} 
            setCollegeSearchParam={setCollegeSearchParam} 
            subjectSearchParam={subjectSearchParam} 
            setSubjectSearchParam={setSubjectSearchParam} 
            date={date} 
            setDate={setDate} 
            setDateModalVisible={setDateModalVisible}/>

        <NoticeboardContent items={items} fetchNoticeboardItems={fetchNoticeboardItems}/>

        <View style={{height:50}}/>
        </ScrollView>

        <NoticeboardDateModal dateModalVisible={dateModalVisible} setDateModalVisible={setDateModalVisible} date={date} setDate={setDate} />
        <NewNoticeboardItemModal newNoticeboardItemModalVisible={newNoticeboardItemModalVisible} setNewNoticeboardItemModalVisible={setNewNoticeboardItemModalVisible} items={itemsBak} />

        {userState?.role !== 'STUDENT'? (
                    Platform.OS === 'web'? (
                        <Button mode='contained' style={theme === 'light' ? styles.addNoticeboardItemButtonLight : styles.addNoticeboardItemButtonDark} onPress={() => setNewNoticeboardItemModalVisible(true)}>
                        Create noticeboard notification
                        </Button>
                    ) : (
                        <IconButton icon='plus' iconColor='white' size={45} style={theme === 'light' ? styles.addNoticeboardItemButtonLightMobile : styles.addNoticeboardItemButtonDarkMobile} onPress={() => setNewNoticeboardItemModalVisible(true)}>
                        </IconButton>
                    )
        ):('')}

        <Toast/>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },

    pressable: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 2,
    },

    text: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    containerLight: {
        flex: 1,
        padding: 20,
    },

    containerDark: {
        flex: 1,
        padding: 20,
        backgroundColor: '#18191A'
    },

    comboBox: {
        width: 250,
        height: 48,
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

    notification: {
        borderRadius: 20,
        padding: 10,
        margin: 5,
        width: '30%',
    },

    titleNewItem: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 10,
        alignSelf: 'center',
    },

    form: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width: '50%',
        alignItems: 'center',
        alignSelf: 'center',
      },

    input: {
        marginBottom: 10,
    },

    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: "100%"
    },

    inputColumn: {
        flexDirection: 'column',
        width: '100%',
    },

    categoryContainer: {
        marginBottom: 10,
    },

    submitButton: {
        marginTop: 30,
        marginBottom: 20
    },

    createNoticeboardNotificationButton: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        height: 65,
        justifyContent: 'center',
        borderRadius: 50,
    },

    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
        marginTop: 20
    },

    button: {
        width: '49%'
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

    inputLight: {
        marginTop: 10,
        color: '#242526',
        width: '49%',
        height: 45
    },

    inputLightMobile: {
        marginTop: 10,
        color: '#242526',
        width: '100%',
        alignSelf: 'center',
        height: 45,
    },
    
    inputDark: {
        marginTop: 10,
        color: 'white',
        width: '49%',
        height: 45
    },

    inputDarkMobile: {
        marginTop: 10,
        color: 'white',
        width: '100%',
        alignSelf: 'center',
        height: 45,
        fontSize: 14
    },

    radioButtonLight: {
        color: '#4dabf7'
    },

    radioButtonDark: {
        color: '#9775fa'
    },
});