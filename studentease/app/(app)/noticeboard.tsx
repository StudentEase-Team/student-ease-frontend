import React, { useCallback, useState } from 'react';
import { Text } from '@rneui/themed';
import { StyleSheet, ScrollView, View, Platform, Pressable, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Provider as PaperProvider, TextInput as PaperInput, Button, Card, Title, Modal, IconButton, Paragraph, TextInput } from 'react-native-paper';;
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { themeDark, themeLight } from '../../context/PaperTheme';
import { useFocusEffect } from 'expo-router';
import axios, { AxiosResponse } from 'axios';
import { NoticeboardItem } from '../../model/NoticeboardItem';
import { NoticeboardItemCategory } from '../../model/NoticeboardItemCategory';
import { API_BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
import CustomDropdown from '../../component/form/custom-dropdown';
import CollegeSubjectDropdowns from '../../component/form/college-subject';

type AnnouncementType =
  | 'UNIVERSITY_ANNOUNCEMENT'
  | 'UNIVERSITY_GUEST_ANNOUNCEMENT'
  | 'COLLEGE_ANNOUNCEMENT'
  | 'COLLEGE_GUEST_ANNOUNCEMENT'
  | 'SUBJECT_ANNOUNCEMENT'
  | 'SUBJECT_EXAM_RESULT_ANNOUNCEMENT'
  | 'SUBJECT_EXAM_DATE_ANNOUNCEMENT'
  | 'INTERNSHIP_ANNOUNCEMENT'
  | 'ACTIVITIES_ANNOUNCEMENT';

type FilterType = 
  | 'ALL'
  | 'UNIVERSITY'
  | 'COLLEGE'
  | 'SUBJECT'
  | 'OTHER';

export default function NoticeboardShow() {

    const [date, setDate] = useState(dayjs());
    const [modalVisibleDate, setModalVisibleDate] = useState(false);
    const [collegeFilterEnabled, setCollegeFilterEnabled] = useState(true);
    const [subjectFilterEnabled, setSubjectFilterEnabled] = useState(true);
    const [modalVisibleNewItem, setModalVisibleNewItem] = useState(false);
    const [items, setItems] = useState<NoticeboardItem[]>();
    const [itemsBak, setItemsBak] = useState<NoticeboardItem[]>();

    const [subject, setSubject] = React.useState('');
    const [college, setCollege] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const {userState} = useAuth();
    const {theme} = useTheme();

    const [selectedValue, setSelectedValue] = useState<AnnouncementType | null>(null);
    const [selectedFilterType, setSelectedFilterType] = useState<FilterType | null>('ALL');

    const [collegeSearchParam, setCollegeSearchParam] = useState('');
    const [subjectSearchParam, setSubjectSearchParam] = useState('');

    const options: { value: AnnouncementType; label: string }[] = [
        { value: NoticeboardItemCategory.UNIVERSITY_ANNOUNCEMENT, label: 'University Announcement' },
        { value: NoticeboardItemCategory.UNIVERSITY_GUEST_ANNOUNCEMENT, label: 'University Guest Announcement' },
        { value: NoticeboardItemCategory.COLLEGE_ANNOUNCEMENT, label: 'College Announcement' },
        { value: NoticeboardItemCategory.COLLEGE_GUEST_ANNOUNCEMENT, label: 'College Guest Announcement' },
        { value: NoticeboardItemCategory.SUBJECT_ANNOUNCEMENT, label: 'Subject Announcement' },
        { value: NoticeboardItemCategory.SUBJECT_EXAM_RESULT_ANNOUNCEMENT, label: 'Subject Exam Result Announcement' },
        { value: NoticeboardItemCategory.SUBJECT_EXAM_DATE_ANNOUNCEMENT, label: 'Subject Exam Date Announcement' },
        { value: NoticeboardItemCategory.INTERNSHIP_ANNOUNCEMENT, label: 'Internship Announcement' },
        { value: NoticeboardItemCategory.ACTIVITIES_ANNOUNCEMENT, label: 'Activities Announcement' },
    ];

    const filterOptions: { value: FilterType; label: string }[] = [
        { value: 'ALL', label: 'All' },
        { value: 'UNIVERSITY', label: 'University' },
        { value: 'COLLEGE', label: 'College' },
        { value: 'SUBJECT', label: 'Subject' },
        { value: 'OTHER', label: 'Other' },
    ];

    const handlePress = (value: AnnouncementType) => {
        setSelectedValue(value);
    };

    const handlePressFilterOptions = (value: FilterType) => {
        if(value === 'UNIVERSITY') {
            setCollegeFilterEnabled(false);
            setSubjectFilterEnabled(false);
            setItems(itemsBak?.filter(i => i.category === "UNIVERSITY_ANNOUNCEMENT" || i.category === "UNIVERSITY_GUEST_ANNOUNCEMENT"))
        }        
        else if(value === 'ALL') {
            setCollegeFilterEnabled(true);
            setSubjectFilterEnabled(true);
            setItems(itemsBak);
        }
        else if(value === 'OTHER') {
            setCollegeFilterEnabled(false);
            setSubjectFilterEnabled(false);
            setItems(itemsBak?.filter(i => i.category === "INTERNSHIP_ANNOUNCEMENT" || i.category === "ACTIVITIES_ANNOUNCEMENT"))
        }
        else if(value === 'COLLEGE') {
            setCollegeFilterEnabled(true);
            setSubjectFilterEnabled(false);
            setItems(itemsBak?.filter(i => i.category === "COLLEGE_ANNOUNCEMENT" || i.category === "COLLEGE_GUEST_ANNOUNCEMENT"))
        
        }
        else if(value === 'SUBJECT') {
            setCollegeFilterEnabled(true);
            setSubjectFilterEnabled(true);
            setItems(itemsBak?.filter(i => i.category === "SUBJECT_ANNOUNCEMENT" || i.category === "SUBJECT_EXAM_RESULT_ANNOUNCEMENT" || i.category === "SUBJECT_EXAM_DATE_ANNOUNCEMENT"))
        }
        setSelectedFilterType(value);
    };

    const handleSearchCollege = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const searchValue = e.nativeEvent.text;
        setCollegeSearchParam(searchValue)
        if (searchValue === '') {
            if(subjectSearchParam === '')
                setItems(itemsBak);
        } else if(searchValue !== null) {
          setItems(itemsBak?.filter(i => i.collegeName.toLowerCase().includes(searchValue.toLowerCase())));
        }
      };

      const handleSearchSubject = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const searchValue = e.nativeEvent.text;
        setSubjectSearchParam(searchValue)
        if (searchValue === '') {
            if(collegeSearchParam === '')
                setItems(itemsBak);
        } else if(searchValue !== null) {
          setItems(itemsBak?.filter(i => i.subjectName.toLowerCase().includes(searchValue.toLowerCase())));
        }
      };

    const sumbitAnnouncement = async () => {
       /* const config = {
            headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
        };
        let newNoticeboardItem : NoticeboardItem;
        if(selectedValue !== null)
        newNoticeboardItem  = {
            id: 0,
            title: "",
            message: "",
            updatedAt: new Date(),
            category: selectedValue,
            subjectName: '',
            collegeName: '',
        }
        const response : AxiosResponse = await axios.post('${API_BASE_URL}/api/faq/item', newQuestion, config)
        if(response.status == 201) {
            Toast.show({
                type: 'success',
                text1: 'Succesfully created!',
              });
            setModalVisible(false);
            items?.push(newQuestion);
            itemsBak?.push(newQuestion);
        }*/
    }

    async function deleteNoticeboardItem(id: number) {
        if (!userState?.token.accessToken) return;
    
        const config = {
          headers: { Authorization: `Bearer ${userState.token.accessToken}` }
        };
        try {
          const response: AxiosResponse = await axios.delete(`${API_BASE_URL}/noticeboard/item/${id}`, config);
          if (response.status === 200) {
            fetchNoticeboardItems();
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
      }
    

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

    return (
        <>
       
        <ScrollView style={theme === 'light' ? styles.containerLight : styles.containerDark}>
        <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
            <View style={styles.filterAndSearchContainer}>
                <View style={Platform.OS === 'web' ? (theme === 'light' ? styles.containerFilterLight : styles.containerFilterDark) : (theme === 'light' ? styles.containerFilterLightMobile : styles.containerFilterDarkMobile)}>
                    <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleFilterLight : styles.titleFilterDark) : (theme === 'light' ? styles.titleFilterLightMobile : styles.titleFilterDarkMobile)}>Filter by parameters</Text>
                        <View style={styles.container}>
                            {filterOptions.map((option) => (
                            <Pressable
                                key={option.value}
                                style={[styles.pressable, selectedFilterType === option.value
                                    ? { backgroundColor: theme === 'light' ? '#4dabf7' : '#9775fa' }
                                    : { borderColor: 'grey', borderWidth: 0.5 },]}
                                onPress={() => handlePressFilterOptions(option.value)}>

                                <Text
                                    style={[
                                    styles.text,
                                    { color: selectedFilterType === option.value ? '#fff' : theme === 'light' ?  '#4dabf7' : '#9775fa' }, ]}>
                                    {option.label}
                                </Text>
                            </Pressable>
                        ))}
                        
                        <View style={styles.inputColumn}>
                                <CollegeSubjectDropdowns filterableData={[]} onChangeAny={() => {}}/>
                        </View>
                    </View>
                </View>

                <View style={Platform.OS === 'web' ? (theme === 'light' ? styles.containerSearchLight : styles.containerSearchDark) : (theme === 'light' ? styles.containerSearchLightMobile : styles.containerSearchDarkMobile)}>
                    <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleFilterLight : styles.titleFilterDark) : (theme === 'light' ? styles.titleFilterLightMobile : styles.titleFilterDarkMobile)}>Search and sort</Text>
                    <View style={styles.searchSortGrid}>
                        <View style={Platform.OS === 'web' ? styles.inputRow : styles.inputColumn}>
                            <PaperInput
                                label="Search..."
                                mode="outlined"
                                style={Platform.OS === 'web'? (theme === 'light' ? styles.inputLight : styles.inputDark): (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}>
                            </PaperInput>
                            <PaperInput
                                label="Date"
                                mode="outlined"
                                value={date.toDate().toLocaleDateString()}
                                style={Platform.OS === 'web'? (theme === 'light' ? styles.inputLight : styles.inputDark): (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}
                                right={<TextInput.Icon icon='calendar-outline'
                                    color={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'}
                                    onPress={() => { setModalVisibleDate(true); } }/>} 
                                    />
                        </View>
                    </View>
                </View>
            </View>
        </PaperProvider>

            <View style={Platform.OS ==='web'? styles.contentGrid : styles.contentGridMobile}>
                {items?.map((item, index) => (
                    <Card key={index} style={Platform.OS === 'web'? (theme === 'light' ? styles.qaContainerLight : styles.qaContainerDark) : (theme === 'light'? styles.qaContainerLightMobile:styles.qaContainerDarkMobile)}>
                        <Card.Content>
                            <Title style={Platform.OS === 'web'? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>{item.title}</Title>
                            <Paragraph style={Platform.OS === 'web'? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>{item.message}</Paragraph>
                            <Paragraph style={Platform.OS === 'web'? (theme === 'light' ? styles.metaLight : styles.metaDark) : (theme === 'light' ? styles.metaLightMobile : styles.metaDarkMobile)}>Date: {item.updatedAt.toString()}</Paragraph>
                            {item.subjectName !== null?(
                                <Paragraph style={Platform.OS === 'web'? (theme === 'light' ? styles.metaLight : styles.metaDark) : (theme === 'light' ? styles.metaLightMobile : styles.metaDarkMobile)}>Subject: {item.subjectName}</Paragraph>
                            )
                            :('')}
                           {item.collegeName !== null?(
                                <Paragraph style={Platform.OS === 'web'? (theme === 'light' ? styles.metaLight : styles.metaDark) : (theme === 'light' ? styles.metaLightMobile : styles.metaDarkMobile)}>College: {item.collegeName}</Paragraph>
                            )
                            :('')}
                        </Card.Content>

                        {userState?.role !== 'STUDENT'? (
                            <Card.Actions>
                            <IconButton
                                icon="pencil"
                                mode='outlined'
                                size={25}
                                iconColor={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'}
                                onPress={() => console.log('Edit', index)} />
                            <IconButton
                                icon="delete"
                                mode='outlined'
                                size={25}
                                iconColor={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'}
                                onPress={() => deleteNoticeboardItem(item.id)} />
                        </Card.Actions>
                        ):('')}
                    </Card>
                ))}
            </View>
            
        </ScrollView>

        <Modal style={Platform.OS ==='web'? styles.dateModal : styles.dateModalMobile } visible={modalVisibleDate} onDismiss={() => { setModalVisibleDate(false); } }>
            <View style={theme === 'light' ? styles.datepickerLight : styles.datepickerDark}>
                <DateTimePicker
                    mode="single"
                    date={date}
                    selectedItemColor={theme === 'light' ? '#4dabf7' : '#9775fa'}
                    headerButtonColor={theme === 'light' ? 'black' : 'white'}
                    calendarTextStyle={theme === 'light' ?{ color:'black'}:{color: 'white'}}
                    headerTextStyle={theme === 'light' ?{ color:'black'}:{color: 'white'}}
                    weekDaysTextStyle={theme === 'light' ?{ color:'black'}:{color: 'white'}}
                    onChange={(params) => {
                        setModalVisibleDate(false);
                        setDate(dayjs(params.date?.toString()));
                    } } />
            </View>
        </Modal>

        <Modal visible={modalVisibleNewItem} contentContainerStyle={Platform.OS ==='web'? (theme === 'light' ? styles.modalFormCreateNoticeboardItemLight : styles.modalFormCreateNoticeboardItemDark) : (theme === 'light' ? styles.modalFormCreateNoticeboardItemLightMobile : styles.modalFormCreateNoticeboardItemDarkMobile)} onDismiss={() => { setModalVisibleNewItem(false); } }>
            <ScrollView>
                <Text style={Platform.OS ==='web'? (theme === 'light' ? styles.titleNewItemModalLight : styles.titleNewItemModalDark) : (theme === 'light' ? styles.titleNewItemModalLightMobile : styles.titleNewItemModalDarkMobile)}>Create a new noticeboard notification</Text>
                <View style={styles.container}>
                    {options.map((option) => (
                        <Pressable
                        key={option.value}
                        style={[styles.pressable, selectedValue === option.value
                            ? { backgroundColor: theme === 'light' ? '#4dabf7' : '#9775fa' }
                            : { borderColor: 'grey', borderWidth: 1 },]}
                        onPress={() => handlePress(option.value)}
                        >
                        <Text
                            style={[
                            styles.text,
                            { color: selectedValue === option.value ? '#fff' : theme === 'light' ?  '#4dabf7' : '#9775fa' },
                            ]}
                        >
                            {option.label}
                        </Text>
                        </Pressable>
                    ))}
                </View>
                <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
                    <CollegeSubjectDropdowns/>

                    <PaperInput
                        label="Title"
                        mode="outlined"
                        value={title}
                        onChangeText={text => setTitle(text)}
                        style={styles.input} />
                    <PaperInput
                        label="Description"
                        mode="outlined"
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={text => setDescription(text)}
                        style={styles.input} />
                </PaperProvider>

                <View style={styles.buttonRow}>
                    {Platform.OS === 'web' ? (
                        <Button mode='contained' onPress={() => sumbitAnnouncement()} style={theme === 'light' ? styles.createNoticeboardItemButtonLight : styles.createNoticeboardItemButtonDark}> Submit announcement </Button>
                    ) : (
                        <Button mode='contained' onPress={() => sumbitAnnouncement()} style={theme === 'light' ? styles.createNoticeboardItemButtonLight : styles.createNoticeboardItemButtonDark}> Submit </Button>
                    )}
                    <Button mode='contained-tonal' onPress={() => setModalVisibleNewItem(false)} style={theme === 'light' ? styles.cancelNoticeboardItemButtonLight : styles.cancelNoticeboardItemButtonDark}> Cancel </Button>
                </View>

            </ScrollView>
        </Modal>

        {userState?.role !== 'STUDENT'? (
                    Platform.OS === 'web'? (
                        <Button mode='contained' style={theme === 'light' ? styles.addNoticeboardItemButtonLight : styles.addNoticeboardItemButtonDark} onPress={() => setModalVisibleNewItem(true)}>
                        Create noticeboard notification
                        </Button>
                    ) : (
                        <IconButton icon='plus' iconColor='white' size={45} style={theme === 'light' ? styles.addNoticeboardItemButtonLightMobile : styles.addNoticeboardItemButtonDarkMobile} onPress={() => setModalVisibleNewItem(true)}>
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
        margin: 5,
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

    dateModal: {
        flex: 1,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    },

    dateModalMobile: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    datepickerLight: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '95%',
    },

    datepickerDark: {
        alignSelf: 'center',
        backgroundColor: '#242526',
        borderRadius: 20,
        padding: 20,
        width: '95%',
    },

    filterAndSearchContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerFilterLight: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '70%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    containerFilterLightMobile: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    containerFilterDark: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: '#242526',
        borderRadius: 20,
        width: '70%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    containerFilterDarkMobile: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: '#242526',
        borderRadius: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    radioButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center'
    },

    filterGrid: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20,
    }, 

    containerSearchLight: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: 'white',
        width: '70%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    containerSearchLightMobile: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    containerSearchDark: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: '#242526',
        width: '70%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    containerSearchDarkMobile: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: '#242526',
        width: '100%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        padding: 20,
    },

    searchSortGrid: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },

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

    titleFilterLight: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
        color: 'black'
    },

    titleFilterLightMobile: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        color: 'black'
    },

    titleFilterDark: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
        color: 'white'
    },

    titleFilterDarkMobile: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        color: 'white'
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

    modalFormCreateNoticeboardItemLight: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '45%',
        alignSelf: 'center',
    },

    modalFormCreateNoticeboardItemLightMobile: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: -20,
    },

    modalFormCreateNoticeboardItemDark: {
        backgroundColor: '#242526',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '45%',
        alignSelf: 'center',
    },

    modalFormCreateNoticeboardItemDarkMobile: {
        backgroundColor: '#242526',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '95%',
        alignSelf: 'center',

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

    titleNewItemModalLight: {
        fontSize: 24,
        marginTop: 10,
        marginBottom: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },

    titleNewItemModalLightMobile: {
        fontSize: 20,
        marginBottom: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },

    titleNewItemModalDark: {
        color: 'white',
        fontSize: 24,
        marginTop: 10,
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    titleNewItemModalDarkMobile: {
        color: 'white',
        fontSize: 20,
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    createNoticeboardItemButtonLight: {
        width: '49%',
        backgroundColor: '#4dabf7',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

    createNoticeboardItemButtonDark: {
        width: '49%',
        backgroundColor: '#9775fa',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },
    
    cancelNoticeboardItemButtonLight: {
        width: '49%',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

    cancelNoticeboardItemButtonDark: {
        width: '49%',
        backgroundColor: 'grey',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
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