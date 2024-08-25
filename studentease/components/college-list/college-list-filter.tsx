import React, { useState } from "react";
import { View, Platform, StyleSheet } from "react-native";
import { PaperProvider, Searchbar } from "react-native-paper";
import { themeLight, themeDark } from "../../context/PaperTheme";
import { I18n } from "i18n-js";
import { useTheme } from "../../context/ThemeContext";
import { College } from "../../model/College";

type CollegeListFilterProps = {
    i18n: I18n,
    setItems: React.Dispatch<React.SetStateAction<College[] | undefined>>,
    itemsBak: College[] | undefined
}

function CollegeListFilter({ i18n, setItems, itemsBak }: CollegeListFilterProps) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { theme } = useTheme();

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);

        if (query === '') {
            setItems(itemsBak);
        } else {
            if (itemsBak !== undefined) {
                const filteredItems = itemsBak.filter(college =>
                    college.name.toLowerCase().includes(query.toLowerCase()) ||
                    college.abbreviation.toLowerCase().includes(query.toLowerCase()) ||
                    college.address.toLowerCase().includes(query.toLowerCase()) ||
                    college.phoneNumber.toLowerCase().includes(query.toLowerCase()) ||
                    college.email.toLowerCase().includes(query.toLowerCase())
                );
                setItems(filteredItems);
            }
        }
    };

    return (
        <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
            <View style={Platform.OS === 'web' ? styles.searchBox : styles.searchBoxMobile}>
                <Searchbar
                    placeholder={i18n.t('searchPlaceholder')}
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    style={Platform.OS === 'web' ? styles.searchBar : styles.searchBarMobile}
                />
            </View>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    searchBox: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },

    searchBoxMobile: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10
    },

    searchBar: {
        marginTop: 10,
        marginBottom: 20,
        width: '40%',
        alignSelf: 'center',
        borderRadius: 10,
        height: 60,
    },

    searchBarMobile: {
        marginBottom: 20,
        alignSelf: 'center',
        borderRadius: 10,
    },
})

export default CollegeListFilter;