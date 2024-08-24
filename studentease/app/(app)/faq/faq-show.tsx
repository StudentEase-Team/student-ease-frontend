import React, { useCallback, useContext, useState } from 'react';
import { PaperProvider, Searchbar } from 'react-native-paper';
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
import FAQShowContentWeb from '../../../components/faq-show/faq-show-content-web';
import FAQShowContentMobile from '../../../components/faq-show/faq-show-content-mobile';
import FAQShowModal from '../../../components/faq-show/faq-show-modal';

const FAQ: React.FC = () => {
  const [items, setItems] = useState<FAQItem[]>();
  const [itemsBak, setItemsBak] = useState<FAQItem[]>();
  const [searchParam, setSearchParam] = useState('');
  const { userState } = useAuth();
  const { theme } = useTheme();
  const i18n = new I18n(translations)
  const { locale } = useContext(LocaleContext);
  i18n.locale = locale

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
        const sortedItems = response.data.sort((a, b) => {
          if (a.answer === '' && b.answer !== '') return 1;
          if (a.answer !== '' && b.answer === '') return -1;
          return 0;
        });

        setItems(sortedItems);
        setItemsBak(sortedItems);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch questions',
      });
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchFAQ();
    }, []));

  return (
    <>
      <ScrollView style={theme === 'light' ? styles.pageLightContainer : styles.pageDarkContainer}>
        <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
          <Searchbar placeholder={i18n.t('searchPlaceholder')} style={Platform.OS === 'web' ? styles.searchBar : styles.searchBarMobile} value={searchParam} onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleSearch(e)} />
        </PaperProvider>

        {Platform.OS === 'web' ? (
          <FAQShowContentWeb i18n={i18n} items={items} fetchFAQ={fetchFAQ} />
        ) : (
          <FAQShowContentMobile i18n={i18n} items={items} fetchFAQ={fetchFAQ} />
        )}
        <View style={{ height: 50 }} />
      </ScrollView>
      
      <FAQShowModal itemsBak={itemsBak} i18n={i18n} />
      <Toast />
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
});

export default FAQ;
