import React, { useState } from 'react';
import { Text } from '@rneui/themed';
import { MenuItem, Select, SelectChangeEvent} from '@mui/material';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import { Provider as PaperProvider, TextInput as PaperInput, Button, Card, Title, Modal, IconButton, Paragraph, RadioButton, TextInput } from 'react-native-paper';
import { Icon } from '@rneui/themed';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { NoticeboardItem } from '../../model/NoticeboardItem';
import { themeDark, themeLight } from '../../context/PaperTheme';
import RadioButtonGroup from 'react-native-paper/lib/typescript/components/RadioButton/RadioButtonGroup';

const announcementCategories = [
    { label: 'University Announcement', value: 'UNIVERSITY_ANNOUNCEMENT' },
    { label: 'University Guest Announcement', value: 'UNIVERSITY_GUEST_ANNOUNCEMENT' },
    { label: 'College Announcement', value: 'COLLEGE_ANNOUNCEMENT' },
    { label: 'College Guest Announcement', value: 'COLLEGE_GUEST_ANNOUNCEMENT' },
    { label: 'Subject Announcement', value: 'SUBJECT_ANNOUNCEMENT' },
    { label: 'Subject Exam Result Announcement', value: 'SUBJECT_EXAM_RESULT_ANNOUNCEMENT' },
    { label: 'Subject Exam Date Announcement', value: 'SUBJECT_EXAM_DATE_ANNOUNCEMENT' },
    { label: 'Internship Announcement', value: 'INTERNSHIP_ANNOUNCEMENT' },
    { label: 'Activities Announcement', value: 'ACTIVITIES_ANNOUNCEMENT' },
];

export default function NoticeboardShow() {
    const [scopeCombo, setScopeCombo]  = useState("");
    const [scopeComboFilter, setScopeComboFilter] = useState("");
    const [date, setDate] = useState(dayjs());
    const [modalVisibleDate, setModalVisibleDate] = useState(false);
    const [modalVisibleNewItem, setModalVisibleNewItem] = useState(false);

    const [subject, setSubject] = React.useState('');
    const [college, setCollege] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const {userState} = useAuth();
    const {theme} = useTheme();

    const sumbitAnnouncement = async () => {
        /*const config = {
            headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
        };
        const newNoticeboardItem : NoticeboardItem = {
            id: 0,
            title: "",
            message: "",
            updatedAt: new Date(),
            noticeboardItemCategory: new NoticeboardItemCategory,
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

       //TODO: Testiraj mobile platforme
    return (
        <>
       
        <ScrollView style={theme === 'light' ? styles.containerLight : styles.containerDark}>
        <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
            <View style={styles.filterAndSearchContainer}>
                <View style={Platform.OS === 'web' ? (theme === 'light' ? styles.containerFilterLight : styles.containerFilterDark) : (theme === 'light' ? styles.containerFilterLightMobile : styles.containerFilterDarkMobile)}>
                    <Text style={theme === 'light' ? styles.titleFilterLight : styles.titleFilterDark}>Filter by parameters</Text>
                    <View style={styles.filterGrid}>
                        <RadioButton.Group value={scopeComboFilter} onValueChange={(value) => {setScopeComboFilter(value)}} >
                            <View style={styles.radioButtons}>
                                <RadioButton.Item value='University' label='University' position='leading' color={theme === 'light' ? '#4dabf7' : '#9775fa' }></RadioButton.Item>
                                <RadioButton.Item value='College' label='College' position='leading' color={theme === 'light' ? '#4dabf7' : '#9775fa' }></RadioButton.Item>
                                <RadioButton.Item value='Subject' label='Subject' position='leading' color={theme === 'light' ? '#4dabf7' : '#9775fa' }></RadioButton.Item>
                            </View>
                        </RadioButton.Group>
                        <View style={Platform.OS === 'web' ? styles.inputRow : styles.inputColumn}>
                                <PaperInput
                                    label="College"
                                    mode="outlined"
                                    style={Platform.OS === 'web'? (theme === 'light' ? styles.inputLight : styles.inputDark): (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}>
                                </PaperInput>
                                <PaperInput
                                    label="Subject"
                                    mode="outlined"
                                    style={Platform.OS === 'web'? (theme === 'light' ? styles.inputLight : styles.inputDark): (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}>
                                </PaperInput>
                        </View>
                    </View>
                </View>

                <View style={Platform.OS === 'web' ? (theme === 'light' ? styles.containerSearchLight : styles.containerSearchDark) : (theme === 'light' ? styles.containerSearchLightMobile : styles.containerSearchDarkMobile)}>
                    <Text style={theme === 'light' ? styles.titleFilterLight : styles.titleFilterDark}>Search and sort</Text>
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
                                style={Platform.OS === 'web'? (theme === 'light' ? styles.inputLight : styles.inputDark): (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}
                                right={<TextInput.Icon icon='calendar' 
                                    onPress={() => { setModalVisibleDate(true); } }/>} 

                                    />
                        </View>
                    </View>
                </View>
            </View>
        </PaperProvider>

            <View style={Platform.OS ==='web'? styles.contentGrid : styles.contentGridMobile}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <Card key={index} style={Platform.OS === 'web'? (theme === 'light' ? styles.qaContainerLight : styles.qaContainerDark) : (theme === 'light'? styles.qaContainerLightMobile:styles.qaContainerDarkMobile)}>
                        <Card.Content>
                            <Title style={theme === 'light' ? styles.titleLight : styles.titleDark}>Notification title</Title>
                            <Paragraph style={theme === 'light' ? styles.descriptionLight : styles.descriptionDark}>This is description of the notification</Paragraph>
                            <Paragraph style={theme === 'light' ? styles.metaLight : styles.metaDark}>Date: 15.04.2024.</Paragraph>
                            <Paragraph style={theme === 'light' ? styles.metaLight : styles.metaDark}>Subject: Example subject</Paragraph>
                            <Paragraph style={theme === 'light' ? styles.metaLight : styles.metaDark}>College: Example faculty</Paragraph>
                            <Paragraph style={theme === 'light' ? styles.metaLight : styles.metaDark}>Professor: Example professor</Paragraph>
                        </Card.Content>

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
                                onPress={() => console.log('Delete', index)} />
                        </Card.Actions>
                    </Card>
                ))}
            </View>
            
        </ScrollView>

        <Modal style={styles.dateModal} visible={modalVisibleDate} onDismiss={() => { setModalVisibleDate(false); } }>
            <View style={theme === 'light' ? styles.datepickerLight : styles.datepickerDark}>
                <DateTimePicker
                    mode="single"
                    date={date}
                    onChange={(params) => {
                        setDate(dayjs(params.date?.toString()));
                        console.log(date.toISOString());
                    } } />
            </View>
        </Modal>

        <Modal visible={modalVisibleNewItem} contentContainerStyle={theme === 'light' ? styles.modalFormCreateNoticeboardItemLight : styles.modalFormCreateNoticeboardItemDark} onDismiss={() => { setModalVisibleNewItem(false); } }>
            <View>
                <Text style={theme === 'light' ? styles.titleNewItemModalLight : styles.titleNewItemModalDark}>Create a new noticeboard notification</Text>
                <Select label="University/Faculty/Subject" onChange={(e: SelectChangeEvent) => { setScopeCombo(e.target.value); } } style={styles.categoryContainer} value={scopeCombo.toString()}>
                    <MenuItem value="-1"><em>None</em></MenuItem>
                    <MenuItem value="0">University Announcement</MenuItem>
                    <MenuItem value="1">University Guest Announcement</MenuItem>
                    <MenuItem value="2">College Announcement</MenuItem>
                    <MenuItem value="3">College Guest Announcement</MenuItem>
                    <MenuItem value="4">Subject Announcement</MenuItem>
                    <MenuItem value="5">Subject Exam Result Announcement</MenuItem>
                    <MenuItem value="6">Subject Exam Date Announcement</MenuItem>
                    <MenuItem value="7">Internship Announcement</MenuItem>
                    <MenuItem value="8">Activities Announcement</MenuItem>
                </Select>
                <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
                    <PaperInput
                        label="College"
                        mode="outlined"
                        value={college}
                        onChangeText={text => setCollege(text)}
                        style={styles.input} />

                    <PaperInput
                        label="Subject"
                        mode="outlined"
                        value={subject}
                        onChangeText={text => setSubject(text)}
                        style={styles.input} />

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
                    <Button mode='contained' onPress={() => sumbitAnnouncement()} style={theme === 'light' ? styles.createNoticeboardItemButtonLight : styles.createNoticeboardItemButtonDark}> Submit announcement </Button>
                    <Button mode='contained-tonal' onPress={() => setModalVisibleNewItem(false)} style={theme === 'light' ? styles.cancelNoticeboardItemButtonLight : styles.cancelNoticeboardItemButtonDark}> Cancel </Button>
                </View>

            </View>
        </Modal>

        <Button mode='contained' style={theme === 'light' ? styles.addNoticeboardItemButtonLight : styles.addNoticeboardItemButtonDark} onPress={() => setModalVisibleNewItem(true)}>
            Create noticeboard notification
        </Button>
    </>
    );
};

const styles = StyleSheet.create({
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

    datepickerLight: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
    },

    //TODO Popravi ovo
    datepickerDark: {
        color: 'white',
        backgroundColor: 'rgb(30,30,30)',
        borderRadius: 20,
        padding: 20,
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
        marginTop: 20
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
        titleDark: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },

    titleFilterLight: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
        color: 'black'
    },

    titleFilterDark: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
        color: 'white'
    },

    descriptionLight: {
        fontSize: 18,
        marginVertical: 5,
        color: 'black'
    },

    descriptionDark: {
        fontSize: 18,
        marginVertical: 5,
        color: 'white'
    },
    
    metaLight: {
        fontSize: 16,
        color: '#666',
    },

    metaDark: {
        fontSize: 16,
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
        width: 600,
    },

    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        width: '40%',
        alignSelf: 'center',
    },

    modalFormCreateNoticeboardItemDark: {
        backgroundColor: '#242526',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '40%',
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

    titleNewItemModalDark: {
        color: 'white',
        fontSize: 24,
        marginTop: 10,
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

    addNoticeboardItemButtonDark: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#9775fa',
    },

    inputLight: {
        marginTop: 10,
        color: '#242526',
        width: '49%',
    },

    inputLightMobile: {
        marginTop: 10,
        color: '#242526',
        width: '100%',
        alignSelf: 'center',
    },
    
    inputDark: {
        marginTop: 10,
        color: 'white',
        width: '49%',
    },

    inputDarkMobile: {
        marginTop: 10,
        color: 'white',
        width: '100%',
        alignSelf: 'center',
    },

    radioButtonLight: {
        color: '#4dabf7'
    },

    radioButtonDark: {
        color: '#9775fa'
    },
});