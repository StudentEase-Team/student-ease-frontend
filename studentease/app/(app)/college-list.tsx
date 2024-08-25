import React, { useCallback, useContext, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { I18n } from 'i18n-js';
import { translations } from '../../localization';
import { LocaleContext } from '../../context/LocaleContext';
import axios, { AxiosResponse } from 'axios';
import Toast from 'react-native-toast-message';
import {College} from '../../model/College';
import { API_BASE_URL } from '@env';
import { useFocusEffect } from 'expo-router';
import CollegeListFilter from '../../components/college-list/college-list-filter';
import CollegeListContent from '../../components/college-list/college-list-content';
import CollegeListModal from '../../components/college-list/college-list-modal';

const FacultyList: React.FC = () => {
  const { theme } = useTheme();
  const { userState } = useAuth();
  const [items, setItems] = useState<College[]>();
  const [itemsBak, setItemsBak] = useState<College[]>();
  const i18n = new I18n(translations)
  const { locale} = useContext(LocaleContext);
  i18n.locale = locale

  const fetchFAQ = useCallback(async () => {
    if (!userState?.token.accessToken) return;

    const config = {
      headers: { Authorization: `Bearer ${userState.token.accessToken}` }
    };
    try {
      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/college`, config);
      if (response.status === 200) {
        setItems(response.data);
        setItemsBak(response.data);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: i18n.t('failed_to_fetch_toast'),
      });
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchFAQ();
  }, []));

  return (
    <>
      <ScrollView style={[theme === 'light' ? styles.pageLightContainer : styles.pageDarkContainer]}>
        <CollegeListFilter 
          i18n={i18n} 
          setItems={setItems} 
          itemsBak={itemsBak}/>

        <CollegeListContent 
          i18n={i18n} 
          items={items}/>

        <View style={{height:40}}></View>
      </ScrollView>
      
      <CollegeListModal 
        i18n={i18n}/>
    </>
  );
};

const styles = StyleSheet.create({
  pageLightContainer: {
    flex: 1,
    padding: 20
  },
  
  pageDarkContainer: {
    flex: 1,
    backgroundColor: '#18191A', 
    padding: 20
  },
});

export default FacultyList;
