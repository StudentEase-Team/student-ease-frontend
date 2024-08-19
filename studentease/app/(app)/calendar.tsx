import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Pressable, Platform, Text, ScrollView } from 'react-native';
import { Calendar, Mode } from 'react-native-big-calendar';
import { useTheme } from '../../context/ThemeContext';
import { Calendar as CalendarMobile, Agenda} from 'react-native-calendars';
import { ActivityIndicator, IconButton } from 'react-native-paper';
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

type Event = {
  title: string;
  start: Date;
  end: Date;
  category: string;
};

export interface Item {
  title: string;
  start: Date;
  end: Date;
  category: string;
}

type ItemsByDate = {
  [date: string]: Item[];
};


export interface ItemColor {
  marked: boolean,
  selectedColor: string
}


const CalendarWidget = () => {
  const { theme } = useTheme();
  const [selectedCalendarType, setSelectedCalendarType] = useState<Mode | undefined>('month');
  const [calendarType, setCalendarType] = useState('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dayEvents, setDayEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {userState} = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [items, setItems] = useState({});
  const [itemsByDate, setItemsByDate] = useState({});
  const [itemsColorByDate, setItemsColorByDate] = useState({});
  const i18n = new I18n(translations)
    const { locale} = useContext(LocaleContext);
    i18n.locale = locale
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
  

  useEffect(() => {
    if (Platform.OS === 'web') return;

    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [theme]);

  useEffect(() => {}, [theme, selectedCalendarType, selectedDate]); 

  const categoryColors = {
    Lecture: '#1e88e5',
    Exercise: '#8e24aa',
    Exam: '#00796b',
  };


const fetchObligations = useCallback(async () => {
  if (!userState?.token.accessToken) return;

  const config = {
    headers: { Authorization: `Bearer ${userState.token.accessToken}` }
  };
  try {
    if(userState.role === UserRole.STUDENT) {
      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/obligations/student`, config);
      if (response.status === 200) {
        let result : Obligation[] = response.data;

        const events: Event[] = result.map(obligation => ({
          title: obligation.title,
          start: new Date(obligation.startDate),
          end: new Date(obligation.endDate),
          category: obligation.category
        }));

        const items: Item[] = result.map(obligation => ({
          title: obligation.title,
          start: new Date(obligation.startDate),
          end: new Date(obligation.endDate),
          category: obligation.category,
          marked: true,
          selectedColor: categoryColors[obligation.category]
        }));

        const itemsColor: ItemColor[] = result.map(obligation => ({
          marked: true,
          selectedColor: categoryColors[obligation.category]
        }));

        setItemsColorByDate(itemsColor);
        setItems(items); 
        const itemsByDate = mapItemsToDateObject(items);

        setItemsByDate(itemsByDate);
        setEvents(events);
      }
    }
    else if(userState.role === UserRole.PROFESSOR)
    {
      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/obligations/professor`, config);
      if (response.status === 200) {
        let result : Obligation[] = response.data;

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
          selectedColor: categoryColors[obligation.category]
        }));


        const itemsColor: ItemColor[] = result.map(obligation => ({
          marked: true,
          selectedColor: categoryColors[obligation.category]
        }));

        setItemsColorByDate(itemsColor);

        setItems(items);
        const itemsByDate = mapItemsToDateObject(items);

        setItemsByDate(itemsByDate);

        setEvents(events);
      }
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Failed to fetch obligations',
    });
  }
}, []);

useFocusEffect(
  React.useCallback(() => {
    fetchObligations();
}, []));



  const filterOptions: { value: Mode; label: string }[] = [
    { label: i18n.t('calendar_day'), value: 'day' },
    { label: i18n.t('calendar_threeDays'), value: '3days' },
    { label: i18n.t('calendar_week'), value: 'week' },
    { label: i18n.t('calendar_month'), value: 'month' },
    { label: i18n.t('calendar_schedule'), value: 'schedule' },
  ];



  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  

  const handleCalendarModeChange = (value: Mode) => {
    setCalendarType(value.charAt(0).toUpperCase() + value.slice(1));
    setSelectedCalendarType(value);
  };

const handleDatePress = (date) => {
  const selected = new Date(date);
  setSelectedDate(selected);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start);

    const formatDate = (d) => 
      `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;

    return formatDate(eventDate) === formatDate(selected);
  });

  setDayEvents(filteredEvents);
};

  const eventCellStyle = (event: Event) => {
    const backgroundColor = categoryColors[event.category] || '#ccc';
    return {
      backgroundColor,
    };
  };

  const calendarCellTextStyle = {
    fontSize: 20,
  };

  const calendarCellStyle = {
    borderColor: theme === 'light' ? '#ddd' : '#18191a', 
    borderWidth: 1,
    backgroundColor: theme === 'light' ? '#fff' : '#242526', 
  };

  const bodyContainerStyle = {
    borderColor: theme === 'light' ? '#ddd' : '#18191a',
    borderWidth: 1,
  };

  const lightTheme = {

    palette: {
      primary: {
        primary: '#4dabf7',
        contrastText: 'white',
      },
      nowIndicator:'#4dabf7',
      gray: {
        '100': 'transparent',
        '200': '#ddd',
        '300': '#888',
        '500': '#aaa',
        '800': 'black',
      },
    },
    typography: {
        xs: {fontSize:14},
        sm: {fontSize:14},
      }
  }

  const darkTheme = {
    palette: {
      primary: {
        primary: '#9775fa',
        contrastText: 'white',
      },
      nowIndicator: '#9775fa',
      gray: {
        '100': 'transparent',
        '200': '#18191a',
        '300': '#888',
        '500': '#aaa',
        '800': 'white',
      },
    },
    typography: {
        xs: {fontSize:14},
        sm: {fontSize:14},
      }
  }

  const navigateBackward = () => {
    if(selectedDate !== null) {
    const newDate = new Date(selectedDate);
    if (selectedCalendarType === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (selectedCalendarType === '3days') {
      newDate.setDate(newDate.getDate() - 3);
    } else if (selectedCalendarType === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (selectedCalendarType === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setSelectedDate(newDate);
    }
  };

  const navigateForward = () => {
    if(selectedDate !== null) {
    const newDate = new Date(selectedDate);
    if (selectedCalendarType === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (selectedCalendarType === '3days') {
      newDate.setDate(newDate.getDate() + 3);
    } else if (selectedCalendarType === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (selectedCalendarType === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
}
  };
  const currentMonth = selectedDate.toLocaleString('default', { month: 'long' });
  const currentYear = selectedDate.getFullYear();

  const renderItem = useMemo(() => (item) => (
    <View style={[styles.item, {backgroundColor: categoryColors[item.category]}]}>
      <Text style={theme === 'light' ? {color: 'white', fontSize: 16, fontWeight: 'bold',  marginBottom: 5} : {color: 'white', fontSize: 16, fontWeight: 'bold',  marginBottom: 5}}>{item.title}</Text>

      <Text style={theme === 'light' ? {color: 'white', fontSize: 16} : {color: 'white', fontSize: 16}}>{formatTime(item.start) + " - " + formatTime(item.end)}</Text>
      
      <Text style={theme === 'light' ? {color: 'white', fontSize: 16} : {color: 'white', fontSize: 16}}>{item.category}</Text>
    </View>
  ), [theme]);

  const renderEmptyData = useMemo(() => () => (
      <Text style={theme === 'light' ? styles.noEventsTextLight : styles.noEventsTextDark}>Nema događaja za ovaj dan</Text>
  ), [theme]);

  return (
    <>
    {Platform.OS === 'web' ? (
      <View style={theme === 'light' ? styles.pageContainerLight : styles.pageContainerDark}>
      <View style={styles.container}>
          <View style={styles.monthTitleContainer}>
              <Text style={theme === 'light' ? styles.currentMonthLight : styles.currentMonthDark}>
                  {currentMonth} {currentYear}
              </Text>
          </View>
          <View style={styles.buttons}>
              <IconButton
                  size={40}
                  icon='chevron-left'
                  iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}
                  onPress={navigateBackward}
              />
              {filterOptions.map((option) => (
                  <View
                      style={Platform.OS === 'web' ? styles.radioButtons : styles.radioButtonsMobile}
                      key={option.value}
                  >
                      <Pressable
                          style={[
                              theme === 'light' ? styles.pressableLight : styles.pressableDark,
                              selectedCalendarType === option.value
                                  ? { backgroundColor: theme === 'light' ? '#4dabf7' : '#9775fa' }
                                  : { borderColor: 'grey' },
                          ]}
                          onPress={() => handleCalendarModeChange(option.value)}
                      >
                          <Text
                              style={[
                                  Platform.OS === 'web' ? styles.text : styles.textMobile,
                                  {
                                      color: selectedCalendarType === option.value ? '#fff' : theme === 'light' ? '#4dabf7' : '#9775fa',
                                  },
                              ]}
                          >
                              {option.label}
                          </Text>
                      </Pressable>
                  </View>
              ))}
              <IconButton
                  style={{ justifyContent: 'flex-end' }}
                  size={40}
                  icon='chevron-right'
                  iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'}
                  onPress={navigateForward}
              />
          </View>
      </View>
      <View style={styles.mainContainer}>
          <View style={styles.calendarContainer}>
              <Calendar
                  theme={theme === 'light' ? lightTheme : darkTheme}
                  events={events}
                  height={600}
                  mode={selectedCalendarType}
                  calendarCellTextStyle={calendarCellTextStyle}
                  calendarCellStyle={calendarCellStyle}
                  bodyContainerStyle={bodyContainerStyle}
                  dayHeaderStyle={{ backgroundColor: 'transparent' }}
                  weekDayHeaderHighlightColor={theme === 'light' ? '#4dabf7' : '#9775fa'}
                  showWeekNumber={true}
                  showTime={true}
                  onPressCell={(date) => handleDatePress(date)}
                  eventCellStyle={eventCellStyle}
                  sortedMonthView={false}
                  headerContentStyle={{ justifyContent: 'space-between' }}
                  date={selectedDate}
              />
          </View>
  
          <View style={theme === 'light' ? styles.agendaContainerLight : styles.agendaContainerDark}>
              <Text style={theme === 'light' ? styles.agendaTitleLight : styles.agendaTitleDark}>
                  {i18n.t('calendar_obligationsFor')} {selectedDate ? selectedDate.toDateString() : i18n.t('calendar_selectDate')}
              </Text>
              <ScrollView style={styles.agendaDetails}>
                  {dayEvents.length > 0 ? (
                      dayEvents.map((event, index) => (
                          <View key={index} style={[styles.eventItem, { backgroundColor: categoryColors[event.category] }]}>
                              <Text style={styles.eventTitle}>{event.title}</Text>
                              <Text style={styles.eventDetails}>
                                  {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
                              </Text>
                              <Text style={styles.eventDetails}>{event.category}</Text>
                          </View>
                      ))
                  ) : (
                      <Text style={theme === 'light' ? styles.noEventsTextLight : styles.noEventsTextDark}>
                          {i18n.t('calendar_noEventsText')}
                      </Text>
                  )}
              </ScrollView>
          </View>
      </View>
  </View>
   
    ) : (
        isLoading? (
          <View style={theme === 'light' ? styles.spinnerContainerLight : styles.spinnerContainerDark}>
          <ActivityIndicator size="large" color={theme === 'light' ? '#4dabf7' : '#9775fa' }/>
        </View>
        ):(

        <Agenda
          theme={{
            backgroundColor: theme === 'light' ? '#f2f2f2' : '#333',
            calendarBackground: theme === 'light' ? '#f2f2f2' : '#242526',
            textSectionTitleColor: theme === 'light' ? '#4dabf7' : '#9775fa',
            selectedDayBackgroundColor: theme === 'light' ? '#4dabf7' : '#9775fa',
            selectedDayTextColor: '#ffffff',
            todayTextColor: theme === 'light' ? '#00adf5' : '#ffffff',
            dayTextColor: theme === 'light' ? '#2d4150' : '#ffffff',
            textDayHeaderFontWeight: 'bold',
            textMonthFontWeight:'bold',
            textDisabledColor: theme === 'light' ? '#d3d3d3' : '#555555',
            dotColor: theme === 'light' ? '#00adf5' : '#9775fa',
            selectedDotColor: '#ffffff',
            arrowColor: theme === 'light' ? '#4dabf7' : '#ffffff',
            monthTextColor: theme === 'light' ? '#4dabf7' : '#9775fa',
            agendaDayTextColor: theme === 'light' ? '#4dabf7' : '#9775fa',
            agendaDayNumColor: theme === 'light' ? '#4dabf7' : '#9775fa',
            agendaTodayColor: theme === 'light' ? '#4dabf7' : '#9775fa',
            agendaKnobColor: theme === 'light' ? '#4dabf7' : '#9775fa',
            contentStyle: theme === 'light' ? {backgroundColor: '#4dabf7'} : {backgroundColor: '#242526'},
            reservationsBackgroundColor: theme === 'light' ? '#ffffff' : '#333',
          }}
          calendarStyle={theme === 'light' ? {backgroundColor: '#f2f2f2'} : {backgroundColor: '#242526'}}
          style={theme === 'light' ? {backgroundColor: '#f2f2f2'} : {backgroundColor: '#242526'}}
          contentContainerStyle={theme === 'light' ? {backgroundColor: 'white'} : {backgroundColor: '#242526'}}
          items={itemsByDate}
          selected={selectedDay}
          renderItem={renderItem} 
          renderEmptyData={renderEmptyData}
          showScrollIndicator={true}
          showOnlySelectedDayItems={false}
          markingType={'dot'}
        />
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

  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  item: {
    backgroundColor: 'white',
    padding: 10,
    marginRight: 10,
    marginTop: 13,
    borderRadius: 10
  },

  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  calendarContainer: {
    width: '80%',
    padding: 10,
  },

  agendaContainerLight: {
    width: '20%',
    padding: 10,
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    borderRadius: 10,
  },

  agendaContainerDark: {
    width: '20%',
    padding: 10,
    backgroundColor: '#242526',
    borderLeftWidth: 1,
    borderRadius: 10,
  },

  agendaTitleLight: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },

  agendaTitleDark: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },

  agendaDetails: {
    flex: 1,
  },

  eventItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },

  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },

  eventDetails: {
    fontSize: 18,
    color: 'white',
  },

  noEventsTextLight: {
    fontSize: 18,
    color: '#333',
    padding: 20, 
    marginTop: 20,
  },

  noEventsTextDark: {
    fontSize: 18,
    color: 'white',
    padding: 20, 
    marginTop: 20,
  },

  buttons: {
    alignSelf:'center',
    flexDirection:'row', 
    flex:2, 
    justifyContent:'flex-start'
  },

  radioButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  radioButtonsMobile: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
  },

  pressableLight: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 2,
    backgroundColor: 'white',
  },

  pressableDark: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 2,
    backgroundColor: '#242526',
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

  text: {
    fontSize: 16,
  },

  textMobile: {
    fontSize: 14,
  },

  currentMonthLight: {
    fontSize: 22,
    color: 'black',
    width: 300
  },

  currentMonthDark: {
    fontSize: 22,
    color: 'white',
  },
  monthTitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent:'center',
    width:300
  },
});

export default CalendarWidget;
