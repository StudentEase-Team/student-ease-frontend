import React, { useState } from 'react';
import { Text } from '@rneui/themed';
import { MenuItem, Select, SelectChangeEvent} from '@mui/material';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Provider as PaperProvider, TextInput as PaperInput, Button, Card, Title, Modal } from 'react-native-paper';
import { Icon } from '@rneui/themed';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { NoticeboardItem } from '../model/NoticeboardItem';
import { themeDark, themeLight } from '../context/PaperTheme';

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
    const dropdownList = [new Option("University", "University"), new Option("University", "University")]
    const [date, setDate] = useState(dayjs());
    const [modalVisibleDate, setModalVisibleDate] = useState(false);
    const [modalVisibleNewItem, setModalVisibleNewItem] = useState(false);

    const [subject, setSubject] = React.useState('');
    const [college, setCollege] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const {userState} = useAuth()
    const {theme} = useTheme()

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
        const response : AxiosResponse = await axios.post('http://localhost:8080/api/faq/item', newQuestion, config)
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
        <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
        <ScrollView style={theme === 'light'? styles.containerLight : styles.containerDark}>
            <View style={styles.filterAndSearchContainer}>
                <View style={theme === 'light' ? styles.containerFilterLight : styles.containerFilterDark}>
                    <Text style={theme === 'light'? styles.titleFilterLight : styles.titleFilterDark}>Filter by parameters...</Text>
                    <View style={styles.filterGrid}>
                        <Select style={styles.comboBox} label="University/Faculty/Subject" onChange={(e : SelectChangeEvent) => {setScopeCombo(e.target.value)}} value={scopeCombo}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="University">University</MenuItem>
                            <MenuItem value="Faculty">Faculty</MenuItem>
                            <MenuItem value="Subject">Subject</MenuItem>
                        </Select>

                        <PaperInput
                        label="Faculty"
                        mode="outlined"
                        >
                            
                        </PaperInput>

                        <PaperInput
                        label="Subject"
                        mode="outlined">
                            
                        </PaperInput>
                    </View>
                </View>

                <View style={theme === 'light'? styles.containerSearchLight : styles.containerSearchDark}>
                    <Text style={theme === 'light'? styles.titleFilterLight : styles.titleFilterDark}>Search and sort...</Text>
                    <View style={styles.searchSortGrid}>
                        <PaperInput
                        label="Search..."
                        mode="outlined">
                        </PaperInput>

                        <Button onPress={() => { setModalVisibleDate(true) }} mode='contained'>Choose date</Button>
                    </View>
                </View>
            </View>

            <View style={styles.contentGrid}>
                {Array.from({ length: 10}).map((_, index) => (
                    <Card key={index} style={styles.notification}>
                        <Card.Title title="Notification title" titleStyle={styles.title}></Card.Title>
                        <Card.Content>
                            <Text style={theme === 'light' ? styles.descriptionLight : styles.descriptionDark}>This is description of the notification</Text>
                            <Text style={theme === 'light' ? styles.metaLight : styles.metaDark}>Date: 15.04.2024.</Text>
                            <Text style={theme === 'light' ? styles.metaLight : styles.metaDark}>Subject: Example subject</Text>
                            <Text style={theme === 'light' ? styles.metaLight : styles.metaDark}>College: Example faculty</Text>
                            <Text style={theme === 'light' ? styles.metaLight : styles.metaDark}>Professor: Example professor</Text>
                        </Card.Content>

                        <Card.Actions>
                            <Icon name="edit" type="feather" color={theme === 'light'? 'black':'white'}/>
                            <Icon name="trash-alt" type="font-awesome-5" color={theme === 'light'? 'black':'white'}/>
                        </Card.Actions>
                    </Card>
                ))}
            </View>
        </ScrollView>
 
        <Modal style={styles.dateModal} visible={modalVisibleDate} onDismiss={() => {setModalVisibleDate(false)}}>
            <View style={theme === 'light'? styles.datepickerLight : styles.datepickerDark}>
                <DateTimePicker 
                    mode="single"
                    date={date}
                    onChange={(params) => {
                        setDate(dayjs(params.date?.toString()));
                        console.log(date.toISOString());
                    }}
                />
            </View>
        </Modal>

        <Modal visible={modalVisibleNewItem} contentContainerStyle={theme === 'light'? styles.modalFormCreateNoticeboardItemLight : styles.modalFormCreateNoticeboardItemDark} onDismiss={() => {setModalVisibleNewItem(false)}}>
            <View>
                <Text style={styles.titleNewItem}>Create a new noticeboard notification</Text>
                <Select label="University/Faculty/Subject" onChange={(e : SelectChangeEvent) => {setScopeCombo(e.target.value)}} style={styles.categoryContainer} value={scopeCombo.toString()}>
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

                <PaperInput
                    label="College"
                    mode="outlined"
                    value={college}
                    onChangeText={text => setCollege(text)}
                    style={styles.input}
                />

                <PaperInput
                    label="Subject"
                    mode="outlined"
                    value={subject}
                    onChangeText={text => setSubject(text)}
                    style={styles.input}
                />
                
                <PaperInput
                    label="Title"
                    mode="outlined"
                    value={title}
                    onChangeText={text => setTitle(text)}
                    style={styles.input}
                />
                <PaperInput
                    label="Description"
                    mode="outlined"
                    multiline
                    numberOfLines={4}
                    value={description}
                    onChangeText={text => setDescription(text)}
                    style={styles.input}
                />

                <View style={styles.buttonRow}>
                    <Button mode='contained' onPress={() => sumbitAnnouncement()} style={styles.button}> Submit announcement </Button>
                    <Button mode='contained-tonal' onPress={() => setModalVisibleNewItem(false)} style={styles.button}> Cancel </Button>
                </View>

            </View>
        </Modal>

        <Button mode='contained' style={styles.createNoticeboardNotificationButton} onPress={() => setModalVisibleNewItem(true)}>
            Create noticeboard notification
        </Button>
        </PaperProvider>
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
        backgroundColor: '#222'
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
    },

    containerFilterDark: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: 'rgb(30, 30, 30)',
        borderRadius: 20,
        width: '70%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },

    filterGrid: {
        flex: 1,
        flexDirection: 'row',
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
    },

    containerSearchDark: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        backgroundColor: 'rgb(30,30,30)',
        width: '70%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },

    searchSortGrid: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
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

    notification: {
        //backgroundColor: '#f9f9f9',
        //borderColor: '#ddd',
        borderWidth: 1,
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

    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    titleFilterLight: {
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 24,
        marginBottom: 20,
        marginTop: 20,
        color: 'black'
    },

    titleFilterDark: {
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 24,
        marginBottom: 20,
        marginTop: 20,
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
        backgroundColor: 'rgb(30,30,30)',
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
    }
});