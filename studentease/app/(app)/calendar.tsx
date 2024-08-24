import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Mode } from 'react-native-big-calendar';
import { useTheme } from '../../context/ThemeContext';
import { ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from 'expo-router';
import { UserRole } from '../../model/UserRole';
import { Obligation } from '../../model/Obligation';
import { I18n } from 'i18n-js';
import { translations } from '../../localization';
import { LocaleContext } from '../../context/LocaleContext';
import CalendarFilter from '../../components/calendar/calendar-filter';
import { Event } from '../../model/Event';
import WebCalendar from '../../components/calendar/web-calendar';
import MobileCalendar from '../../components/calendar/mobile-calendar';

type ItemsByDate = {
  [date: string]: Item[];
};

export interface Item {
  title: string;
  start: Date;
  end: Date;
  category: string;
}

export interface ItemColor {
  marked: boolean,
  selectedColor: string
}

const Calendar = () => {
  const { theme } = useTheme();
  const [selectedCalendarType, setSelectedCalendarType] = useState<Mode | undefined>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const { userState } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [itemsByDate, setItemsByDate] = useState({});
  const i18n = new I18n(translations)
  const { locale } = useContext(LocaleContext);
  i18n.locale = locale;

  const mapItemsToDateObject = (items: Item[]): ItemsByDate => {
    return items.reduce((acc: ItemsByDate, item: Item) => {
      const dateKey = item.start.toISOString().split('T')[0];

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(item);
      return acc;
    }, {});
  };

  const categoryColors = {
    Lecture: '#1e88e5',
    Exercise: '#8e24aa',
    Exam: '#00796b',
  };

  useEffect(() => {
    if (Platform.OS === 'web') return;

    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [theme]);

  const fetchObligations = useCallback(async () => {
    if (!userState?.token.accessToken) return;

    const config = {
      headers: { Authorization: `Bearer ${userState.token.accessToken}` },
    };

    const handleResponse = (response: AxiosResponse) => {
      if (response.status !== 200) return;

      const result: Obligation[] = response.data;

      const events: Event[] = result.map(obligation => ({
        title: obligation.title,
        start: new Date(obligation.startDate),
        end: new Date(obligation.endDate),
        category: obligation.category,
      }));

      const items: Item[] = result.map(obligation => ({
        title: obligation.title,
        start: new Date(obligation.startDate),
        end: new Date(obligation.endDate),
        category: obligation.category,
        marked: true,
        selectedColor: categoryColors[obligation.category],
      }));

      const itemsByDate = mapItemsToDateObject(items);
      setItemsByDate(itemsByDate);
      setEvents(events);
    };

    try {
      let endpoint = '';
      if (userState.role === UserRole.STUDENT) {
        endpoint = `${API_BASE_URL}/obligations/student`;
      } else if (userState.role === UserRole.PROFESSOR) {
        endpoint = `${API_BASE_URL}/obligations/professor`;
      }

      if (endpoint) {
        const response: AxiosResponse = await axios.get(endpoint, config);
        handleResponse(response);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch obligations',
      });
    }
  }, [userState]);

  useFocusEffect(
    React.useCallback(() => {
      fetchObligations();
    }, []));

  return (
    <>
      {Platform.OS === 'web' ? (
        <View style={theme === 'light' ? styles.pageContainerLight : styles.pageContainerDark}>
          <CalendarFilter
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            i18n={i18n}
            selectedCalendarType={selectedCalendarType}
            setSelectedCalendarType={setSelectedCalendarType} />

          <WebCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            i18n={i18n}
            selectedCalendarType={selectedCalendarType}
            setSelectedCalendarType={setSelectedCalendarType}
            events={events} />
        </View>
      ) : (
        isLoading ? (
          <View style={theme === 'light' ? styles.spinnerContainerLight : styles.spinnerContainerDark}>
            <ActivityIndicator size="large" color={theme === 'light' ? '#4dabf7' : '#9775fa'} />
          </View>
        ) : (
          <MobileCalendar
            itemsByDate={itemsByDate}
            setItemsByDate={setItemsByDate} />
        )
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pageContainerLight: {
    flex: 1,
    padding: 20,
  },

  pageContainerLightMobile: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },

  pageContainerDark: {
    flex: 1,
    padding: 20,
    backgroundColor: '#18191A',
  },

  pageContainerDarkMobile: {
    flex: 1,
    padding: 20,
    backgroundColor: '#18191A',
  },

  spinnerContainerLight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  spinnerContainerDark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242526'
  },
});

export default Calendar;
