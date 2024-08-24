import React, { useState } from "react";
import { View, Platform, Pressable, StyleSheet, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";
import { Mode } from 'react-native-big-calendar';
import { I18n } from 'i18n-js';

type calendarFilterProps = {
  selectedDate: Date,
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>,
  i18n: I18n,
  selectedCalendarType: Mode | undefined,
  setSelectedCalendarType: React.Dispatch<React.SetStateAction<Mode | undefined>>
}

function CalendarFilter({ selectedDate, setSelectedDate, i18n, selectedCalendarType, setSelectedCalendarType }: calendarFilterProps) {
  const { theme } = useTheme();
  const [calendarType, setCalendarType] = useState('month');
  const currentMonth = selectedDate.toLocaleString('default', { month: 'long' });
  const currentYear = selectedDate.getFullYear();

  const filterOptions: { value: Mode; label: string }[] = [
    { label: i18n.t('calendar_day'), value: 'day' },
    { label: i18n.t('calendar_threeDays'), value: '3days' },
    { label: i18n.t('calendar_week'), value: 'week' },
    { label: i18n.t('calendar_month'), value: 'month' },
    { label: i18n.t('calendar_schedule'), value: 'schedule' },
  ];

  const navigateBackward = () => {
    if (selectedDate !== null) {
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
    if (selectedDate !== null) {
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

  const handleCalendarModeChange = (value: Mode) => {
    setCalendarType(value.charAt(0).toUpperCase() + value.slice(1));
    setSelectedCalendarType(value);
  };

  return (
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
            key={option.value}>

            <Pressable
              style={[
                theme === 'light' ? styles.pressableLight : styles.pressableDark,
                selectedCalendarType === option.value
                  ? { backgroundColor: theme === 'light' ? '#4dabf7' : '#9775fa' }
                  : { borderColor: 'grey' },
              ]}
              onPress={() => handleCalendarModeChange(option.value)}>

              <Text
                style={[
                  Platform.OS === 'web' ? styles.pressableText : styles.pressableTextMobile,
                  {
                    color: selectedCalendarType === option.value ? '#fff' : theme === 'light' ? '#4dabf7' : '#9775fa',
                  },
                ]}>
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
          onPress={navigateForward} />
      </View>
    </View>
  )
}

export default CalendarFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  buttons: {
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'flex-start'
  },

  pressableText: {
    fontSize: 16,
  },

  pressableTextMobile: {
    fontSize: 14,
  },

  monthTitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 300
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
});