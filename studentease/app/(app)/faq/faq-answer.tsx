import React, { useEffect, useState } from 'react';
import { Text } from '@rneui/themed';
import { TextInput as PaperInput, Button, Card, Modal, PaperProvider} from 'react-native-paper';
import { NativeSyntheticEvent, Platform, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Icon } from 'react-native-elements';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { FAQItem } from '../../../model/FAQItem';
import axios, { AxiosResponse } from 'axios';
import { themeDark, themeLight } from '../../../context/PaperTheme';
import { API_BASE_URL } from '@env';

const FAQ : React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState<FAQItem[]>([]);
    const [currentItem, setCurrentItem] = useState<FAQItem | undefined>(undefined);
    const [answer, setAnswer] = useState('');
    const { userState } = useAuth();
    const { theme } = useTheme();

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
        };
        const fetchFAQ = async () => {
            try {
                const response: AxiosResponse = await axios.get(`${API_BASE_URL}/faq/items/unanswered`, config);
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
                const response: AxiosResponse = await axios.put(`${API_BASE_URL}/faq/item`, currentItem, config);
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
            <PaperProvider theme={theme === 'light'? themeLight: themeDark}>
            <View style={theme === 'light'? styles.pageContainerLight : styles.pageContainerDark}>
                <View style={Platform.OS === 'web'? styles.faqContainer:styles.faqContainerMobile}>
                    {items.length === 0 ? (
                            <Card style={Platform.OS === 'web'? styles.qaContainer:styles.qaContainerMobile}>
                                <Card.Content>
                                    <Text style={theme === 'light' ? styles.titleLight : styles.titleDark}>No unanswered questions!</Text>
                                </Card.Content>
                            </Card>
                    ) : (
                        items.map((item, index) => (
                            <Card key={index} style={Platform.OS === 'web'? styles.qaContainer:styles.qaContainerMobile}>
                                <Card.Content>
                                    <Text style={theme === 'light'? styles.titleLight : styles.titleDark}>{item.question}</Text>
                                    <Text style={theme === 'light' ? styles.descriptionLight : styles.descriptionDark}>{item.answer}</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Icon name="question-answer" type='material-icons'  color={theme === 'light'? 'black' : 'white'} onPress={() => {setModalVisible(true); setCurrentItem(item)}}/>
                                </Card.Actions>
                            </Card>
                        ))
                    )}
                </View>

                <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={Platform.OS === 'web'? (theme === 'light'? styles.modalContainerLight : styles.modalContainerDark):(theme === 'light'? styles.modalContainerLightMobile : styles.modalContainerDarkMobile)}>
                    <Text style={theme === 'light'? styles.titleModalLight : styles.titleModalDark}>Answer:</Text>
                    <PaperInput mode='outlined' style={styles.searchBar} value={answer} onChange={(e : NativeSyntheticEvent<TextInputChangeEventData>) => {setAnswer(e.nativeEvent.text)}}></PaperInput>
                    <View style={styles.buttonRow}>
                        <Button mode='contained' onPress={() => answerQuestion()}> Answer </Button>
                        <Button mode='contained' onPress={() => {setModalVisible(false); setCurrentItem(undefined);}}> Cancel </Button>
                    </View>
                </Modal>
            </View>
            </PaperProvider>
        </>
    );
}

const styles = StyleSheet.create({

    pageContainerLight: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },    
    pageContainerDark: {
        backgroundColor: '#222',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },    

    modalContainerLight: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '40%',
        alignSelf: 'center',
    },

    modalContainerLightMobile: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '95%',
        alignSelf: 'center',
    },

    modalContainerDark: {
        backgroundColor: 'rgb(30,30,30)',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '40%',
        alignSelf: 'center',
    },

    modalContainerDarkMobile: {
        backgroundColor: 'rgb(30,30,30)',
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
    
    faqContainer: {
        flex: 1,
        marginTop: 15,
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'scroll',
        width: '90%',
    },

    faqContainerMobile: {
        flex: 1,
        marginTop: 15,
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'scroll',
        width: '95%',
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
    qaContainerMobile: {
        marginTop: 15,
        width: '100%',
    },

    titleLight: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    titleDark: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },

    titleModalLight: {
        fontSize: 24,
        marginTop: 10,
        fontWeight: 'bold',
    },

    titleModalDark: {
        fontSize: 24,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'white'
    },

    descriptionLight: {
        fontSize: 18,
        marginVertical: 5,
    },

    descriptionDark: {
        fontSize: 18,
        marginVertical: 5,
        color: 'white'
    },

    noQuestionsTextLight: {
        fontSize: 18,
        color: 'gray',
        marginTop: 20,
    },

    noQuestionsTextDark: {
        fontSize: 18,
        color: 'white',
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
