import React, { useState } from 'react';
import { Text } from '@rneui/themed';
import { MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Provider as PaperProvider, TextInput as PaperInput, Button, Provider, Card, Title, Modal } from 'react-native-paper';
import { Icon } from '@rneui/themed';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { useAuth } from '../context/AuthContext';
import { NoticeboardItem } from '../model/NoticeboardItem';

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
       //TODO: izbaciti dugme i napraviti kontrolu nalik datepicker-a
    return (
        <>
        <ScrollView style={styles.container}>
            <View style={styles.filterAndSearchContainer}>
                <View style={styles.containerFilter}>
                    <Text style={styles.titleFilter}>Filter by parameters...</Text>
                    <View style={styles.filterGrid}>
                        <Select style={styles.comboBox} label="University/Faculty/Subject" onChange={(e : SelectChangeEvent) => {setScopeCombo(e.target.value)}} value={scopeCombo}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="University">University</MenuItem>
                            <MenuItem value="Faculty">Faculty</MenuItem>
                            <MenuItem value="Subject">Subject</MenuItem>
                        </Select>

                        <PaperInput
                        label="Faculty"
                        mode="outlined">
                            
                        </PaperInput>

                        <PaperInput
                        label="Subject"
                        mode="outlined">
                            
                        </PaperInput>
                    </View>
                </View>

                <View style={styles.containerSearch}>
                    <Text style={styles.titleFilter}>Search and sort...</Text>
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
                            <Text style={styles.description}>This is description of the notification</Text>
                            <Text style={styles.meta}>Date: 15.04.2024.</Text>
                            <Text style={styles.meta}>Subject: Example subject</Text>
                            <Text style={styles.meta}>College: Example faculty</Text>
                            <Text style={styles.meta}>Professor: Example professor</Text>
                        </Card.Content>

                        <Card.Actions>
                            <Icon name="edit" type="feather"/>
                            <Icon name="trash-alt" type="font-awesome-5"/>
                        </Card.Actions>
                    </Card>
                ))}
            </View>
        </ScrollView>
 
        <Modal style={styles.dateContainer} visible={modalVisibleDate} onDismiss={() => {setModalVisibleDate(false)}}>
            <View style={styles.datepicker}>
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

        <Modal visible={modalVisibleNewItem} contentContainerStyle={styles.modalFormCreateNoticeboardItem} onDismiss={() => {setModalVisibleNewItem(false)}}>
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
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    dateContainer: {
        flex: 1,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
    },

    datepicker: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
    },

    filterAndSearchContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerFilter: {
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

    filterGrid: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20,
    }, 

    containerSearch: {
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
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
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

    titleFilter: {
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 24,
        marginBottom: 20,
        marginTop: 20,
    },

    description: {
        fontSize: 18,
        marginVertical: 5,
    },
    
    meta: {
        fontSize: 16,
        color: '#666',
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

    modalFormCreateNoticeboardItem: {
        backgroundColor: 'white',
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