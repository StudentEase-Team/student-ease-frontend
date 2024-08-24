import React, { useState } from "react";
import { Platform, NativeSyntheticEvent, TextInputChangeEventData, View, Text, StyleSheet } from "react-native";
import { IconButton, Button, TextInput as PaperInput, Modal } from "react-native-paper";
import { API_BASE_URL } from '@env';
import { themeLight, themeDark } from "../../context/PaperTheme";
import axios, { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { FAQItem } from "../../model/FAQItem";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { I18n } from "i18n-js";

type FAQShowModalProps = {
    itemsBak: FAQItem[] | undefined,
    i18n: I18n
}

function FAQShowModal({itemsBak, i18n}: FAQShowModalProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const {userState} = useAuth();
    const {theme} = useTheme();
    const [question, setQuestion] = useState('');

    const submitQuestion = async () => {
        const config = {
          headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
        };
        const newQuestion: FAQItem = {
          id: 0,
          answer: '',
          isAnswered: false,
          question: question,
          creationDate: new Date()
        };
        const response: AxiosResponse = await axios.post(`${API_BASE_URL}/faq/item`, newQuestion, config);
        if (response.status === 201) {
          Toast.show({
            type: 'success',
            text1: 'Asked succesfully!',
          });
          setModalVisible(false);
          itemsBak?.push(newQuestion);
        }
      };

    return (
        <>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={Platform.OS === 'web'? (theme === 'light'? styles.modalContainerLight: styles.modalContainerDark) : (theme === 'light'? styles.modalContainerLightMobile: styles.modalContainerDarkMobile)}>
            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleModalLight : styles.titleModalDark) : (theme === 'light' ? styles.titleModalLightMobile : styles.titleModalDarkMobile)}>
                {i18n.t('faqNewItem_prompt')}
            </Text>
            <PaperInput 
                theme={theme === 'light' ? themeLight : themeDark} 
                mode='outlined' 
                multiline 
                numberOfLines={4} 
                style={styles.input} 
                value={question} 
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => { 
                    setQuestion(e.nativeEvent.text); 
                }} 
            />
            <View style={styles.buttonRow}>
                <Button mode='contained' onPress={() => submitQuestion()} style={theme === 'light' ? styles.createQuestionButtonLight : styles.createQuestionButtonDark}>
                    {i18n.t('faqNewItem_ask')}
                </Button>
                <Button mode='contained-tonal' onPress={() => setModalVisible(false)} style={theme === 'light' ? styles.cancelQuestionButtonLight : styles.cancelQuestionButtonDark}>
                    {i18n.t('faqNewItem_cancel')}
                </Button>
            </View>
        </Modal>

            
      {Platform.OS === 'web' ? (
            <Button mode='contained' style={ theme === 'light' ? styles.askQuestionButtonLight : styles.askQuestionButtonDark} onPress={() => setModalVisible(true)}>
            {i18n.t('faqNewItem_ask')}
            </Button>
        ) : (
            <IconButton icon='plus' iconColor='white' size={45} style={theme === 'light' ? styles.askQuestionButtonLightMobile : styles.askQuestionButtonDarkMobile} onPress={() => setModalVisible(true)}>
            </IconButton>
        )}
        </>
    )
}

const styles = StyleSheet.create({
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
    
    input: {
        width: '100%',
    },
    
    inputMobile: {
        width: '100%',
    },
    
    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
        marginTop: 20,
    },   

    titleLight: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'  
    },
    
    titleLightMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'  
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
        marginBottom: 15,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'flex-start'
    },
    
    titleModalLightMobile: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 15,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'flex-start'
    },
    
    titleModalDark: {
        color:'white',
        fontSize: 24,
        marginTop: 10,
        marginBottom: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    },
    
    titleModalDarkMobile: {
        color:'white',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    },

    askQuestionButtonLight: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#4dabf7',
    },
    
    askQuestionButtonLightMobile: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#4dabf7',
    },
    
    askQuestionButtonDark: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#9775fa',
    },
    
    askQuestionButtonDarkMobile: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#9775fa',
    },
    
    button: {
        width: '49%',
    },
    
    createQuestionButtonLight: {
        width: '49%',
        backgroundColor: '#4dabf7',
    },
    
    createQuestionButtonDark: {
        width: '49%',
        backgroundColor: '#9775fa',
    },
    
    cancelQuestionButtonLight: {
        width: '49%',
    },
    
    cancelQuestionButtonDark: {
        width: '49%',
        backgroundColor: 'grey',
    },
})

export default FAQShowModal;