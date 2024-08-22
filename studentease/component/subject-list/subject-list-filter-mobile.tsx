import React from "react";
import { View, StyleSheet } from "react-native";
import { PaperProvider, Searchbar } from "react-native-paper";
import { themeLight, themeDark } from "../../context/PaperTheme";
import CustomDropdown from "../form/custom-dropdown";
import { useTheme } from "../../context/ThemeContext";
import { I18n } from "i18n-js";

type SubjectListFilterMobileProp = {
    handleCollegeChange: (selectedCollege: {label: any; value: any;}) => void,
    searchQuery: string,
    handleSearchChange: (query: string) => void,
    collegeDropdownData:  {label: any; value: any;}[]
    i18n: I18n;
}

function SubjectListFilterMobile({handleCollegeChange, searchQuery, handleSearchChange, collegeDropdownData, i18n}: SubjectListFilterMobileProp) {

    const {theme} = useTheme();

    return (
        <View style={styles.inputColumn}>
            <CustomDropdown style={{ width: '100%', height: 50, padding: 5, borderRadius: 5, marginBottom: 10,}}
                data={collegeDropdownData}
                labelField={'label'}
                valueField={'value'}
                placeholder={i18n.t('subjectList_selectCollege')}
                onChange={handleCollegeChange}
            />
            <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
                <Searchbar placeholder={i18n.t('searchPlaceholder')} style={{ width: '100%', marginBottom: 20}} onChangeText={handleSearchChange} value={searchQuery} />
            </PaperProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    inputColumn: {
        flexDirection: 'column',
        width: '100%',
    },
});

export default SubjectListFilterMobile;