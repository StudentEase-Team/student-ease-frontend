import React, { useEffect, useState } from 'react';
import { Text } from '@rneui/themed';
import { TextInput as PaperInput, Button, Card, Modal, PaperProvider, IconButton} from 'react-native-paper';
import { NativeSyntheticEvent, Platform, ScrollView, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Icon } from 'react-native-elements';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { FAQItem } from '../../../model/FAQItem';
import axios, { AxiosResponse } from 'axios';
import { themeDark, themeLight } from '../../../context/PaperTheme';
import { API_BASE_URL } from '@env';
import { useFocusEffect } from 'expo-router';

const FAQ : React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState<FAQItem[]>([]);
    const [currentItem, setCurrentItem] = useState<FAQItem | undefined>(undefined);
    const [answer, setAnswer] = useState('');
    const { userState } = useAuth();
    const { theme } = useTheme();
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

    useFocusEffect(
        React.useCallback(() => {
          fetchFAQ();
      }, []));

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
            <ScrollView style={theme === 'light'? styles.pageContainerLight : styles.pageContainerDark}>
                <View style={Platform.OS === 'web' ? styles.faqContainer: styles.faqContainerMobile}>
                    {items.length === 0 ? (
                            <Card style={Platform.OS === 'web'? (theme === 'light' ? styles.faqContainerLight : styles.faqContainerDark) : (theme === 'light' ? styles.faqContainerLightMobile : styles.faqContainerDarkMobile)}>
                                <Card.Content>
                                    <Text style={Platform.OS === 'web'? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>No unanswered questions!</Text>
                                </Card.Content>
                            </Card>
                    ) : (
                        items.map((item, index) => (
                            <Card key={index} style={Platform.OS === 'web'? (theme === 'light' ? styles.faqContainerLight : styles.faqContainerDark) : (theme === 'light' ? styles.faqContainerLightMobile : styles.faqContainerDarkMobile)}>
                                <Card.Content>
                                    <Text style={Platform.OS === 'web'? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>{item.question}</Text>
                                    <Text style={Platform.OS === 'web'? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>{item.answer}</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <IconButton icon="forum" mode='outlined' iconColor={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'} onPress={() => {setModalVisible(true); setCurrentItem(item)}}/>
                                </Card.Actions>
                            </Card>
                        ))
                    )}
                </View>
            </ScrollView>

            <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={Platform.OS === 'web'? (theme === 'light'? styles.modalContainerLight : styles.modalContainerDark):(theme === 'light'? styles.modalContainerLightMobile : styles.modalContainerDarkMobile)}>
                <Text style={Platform.OS === 'web' ? (theme === 'light'? styles.titleModalLight : styles.titleModalDark) : theme === 'light'? styles.titleModalLightMobile : styles.titleModalDarkMobile}>Answer:</Text>
                <PaperInput theme={theme === 'light'? themeLight : themeDark} mode='outlined' multiline numberOfLines={4} style={styles.input} label="Answer here" value={answer} onChange={(e : NativeSyntheticEvent<TextInputChangeEventData>) => {setAnswer(e.nativeEvent.text)}}></PaperInput>
                <View style={styles.buttonRow}>
                    <Button mode='contained' onPress={() => answerQuestion()} style={ theme === 'light' ? styles.answerButtonLight : styles.answerButtonDark}> Answer </Button>
                    <Button mode='contained-tonal' onPress={() => {setModalVisible(false); setCurrentItem(undefined);}} style={ theme === 'light' ? styles.cancelButtonLight : styles.cancelButtonDark}> Cancel </Button>
                </View>
            </Modal>
            <Toast/>
        </>
    );
}

const styles = StyleSheet.create({

    pageContainerLight: {
        flex: 1,
        padding: 20,
    },    

    pageContainerDark: {
        flex: 1,
        padding: 20,
        backgroundColor: '#18191A'
    },  
    
    faqContainerLight: {
        backgroundColor: 'white',
        width: '60%'
    },

    faqContainerLightMobile: {
        backgroundColor: 'white',
        width: '100%'
    },

    faqContainerDark: {
        backgroundColor: '#242526',
        width: '60%'
    },

    faqContainerDarkMobile: {
        backgroundColor: '#242526',
        width: '100%'
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
        width: '90%',
        alignSelf: 'center',
    },

    modalContainerDark: {
        backgroundColor: '#242526',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '40%',
        alignSelf: 'center',
    },

    modalContainerDarkMobile: {
        backgroundColor: '#242526',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '90%',
        alignSelf: 'center',
    },

    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
        marginTop: 20,
    },
    
    faqContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20,
    },

    faqContainerMobile: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginTop: 20
    },

    searchBar: {
        marginTop: 30,
        width: '75%',
        borderRadius: 15
    },

    qaContainer: {
        marginTop: 15,
        width: '60%',
        alignSelf: 'center',
    },

    qaContainerMobile: {
        width: '100%',
        marginTop: 15,
    },

    titleLight: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    titleLightMobile: {
        fontSize: 20,
        fontWeight: 'bold',
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

    titleModalLight: {
        fontSize: 24,
        marginTop: 10,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginBottom: 15,
    },

    titleModalLightMobile: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginBottom: 15,
    },

    titleModalDark: {
        fontSize: 24,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'flex-start',
        marginBottom: 15,
    },

    titleModalDarkMobile: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'flex-start',
        marginBottom: 15,
    },

    descriptionLight: {
        fontSize: 18,
        marginVertical: 5,
    },

    descriptionLightMobile: {
        fontSize: 16,
        marginVertical: 5,
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

    input: {
        width: '100%',
    },

    answerButtonLight: {
        width: '49%',
        backgroundColor: '#4dabf7',
    },
    
    answerButtonDark: {
        width: '49%',
        backgroundColor: '#9775fa',
    },
    
    cancelButtonLight: {
        width: '49%',
    },
    
    cancelButtonDark: {
        width: '49%',
        backgroundColor: 'grey',
    },
});

export default FAQ;
