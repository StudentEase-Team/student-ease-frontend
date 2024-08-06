import React, { useCallback, useEffect, useState } from 'react';
import { Text } from '@rneui/themed';
import { TextInput as PaperInput, Button, Card, Modal, PaperProvider, IconButton, Snackbar } from 'react-native-paper';
import { NativeSyntheticEvent, Platform, ScrollView, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { FAQItem } from '../../../model/FAQItem';
import { useAuth } from '../../../context/AuthContext';
import axios, { AxiosResponse } from 'axios';
import { useTheme } from '../../../context/ThemeContext';
import { themeLight, themeDark } from '../../../context/PaperTheme';
import { API_BASE_URL } from '@env';
import zIndex from '@mui/material/styles/zIndex';
import { useFocusEffect } from 'expo-router';

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
        text1: 'Asked succesfully!',
      });
      setModalVisible(false);
      //items?.push(newQuestion);
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
          text1: 'Succesfully deleted!',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to delete question. Can delete only if you answered it.',
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
        <View style={(Platform.OS === 'web')? (theme === 'light' ? styles.containerFilterLight : styles.containerFilterDark) : (theme === 'light' ? styles.containerFilterLightMobile : styles.containerFilterDarkMobile)}>
          <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleSearchLight : styles.titleSearchDark) : (theme === 'light' ? styles.titleSearchLightMobile : styles.titleSearchDarkMobile)}>Search FAQ here</Text>
          <PaperProvider theme={theme === 'light'? themeLight : themeDark}>
          <PaperInput placeholder='Search here...' mode='outlined' label="Search here..." style={styles.searchBar} value={searchParam} onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleSearch(e)}/>
          </PaperProvider>
        </View>

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
                <IconButton
                    icon="delete"
                    mode='outlined'
                    size={25}
                    iconColor={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'}
                    onPress={() => deleteFAQ(item.id)}
                    />
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
          <Text style={Platform.OS === 'web' ? (theme === 'light'? styles.titleModalLight : styles.titleModalDark) : theme === 'light'? styles.titleModalLightMobile : styles.titleModalDarkMobile}>Ask your question here:</Text>
          <PaperInput theme={theme === 'light'? themeLight : themeDark} mode='outlined' multiline numberOfLines={4} style={styles.input} value={question} onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => { setQuestion(e.nativeEvent.text); }}/>
          <View style={styles.buttonRow}>
            <Button mode='contained' onPress={() => submitQuestion()} style={ theme === 'light' ? styles.createQuestionButtonLight : styles.createQuestionButtonDark}>Ask a question</Button>
            <Button mode='contained-tonal' onPress={() => setModalVisible(false)} style={ theme === 'light' ? styles.cancelQuestionButtonLight : styles.cancelQuestionButtonDark}>Cancel</Button>
          </View>
        </Modal>

            
        {Platform.OS === 'web' ? (
          <Button mode='contained' style={ theme === 'light' ? styles.askQuestionButtonLight : styles.askQuestionButtonDark} onPress={() => setModalVisible(true)}>
          Ask a question
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

  containerFilterLight: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    padding: 20,
    alignSelf: 'center',
  },

  containerFilterLightMobile: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    padding: 20,
  },

  containerFilterDark: {
    marginBottom: 20,
    backgroundColor: '#242526',
    borderRadius: 20,
    width: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    padding: 20,
    alignSelf: 'center'
  },

  containerFilterDarkMobile: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: '#242526',
    width: '100%',
    borderRadius: 20,
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
    color: 'black',
    marginBottom: 10,
  },

  titleSearchLightMobile: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },

  titleSearchDark: {
    fontWeight: 'bold',
    fontSize: 24,
    color:'white',
    marginBottom: 10,
  },

  titleSearchDarkMobile: {
    fontWeight: 'bold',
    fontSize: 20,
    color:'white',
    marginBottom: 10,
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
    width: '100%',
    color: '#242526',
    alignSelf: 'center',
    height: 45
  },

  qaContainerLight: {
    marginTop: 15,
    width: '60%',
    backgroundColor: 'white',
    alignSelf: 'center',
  },

  qaContainerLightMobile: {
    width: '100%',
    marginTop: 15,
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

  descriptionLight: {
    fontSize: 18,
    marginVertical: 5,
    color: 'black'
  },

  descriptionLightMobile: {
    fontSize: 16,
    marginVertical: 5,
    color: 'black'
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
