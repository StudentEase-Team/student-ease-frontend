import React, { useCallback, useEffect, useState } from 'react';
import { Text } from '@rneui/themed';
import { TextInput as PaperInput, Button, Card, Modal, PaperProvider } from 'react-native-paper';
import { NativeSyntheticEvent, Platform, ScrollView, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { FAQItem } from '../../../model/FAQItem';
import { useAuth } from '../../../context/AuthContext';
import axios, { AxiosResponse } from 'axios';
import { useTheme } from '../../../context/ThemeContext';
import { themeLight, themeDark } from '../../../context/PaperTheme';
import { API_BASE_URL } from '@env';

const FAQ: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState<FAQItem[]>();
  const [itemsBak, setItemsBak] = useState<FAQItem[]>();
  const [question, setQuestion] = useState('');
  const [searchParam, setSearchParam] = useState('');
  const { userState } = useAuth();
  const { theme } = useTheme();

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
        text1: 'Successfully created!',
      });
      setModalVisible(false);
      items?.push(newQuestion);
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
        text1: 'Failed to fetch questions',
      });
    }
  }, [userState?.token.accessToken]);

  useEffect(() => {
    fetchFAQ();
  }, [fetchFAQ]);

  return (
    <>
      <Toast/>
      <View style={theme === 'light'? styles.pageLightContainer : styles.pageDarkContainer}>
        <View style={(Platform.OS === 'web')? (theme === 'light' ? styles.containerFilterLight : styles.containerFilterDark) : (theme === 'light' ? styles.containerFilterLightMobile : styles.containerFilterDarkMobile)}>
          <Text style={theme === 'light' ? styles.titleSearchLight : styles.titleSearchDark}>Search FAQ here</Text>
          <PaperProvider theme={theme === 'light'? themeLight : themeDark}>
          <PaperInput placeholder='Search here...' mode='outlined' label="Search here..." style={styles.searchBar} value={searchParam} onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleSearch(e)}/>
          </PaperProvider>
        </View>

        <ScrollView style={Platform.OS === 'web'? styles.faqContainer:styles.faqContainerMobile} >
          {items?.map((item, index) => (
            <Card key={index} style={Platform.OS === 'web'? (theme === 'light' ? styles.qaContainerLight : styles.qaContainerDark):(theme === 'light' ? styles.qaContainerLightMobile : styles.qaContainerDarkMobile)}>
              <Card.Content>
                <Text style={theme === 'light' ? styles.titleLight : styles.titleDark}>{item.question}</Text>
                <Text style={theme === 'light' ? styles.descriptionLight : styles.descriptionDark}>{item.answer}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>


        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={Platform.OS === 'web'? (theme === 'light'? styles.modalContainerLight: styles.modalContainerDark) : (theme === 'light'? styles.modalContainerLightMobile: styles.modalContainerDarkMobile)}>
          <Text style={theme === 'light'? styles.titleModalLight: styles.titleModalDark}>Ask your question here:</Text>
          <PaperInput theme={theme === 'light'? themeLight : themeDark} mode='outlined' multiline numberOfLines={4} style={Platform.OS === 'web'? styles.input:styles.inputMobile} value={question} onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => { setQuestion(e.nativeEvent.text); }}/>
          <View style={styles.buttonRow}>
            <Button mode='contained' onPress={() => submitQuestion()} style={ theme === 'light' ? styles.createQuestionButtonLight : styles.createQuestionButtonDark}>Ask a question</Button>
            <Button mode='contained-tonal' onPress={() => setModalVisible(false)} style={ theme === 'light' ? styles.cancelQuestionButtonLight : styles.cancelQuestionButtonDark}>Cancel</Button>
          </View>
        </Modal>

            
        <Button mode='contained' style={ theme === 'light' ? styles.askQuestionButtonLight : styles.askQuestionButtonDark} onPress={() => setModalVisible(true)}>
          Ask a question
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  pageLightContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  pageDarkContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222'
  },
  containerFilterLight: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    padding: 20,
  },
  containerFilterLightMobile: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '95%',
    height: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    padding: 20,
  },
  containerFilterDark: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: 'rgb(30,30,30)',
    borderRadius: 20,
    width: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    padding: 20,
  },
  containerFilterDarkMobile: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: 'rgb(30,30,30)',
    borderRadius: 20,
    width: '95%',
    height: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    padding: 20,
  },
  titleSearchLight: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
  },
  titleSearchDark: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
    color:'white'
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
    flex: 1,
    marginTop: 15,
    overflow: 'scroll',
    width: '90%',
  },
  faqContainerMobile: {
    flex: 1,
    marginTop: 15,
    overflow: 'scroll',
    width: '95%',
  },
  searchBar: {
    marginTop: 30,
    width: '100%',
    borderRadius: 20,
    marginBottom: 10,
  },
  qaContainerLight: {
    marginTop: 15,
    width: '67%',
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  qaContainerLightMobile: {
    marginTop: 15,
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  qaContainerDark: {
    marginTop: 15,
    width: '67%',
    backgroundColor: 'rgb(30,30,30)',
    alignSelf: 'center'
  },
  qaContainerDarkMobile: {
    marginTop: 15,
    width: '100%',
    backgroundColor: 'rgb(30,30,30)',
    alignSelf: 'center'
  },
  titleLight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'  
  },
  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  titleModalLight: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  titleModalDark: {
    color:'white',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  descriptionLight: {
    fontSize: 18,
    marginVertical: 5,
    color: 'black'
  },
  descriptionDark: {
    fontSize: 18,
    marginVertical: 5,
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
  askQuestionButtonDark: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    height: 60,
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
