import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { PaperProvider, Searchbar } from "react-native-paper";
import { themeLight, themeDark } from "../../context/PaperTheme";
import CustomDropdown from "../form/custom-dropdown";
import { I18n } from "i18n-js";
import { useTheme } from "../../context/ThemeContext";

type SubjectListFilterWebProps = {
    handleCollegeChange: (selectedCollege: {label: any; value: any;}) => void,
    searchQuery: string,
    handleSearchChange: (query: string) => void,
    collegeDropdownData:  {label: any; value: any;}[]
    i18n: I18n;
}

function SubjectListFilterWeb({handleCollegeChange, searchQuery, handleSearchChange, collegeDropdownData, i18n}: SubjectListFilterWebProps) {
    const { theme } = useTheme();

    return (
        <View>
        <CustomDropdown style={styles.dropdown}
            data={collegeDropdownData}
            labelField={'label'}
            valueField={'value'}
            placeholder={i18n.t('subjectList_selectCollege')}
            onChange={handleCollegeChange} />
        <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
            <Searchbar placeholder={i18n.t('searchPlaceholder')} style={Platform.OS === 'web' ? styles.searchBar : styles.searchBarMobile} value={searchQuery} onChangeText={handleSearchChange} />
        </PaperProvider>
    </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 10,
        marginBottom: 20,
        width: '40%',
        alignSelf: 'center',
        borderRadius: 10,
        height: 60,
    },
    
    searchBarMobile: {
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center',
        borderRadius: 10,
    },

    dropdown: {
        width: '40%',
    }
})

export default SubjectListFilterWeb;