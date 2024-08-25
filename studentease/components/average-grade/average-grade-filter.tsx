import React, { useState } from "react";
import { View, Platform, Pressable, Text, StyleSheet } from "react-native";
import { FilterType } from "../../model/FilterType";
import { I18n } from 'i18n-js';
import { useTheme } from '../../context/ThemeContext';

type AverageGradeFilterProps = {
    i18n: I18n,
    year: string,
    setYear: React.Dispatch<React.SetStateAction<string>>
}

function AverageGradeFilter({i18n, year, setYear}:AverageGradeFilterProps) {
    const {theme} = useTheme();
    const [selectedFilterType, setSelectedFilterType] = useState<FilterType | null>('ALL');

    const filterOptions: { value: FilterType; label: string }[] = [
        { label: i18n.t('averageGrade_any'), value: 'ALL' },
        { label: i18n.t('averageGrade_first'), value: '1' },
        { label: i18n.t('averageGrade_second'), value: '2' },
        { label: i18n.t('averageGrade_third'), value: '3' },
        { label: i18n.t('averageGrade_fourth'), value: '4' }
    ];

    const handleYearChange = (value: FilterType) => {
        if(value === 'ALL') {
            setYear('all');
        }
        else if(value === '1') {
            setYear('1');
        }
        else if(value === '2') {
            setYear('2');
        }
        else if(value === '3') {
            setYear('3');
        }
        else if(value === '4') {
            setYear('4');
        }
        setSelectedFilterType(value);
    };

    return(
        <View style={styles.container}>
            {filterOptions.map((option) => (
            <View style={Platform.OS === 'web' ? styles.radioButtons : styles.radioButtonsMobile} key={option.value}>
                <Pressable key={option.value} style={[theme === 'light' ? styles.pressableLight : styles.pressableDark, selectedFilterType === option.value ? { backgroundColor: theme === 'light' ? '#4dabf7' : '#9775fa' } : { borderColor: 'grey' },]} onPress={() => handleYearChange(option.value)}>
                    <Text style={[Platform.OS === 'web' ? styles.pressableText : styles.pressableTextMobile, { color: selectedFilterType === option.value ? '#fff' : theme === 'light' ?  '#4dabf7' : '#9775fa' }, ]}>{option.label}</Text>
                </Pressable>
            </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
    },

    radioButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10
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

    pressableText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    pressableTextMobile: {
        fontSize: 14,
        fontWeight: 'bold',
    },
})

export default AverageGradeFilter;