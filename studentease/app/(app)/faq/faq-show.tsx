import React, { useCallback, useContext, useState } from 'react';
import { Text } from '@rneui/themed';
import { TextInput as PaperInput, Button, Card, Modal, PaperProvider, IconButton, Searchbar } from 'react-native-paper';
import { NativeSyntheticEvent, Platform, ScrollView, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { FAQItem } from '../../../model/FAQItem';
import { useAuth } from '../../../context/AuthContext';
import axios, { AxiosResponse } from 'axios';
import { useTheme } from '../../../context/ThemeContext';
import { themeLight, themeDark } from '../../../context/PaperTheme';
import { API_BASE_URL } from '@env';
import { useFocusEffect } from 'expo-router';
import { I18n } from 'i18n-js';
import { translations } from '../../../localization';
import { LocaleContext } from '../../../context/LocaleContext';

const FAQ: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState<FAQItem[]>();
  const [itemsBak, setItemsBak] = useState<FAQItem[]>();
  const [question, setQuestion] = useState('');
  const [searchParam, setSearchParam] = useState('');
  const { userState } = useAuth();
  const { theme } = useTheme();
  const i18n = new I18n(translations)
  const { locale} = useContext(LocaleContext);
  i18n.locale = locale

  const submitQuestion = async () => {
    const config = {
      headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
    };
    const newQuestion: FAQItem = {
      id: 0,
      answer: '',
      isAnswered: false,
      question: question
    };
    const response: AxiosResponse = await axios.post(`${API_BASE_URL}/faq/item`, newQuestion, config);
    if (response.status === 201) {
      Toast.show({
        type: 'success',
        text1: i18n.t('faqNewItem_askedSuccessfully'),
      });
      setModalVisible(false);
      itemsBak?.push(newQuestion);
    }
  };

  const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const searchValue = e.nativeEvent.text;
    setSearchParam(searchValue);
    if (searchValue === '') {
      setItems(itemsBak);
    } else {
      setItems(itemsBak?.filter(i => i.question.toLowerCase().includes(searchValue.toLowerCase())));
    }
  };

  const fetchFAQ = useCallback(async () => {
    if (!userState?.token.accessToken) return;

    const config = {
      headers: { Authorization: `Bearer ${userState.token.accessToken}` }
    };
    try {
      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/faq/items`, config);
      if (response.status === 200) {
        setItems(response.data);
        setItemsBak(response.data);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: i18n.t('faq_failedFetch'),
      });
    }
  }, []);

  async function deleteFAQ(id: number) {
    if (!userState?.token.accessToken) return;

    const config = {
      headers: { Authorization: `Bearer ${userState.token.accessToken}` }
    };
    try {
      const response: AxiosResponse = await axios.delete(`${API_BASE_URL}/faq/item/${id}`, config);
      if (response.status === 200) {
        fetchFAQ();
        Toast.show({
          type: 'success',
          text1: i18n.t('faqNewItem_deletedSuccessfully'),
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: i18n.t('faqNewItem_failedDelete'),
      });
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchFAQ();
  }, []));

  return (
    <>
      <ScrollView style={theme === 'light'? styles.pageLightContainer : styles.pageDarkContainer}>
          <PaperProvider theme={theme === 'light'? themeLight : themeDark}>
            <Searchbar placeholder={i18n.t('searchPlaceholder')} style={Platform.OS === 'web'? styles.searchBar : styles.searchBarMobile} value={searchParam} onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleSearch(e)}/>
          </PaperProvider>

        <View style={Platform.OS === 'web'? styles.faqContainer:styles.faqContainerMobile} >
          {items?.map((item, index) => (
            <Card key={index} style={Platform.OS === 'web'? (theme === 'light' ? styles.qaContainerLight : styles.qaContainerDark):(theme === 'light' ? styles.qaContainerLightMobile : styles.qaContainerDarkMobile)}>
              <Card.Content>
                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>{item.question}</Text>
                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>{item.answer}</Text>
                <View style={{height:10}}/>
              </Card.Content>
              {userState?.role !== "STUDENT"? (
              <Card.Actions>
                <IconButton icon="delete" mode={theme === 'light' ? 'contained' : 'outlined'} size={25} iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'} onPress={() => deleteFAQ(item.id)}/>
              </Card.Actions>
              ):(
                ''
              )}

            </Card>
          ))}
        </View>
        <View style={{height:50}}/>
      </ScrollView>


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
        
      <Toast/>
    </>
  );
};

const styles = StyleSheet.create({
  pageLightContainer: {
    flex: 1,
    padding: 20,
  },

  pageDarkContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#18191A'
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
    marginTop: 10
  },

  searchBar: {
    marginTop: 10,
    marginBottom: 50,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 10,
    height: 60
  },

  searchBarMobile: {
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },

  qaContainerLight: {
    marginTop: 15,
    width: '60%',
    backgroundColor: 'white',
    alignSelf: 'center',
  },

  qaContainerLightMobile: {
    width: '100%',
    marginTop: 10,
    backgroundColor: 'white',
  },

  qaContainerDark: {
    marginTop: 15,
    width: '60%',
    alignSelf: 'center',
    backgroundColor: '#242526',
  },
  
  qaContainerDarkMobile: {
    width: '100%',
    marginTop: 15,
    backgroundColor: '#242526',
  },

  titleLight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'  
  },

  titleLightMobile: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'  
  },

  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },

  titleDarkMobile: {
    fontSize: 18,
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

  descriptionLight: {
    fontSize: 18,
    marginTop: 20,
    color: 'black'
  },

  descriptionLightMobile: {
    fontSize: 16,
    marginTop: 20,
    color: 'black'
  },

  descriptionDark: {
    fontSize: 18,
    marginTop: 20,
    color: 'white'
  },

  descriptionDarkMobile: {
    fontSize: 16,
    marginTop: 20,
    color: 'white'
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
});

export default FAQ;
