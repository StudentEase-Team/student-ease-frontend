import React, { useState } from 'react';
import { Text } from '@rneui/themed';
import { TextInput as PaperInput, Button, Card, Modal } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Icon } from 'react-native-elements';

const FAQ : React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
    <>
        <Toast/>
        <View style={styles.pageContainer}>
            <View style={styles.faqContainer}>
            {Array.from({ length: 10 }).map((_, index) => (
                <Card key={index} style={styles.qaContainer}>
                    <Card.Title title="Some thoughtful question here?" titleStyle={styles.title}></Card.Title>
                    <Card.Actions>
                        <Icon name="question-answer" type='material-icons' onPress={() => {setModalVisible(true)}}/>
                    </Card.Actions>
                </Card>
            ))}
            </View>

            <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainer}>
                <Text style={styles.titleModal}>Answer:</Text>
                <PaperInput mode='outlined' style={styles.searchBar}></PaperInput>
                <View style={styles.buttonRow}>
                    <Button mode='contained' onPress={() => setModalVisible(false)}> Answer </Button>
                    <Button mode='contained' onPress={() => setModalVisible(false)}> Cancel </Button>
                </View>
            </Modal>
        </View>
    </>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },    

    modalContainer: {
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
    
    faqContainer: {
        flex: 1,
        marginTop: 15,
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'scroll',
        width: '90%',
    },

    searchBar: {
        marginTop: 30,
        width: '75%',
        borderRadius: 15
    },

    qaContainer: {
        marginTop: 15,
        width: '67%',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    titleModal: {
        fontSize: 24,
        marginTop: 10,
        fontWeight: 'bold',
    },

    description: {
        fontSize: 18,
        marginVertical: 5,
    },

    askQuestionButton: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        width: 150,
        height: 40,
    },
});

export default FAQ;
