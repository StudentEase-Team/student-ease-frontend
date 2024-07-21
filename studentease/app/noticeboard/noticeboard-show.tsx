import React, { useState } from 'react';
import { Text } from '@rneui/themed';
import { MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Provider as PaperProvider, TextInput as PaperInput, Button, Provider, Card, Title, Modal } from 'react-native-paper';
import { Icon } from '@rneui/themed';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';


export default function NoticeboardShow() {
    const [scopeCombo, setScopeCombo]  = useState("");
    const dropdownList = [new Option("University", "University"), new Option("University", "University")]
    const [date, setDate] = useState(dayjs());
    const [modalVisible, setModalVisible] = useState(false);
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

                        <Button onPress={() => { setModalVisible(true) }} mode='contained'>Choose date</Button>
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

 
        <Modal style={styles.dateContainer} visible={modalVisible} onDismiss={() => {setModalVisible(false)}}>
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
});