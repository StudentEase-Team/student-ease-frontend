import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Provider as PaperProvider, Button, TextInput, Menu, Divider, Text } from 'react-native-paper';

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

export default function NoticeboardCreateItem() {
    const [subject, setSubject] = React.useState('');
    const [faculty, setFaculty] = React.useState('');
    const [professor, setProfessor] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [categoryMenuVisible, setCategoryMenuVisible] = React.useState(false);

    const [scopeCombo, setScopeCombo]  = useState("");

    return (
        <PaperProvider>
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        label="Subject"
                        mode="outlined"
                        value={subject}
                        onChangeText={text => setSubject(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Faculty"
                        mode="outlined"
                        value={faculty}
                        onChangeText={text => setFaculty(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Professor"
                        mode="outlined"
                        value={professor}
                        onChangeText={text => setProfessor(text)}
                        style={styles.input}
                    />
                    
                    <TextInput
                        label="Title"
                        mode="outlined"
                        value={title}
                        onChangeText={text => setTitle(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Description"
                        mode="outlined"
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={text => setDescription(text)}
                        style={styles.input}
                    />

                    <View style={styles.categoryContainer}>
                        <Select label="University/Faculty/Subject" onChange={(e : SelectChangeEvent) => {setScopeCombo(e.target.value)}} value={scopeCombo}>
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="UNIVERSITY_ANNOUNCEMENT">University Announcement</MenuItem>
                            <MenuItem value="UNIVERSITY_GUEST_ANNOUNCEMENT">University Guest Announcement</MenuItem>
                            <MenuItem value="COLLEGE_ANNOUNCEMENT">College Announcement</MenuItem>
                            <MenuItem value="COLLEGE_GUEST_ANNOUNCEMENT">College Guest Announcement</MenuItem>
                            <MenuItem value="SUBJECT_ANNOUNCEMENT">Subject Announcement</MenuItem>
                            <MenuItem value="SUBJECT_EXAM_RESULT_ANNOUNCEMENT">Subject Exam Result Announcement</MenuItem>
                            <MenuItem value="SUBJECT_EXAM_DATE_ANNOUNCEMENT">Subject Exam Date Announcement</MenuItem>
                            <MenuItem value="INTERNSHIP_ANNOUNCEMENT">Internship Announcement</MenuItem>
                            <MenuItem value="ACTIVITIES_ANNOUNCEMENT">Activities Announcement</MenuItem>
                        </Select>
                    </View>

                    <Button mode="contained" onPress={() => console.log('Announcement Submitted!')} style={styles.submitButton}>
                        Submit Announcement
                    </Button>
                </View>
            </View>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        opacity: 0.85,
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
        minWidth: '30%',
      },

    input: {
        marginBottom: 10,
    },

    categoryContainer: {
        marginBottom: 20,
    },

    submitButton: {
        marginTop: 20,
    },
});