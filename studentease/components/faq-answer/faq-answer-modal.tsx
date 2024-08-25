import React, { useState } from "react";
import { Platform, NativeSyntheticEvent, TextInputChangeEventData, View, Text, StyleSheet } from "react-native";
import { themeLight, themeDark } from "../../context/PaperTheme";
import { I18n } from "i18n-js";
import { TextInput, Button, Modal } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import axios, { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { FAQItem } from "../../model/FAQItem";
import { API_BASE_URL } from '@env';
import { useAuth } from "../../context/AuthContext";

type FAQAnswerModalProps = {
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    currentItem: FAQItem | undefined,
    setCurrentItem: React.Dispatch<React.SetStateAction<FAQItem | undefined>>, 
    items: FAQItem[],
    setItems: React.Dispatch<React.SetStateAction<FAQItem[]>>,
    i18n: I18n,
}

function FAQAnswerModal({modalVisible, setModalVisible, currentItem, setCurrentItem, items, setItems, i18n}: FAQAnswerModalProps) {
    const { theme } = useTheme();
    const { userState } = useAuth();
    const [answer, setAnswer] = useState('');

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
                    text1: i18n.t('faq_answer_modal_toast'),
                });
            }
        }
    }

    return (
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={Platform.OS === 'web' ? (theme === 'light' ? styles.modalContainerLight : styles.modalContainerDark) : (theme === 'light' ? styles.modalContainerLightMobile : styles.modalContainerDarkMobile)}>
            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleModalLight : styles.titleModalDark) : theme === 'light' ? styles.titleModalLightMobile : styles.titleModalDarkMobile}>
                {i18n.t('faq_answer')}
            </Text>
            <TextInput 
                theme={theme === 'light' ? themeLight : themeDark} 
                mode='outlined' 
                multiline 
                numberOfLines={4} 
                style={styles.input} 
                label={i18n.t('faq_answerPlaceholder')} 
                value={answer} 
                onChange={(e : NativeSyntheticEvent<TextInputChangeEventData>) => {setAnswer(e.nativeEvent.text)}}
            />
            <View style={styles.buttonRow}>
                <Button mode='contained' onPress={() => answerQuestion()} style={theme === 'light' ? styles.answerButtonLight : styles.answerButtonDark}>
                    {i18n.t('faq_answerButton')}
                </Button>
                <Button mode='contained-tonal' onPress={() => {setModalVisible(false); setCurrentItem(undefined);}} style={theme === 'light' ? styles.cancelButtonLight : styles.cancelButtonDark}>
                    {i18n.t('faq_cancelButton')}
                </Button>
            </View>
        </Modal>
    );
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

    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
        marginTop: 20,
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
})

export default FAQAnswerModal;