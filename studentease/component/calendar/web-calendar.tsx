import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Calendar, Mode } from "react-native-big-calendar";
import { useTheme } from "../../context/ThemeContext";
import { Event } from "../../model/Event"
import { I18n } from "i18n-js";

type WebCalendarProps = {
    selectedDate: Date,
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>,
    i18n: I18n,
    selectedCalendarType: Mode | undefined,
    setSelectedCalendarType: React.Dispatch<React.SetStateAction<Mode | undefined>>,
    events: Event[]
}

function WebCalendar ({selectedDate, setSelectedDate, i18n, selectedCalendarType, events }: WebCalendarProps) {
    const { theme } = useTheme();
    const [dayEvents, setDayEvents] = useState<Event[]>([]);
    
    const categoryColors = {
        Lecture: '#1e88e5',
        Exercise: '#8e24aa',
        Exam: '#00796b',
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

    return (
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
                dayHeaderStyle={{backgroundColor: 'transparent'}}
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
    )
}

export default WebCalendar;

const styles = StyleSheet.create({ 
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
      },

      container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
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

      calendarContainer: {
        width: '80%',
        padding: 10,
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
});