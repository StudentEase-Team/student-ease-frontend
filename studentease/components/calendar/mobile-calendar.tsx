import React, { useMemo, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import { useTheme } from "../../context/ThemeContext";

type MobileCalendarProps = {
    itemsByDate: {},
    setItemsByDate: React.Dispatch<React.SetStateAction<{}>>
}

function MobileCalendar({itemsByDate, setItemsByDate}: MobileCalendarProps) {
    const {theme} = useTheme();
    const [selectedDay, setSelectedDay] = useState('');

    const categoryColors = {
        Lecture: '#1e88e5',
        Exercise: '#8e24aa',
        Exam: '#00796b',
      };

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


      const formatTime = (date: Date): string => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      };

    return (
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
}

export default MobileCalendar;

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 10,
        marginRight: 10,
        marginTop: 13,
        borderRadius: 10
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
})