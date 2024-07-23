import React, { useEffect, useState } from 'react';
import { Text } from '@rneui/themed';
import { TextInput as PaperInput, Button, Card, Modal } from 'react-native-paper';
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Icon } from 'react-native-elements';
import { useAuth } from '../../context/AuthContext';
import { FAQItem } from '../../model/FAQItem';
import axios, { AxiosResponse } from 'axios';

const FAQ : React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState<FAQItem[]>([]);
    const [currentItem, setCurrentItem] = useState<FAQItem | undefined>(undefined);
    const [answer, setAnswer] = useState('');
    const { userState } = useAuth();

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
        };
        const fetchFAQ = async () => {
            try {
                const response: AxiosResponse = await axios.get('http://localhost:8080/api/faq/items/unanswered', config);
                if (response.status === 200) {
                    setItems(response.data);
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to fetch questions',
                });
            }
        }

        fetchFAQ();
    }, [userState?.token.accessToken]);

    async function answerQuestion() {
        if (currentItem !== undefined) {
            currentItem.answer = answer;
            const config = {
                headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
            };
            try {
                const response: AxiosResponse = await axios.put('http://localhost:8080/api/faq/item', currentItem, config);
                if (response.status === 200) {
                    setItems(items?.filter(t => t.id !== currentItem.id));
                    setCurrentItem(undefined);
                    setModalVisible(false);
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to submit answer',
                });
            }
        }
    }

    return (
        <>
            <Toast/>
            <View style={styles.pageContainer}>
                <View style={styles.faqContainer}>
                    {items.length === 0 ? (
                            <Card style={styles.qaContainer}>
                                <Card.Content>
                                    <Text style={styles.title}>No unanswered questions!</Text>
                                </Card.Content>
                            </Card>
                    ) : (
                        items.map((item, index) => (
                            <Card key={index} style={styles.qaContainer}>
                                <Card.Content>
                                    <Text style={styles.title}>{item.question}</Text>
                                    <Text style={styles.description}>{item.answer}</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Icon name="question-answer" type='material-icons' onPress={() => {setModalVisible(true); setCurrentItem(item)}}/>
                                </Card.Actions>
                            </Card>
                        ))
                    )}
                </View>

                <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainer}>
                    <Text style={styles.titleModal}>Answer:</Text>
                    <PaperInput mode='outlined' style={styles.searchBar} value={answer} onChange={(e : NativeSyntheticEvent<TextInputChangeEventData>) => {setAnswer(e.nativeEvent.text)}}></PaperInput>
                    <View style={styles.buttonRow}>
                        <Button mode='contained' onPress={() => answerQuestion()}> Answer </Button>
                        <Button mode='contained' onPress={() => {setModalVisible(false); setCurrentItem(undefined);}}> Cancel </Button>
                    </View>
                </Modal>
            </View>
        </>
    );
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

    noQuestionsText: {
        fontSize: 18,
        color: 'gray',
        marginTop: 20,
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
