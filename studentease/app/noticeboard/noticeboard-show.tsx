import React, { useState } from 'react';
import { Text } from '@rneui/themed';
import { MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Provider as PaperProvider, TextInput as PaperInput, Button } from 'react-native-paper';
import { Icon } from '@rneui/themed';

export default function NoticeboardShow() {
    const [scopeCombo, setScopeCombo]  = useState("");

    return (
        <PaperProvider>
            <ScrollView style={styles.container}>
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

                <View style={styles.searchSortGrid}>
                    <PaperInput
                    label="Search..."
                    mode="outlined">

                    </PaperInput>

                    <PaperInput
                    label="Sort by date"
                    mode="outlined">

                    </PaperInput>
                </View>

                <View style={styles.contentGrid}>
                    {Array.from({ length: 10}).map((_, index) => (
                        <View key={index} style={styles.notification}>
                            <View>
                                <Icon name="edit" type="feather"/>
                                <Icon name="trash-alt" type="font-awesome-5"/>
                            </View>
                            <Text style={styles.title}>Notification title</Text>
                            <Text style={styles.description}>This is description of the notification</Text>
                            <Text style={styles.meta}>Date: 15.04.2024.</Text>
                            <Text style={styles.meta}>Subject: Example subject</Text>
                            <Text style={styles.meta}>Faculty: Example faculty</Text>
                            <Text style={styles.meta}>Professor: Example professor</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    filterGrid: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    }, 

    searchSortGrid: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },

    comboBox: {
        width: 250,
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
        fontSize: 16,
        fontWeight: 'bold',
    },

    description: {
        marginVertical: 5,
    },
    
    meta: {
        fontSize: 12,
        color: '#666',
    },
});