import React, { useContext, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../../context/AuthContext';
import { FAQItem } from '../../../model/FAQItem';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '@env';
import { useFocusEffect } from 'expo-router';
import { I18n } from 'i18n-js';
import { translations } from '../../../localization';
import { LocaleContext } from '../../../context/LocaleContext';
import FAQAnswerContent from '../../../components/faq-answer/faq-answer-content';
import FAQAnswerModal from '../../../components/faq-answer/faq-answer-modal';

const FAQ : React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState<FAQItem[]>([]);
    const [currentItem, setCurrentItem] = useState<FAQItem | undefined>(undefined);
    const { userState } = useAuth();
    const i18n = new I18n(translations)
    const { locale} = useContext(LocaleContext);
    i18n.locale = locale

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

    return (
        <>
            <FAQAnswerContent 
                items={items} 
                i18n={i18n} 
                setModalVisible={setModalVisible} 
                setCurrentItem={setCurrentItem} />

            <FAQAnswerModal 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                currentItem={currentItem} 
                setCurrentItem={setCurrentItem} 
                items={items} 
                setItems={setItems} 
                i18n={i18n} />

            <Toast/>
        </>
    );
}

export default FAQ;
