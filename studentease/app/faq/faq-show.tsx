import React, { useCallback, useEffect, useState } from 'react';
import { Text } from '@rneui/themed';
import { TextInput as PaperInput, Button, Card, Modal, PaperProvider } from 'react-native-paper';
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { FAQItem } from '../../model/FAQItem';
import { useAuth } from '../../context/AuthContext';
import axios, { AxiosResponse } from 'axios';
import { useTheme } from '../../context/ThemeContext';
import { themeLight, themeDark } from '../../context/PaperTheme';

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
    const response: AxiosResponse = await axios.post('http://localhost:8080/api/faq/item', newQuestion, config);
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
      const response: AxiosResponse = await axios.get('http://localhost:8080/api/faq/items', config);
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
      <PaperProvider theme={theme === 'light'? themeLight : themeDark}>
      <View style={theme === 'light'? styles.pageLightContainer : styles.pageDarkContainer}>
        <View style={theme === 'light' ? styles.containerFilterLight : styles.containerFilterDark}>
          <Text style={theme === 'light' ? styles.titleSearchLight : styles.titleSearchDark}>Search FAQ here</Text>
          <PaperInput placeholder='Search here...' mode='outlined' label="Search here..." style={styles.searchBar} value={searchParam} onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleSearch(e)}/>
        </View>

        <View style={styles.faqContainer}>
          {items?.map((item, index) => (
            <Card key={index} style={theme === 'light' ? styles.qaContainerLight : styles.qaContainerDark}>
              <Card.Content>
                <Text style={theme === 'light' ? styles.titleLight : styles.titleDark}>{item.question}</Text>
                <Text style={theme === 'light' ? styles.descriptionLight : styles.descriptionDark}>{item.answer}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={theme === 'light'? styles.modalContainerLight: styles.modalContainerDark}>
          <Text style={theme === 'light'? styles.titleModalLight: styles.titleModalDark}>Ask your question here:</Text>
          <PaperInput mode='outlined' multiline numberOfLines={4} style={styles.input} value={question} onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => { setQuestion(e.nativeEvent.text); }}/>
          <View style={styles.buttonRow}>
            <Button mode='contained' onPress={() => submitQuestion()} style={styles.button}>Ask a question</Button>
            <Button mode='contained-tonal' onPress={() => setModalVisible(false)} style={styles.button}>Cancel</Button>
          </View>
        </Modal>

        <Button mode='contained' style={styles.askQuestionButton} onPress={() => setModalVisible(true)}>
          Ask a question
        </Button>
      </View>
      </PaperProvider>
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
  modalContainerDark: {
    backgroundColor: 'rgb(30,30,30)',
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    width: '40%',
    alignSelf: 'center',
  },
  input: {
    width: 700,
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
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'scroll',
    width: '90%',
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
  },
  qaContainerDark: {
    marginTop: 15,
    width: '67%',
    backgroundColor: 'rgb(30,30,30)',
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
  askQuestionButton: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
  },
  button: {
    width: '49%',
  },
});

export default FAQ;
