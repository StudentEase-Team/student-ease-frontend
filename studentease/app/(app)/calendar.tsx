import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Pressable, Platform, Text, ScrollView } from 'react-native';
import { Calendar, Mode } from 'react-native-big-calendar';
import { useTheme } from '../../context/ThemeContext';
import { Calendar as CalendarMobile, Agenda} from 'react-native-calendars';
import { ActivityIndicator, IconButton } from 'react-native-paper';

type Event = {
  title: string;
  start: Date;
  end: Date;
  category: string;
};

const CalendarWidget = () => {
  const { theme } = useTheme();
  const [selectedCalendarType, setSelectedCalendarType] = useState<Mode | undefined>('month');
  const [calendarType, setCalendarType] = useState('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dayEvents, setDayEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Added state for loading

  useEffect(() => {
    if (Platform.OS === 'web') return;

    setIsLoading(true); // Set loading state to true when theme changes

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, [theme]);

  useEffect(() => {}, [theme, selectedCalendarType, selectedDate]); 


  const [events, setEvents] = useState<Event[]>([
    {
      title: 'Predavanje - Matematika',
      start: new Date(2024, 7, 16, 9, 0),
      end: new Date(2024, 7, 16, 10, 30),
      category: 'Lecture',
    },
    {
      title: 'Vežbe - Fizička hemija',
      start: new Date(2024, 7, 16, 11, 0),
      end: new Date(2024, 7, 16, 12, 30),
      category: 'Exercise',
    },
    {
      title: 'Ispit - Informatika',
      start: new Date(2024, 7, 16, 13, 0),
      end: new Date(2024, 7, 16, 14, 30),
      category: 'Exam',
    },
  ]);

  const filterOptions: { value: Mode; label: string }[] = [
    { label: 'Day', value: 'day' },
    { label: '3 days', value: '3days' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Schedule', value: 'schedule' },
  ];

  const categoryColors = {
    Lecture: '#4caf50',
    Exercise: '#ff5722',
    Exam: '#cc5511',
  };

  const handleCalendarModeChange = (value: Mode) => {
    setCalendarType(value.charAt(0).toUpperCase() + value.slice(1));
    setSelectedCalendarType(value);
  };

  const handleDatePress = (date) => {
    setSelectedDate(date);
    const filteredEvents = events.filter(
      (event) => event.start.toDateString() === date.toDateString()
    );
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

  const [selectedDay, setSelectedDay] = useState('');
  const [items, setItems] = useState({});


  // Koristimo useMemo da memoizujemo vrednosti na osnovu teme
  const renderItem = useMemo(() => (item) => (
    <View style={[styles.item, { backgroundColor: theme === 'light' ? '#ffffff' : '#333333' }]}>
      <Text style={theme === 'light' ? {color:'#333'} : {color: 'white'}}>{item.name}</Text>
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
              <Text style={theme === 'light' ? styles.currentMonthLight : styles.currentMonthDark}> {currentMonth} {currentYear}</Text>
            </View>
            <View style={styles.buttons}>
              <IconButton size={40} icon='chevron-left' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'} onPress={navigateBackward}></IconButton>
              {filterOptions.map((option) => (
                <View style={Platform.OS === 'web' ? styles.radioButtons : styles.radioButtonsMobile} key={option.value}>
                  <Pressable
                    key={option.value}
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
                        { color: selectedCalendarType === option.value ? '#fff' : theme === 'light' ? '#4dabf7' : '#9775fa' },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                </View>
              ))}
              <IconButton style={{ justifyContent: 'flex-end' }} size={40} icon='chevron-right' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'} onPress={navigateForward}></IconButton>
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
                  date={selectedDate} />
              </View>

              <View style={theme === 'light' ? styles.agendaContainerLight : styles.agendaContainerDark}>
                <Text style={theme === 'light' ? styles.agendaTitleLight : styles.agendaTitleDark}>
                  Obaveze za {selectedDate ? selectedDate.toDateString() : 'Izaberite datum'}
                </Text>
                <ScrollView style={styles.agendaDetails}>
                  {dayEvents.length > 0 ? (
                    dayEvents.map((event, index) => (
                      <View key={index} style={[styles.eventItem, { backgroundColor: categoryColors[event.category] }]}>
                        <Text style={styles.eventTitleDark}>{event.title}</Text>
                        <Text style={styles.eventTimeDark}>
                          {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text style={theme === 'light' ? styles.noEventsTextLight : styles.noEventsTextDark}>Nema obaveza za ovaj dan.</Text>
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
            dotColor: theme === 'light' ? '#00adf5' : '#ffffff',
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
          items={items}
          selected={selectedDay}
          markingType='multi-dot'
          renderItem={renderItem} 
          renderEmptyData={renderEmptyData}
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
    padding: 20,
    marginRight: 10,
    marginTop: 17,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },

  agendaTitleDark: {
    fontSize: 20,
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

  eventTitleLight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },

  eventTitleDark: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },

  eventTimeLight: {
    fontSize: 16,
    color: '#555',
  },

  eventTimeDark: {
    fontSize: 16,
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
