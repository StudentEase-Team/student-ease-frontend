import { router } from "expo-router";
import React, { useState } from "react";
import { View, Platform, StyleSheet } from "react-native";
import { PaperProvider, IconButton, Searchbar } from "react-native-paper";
import { themeLight, themeDark } from "../../context/PaperTheme";
import { useTheme } from "../../context/ThemeContext";
import { I18n } from "i18n-js";
import { Material } from "../../model/Material";

type RepositoryProps = {
    i18n: I18n,
    materials: Material[] | undefined,
    setMaterials: React.Dispatch<React.SetStateAction<Material[] | undefined>>
    setFilteredMaterials: React.Dispatch<React.SetStateAction<Material[]>>
}

function RepositoryFilter({i18n, materials, setMaterials, setFilteredMaterials}: RepositoryProps) {
    const {theme} = useTheme();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredMaterials(materials || []);
        } else {
            const filtered = materials?.filter((material) => 
                material.name.toLowerCase().includes(query.toLowerCase()) ||
                material.about.toLowerCase().includes(query.toLowerCase()) ||
                material.description.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredMaterials(filtered || []);
        }
    };

    return (
        <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
            <View style={Platform.OS === 'web' ? styles.searchBox : styles.searchBoxMobile}>
                <IconButton style={Platform.OS === 'web' ? {marginLeft: 0, position: 'absolute', zIndex: 1} : {flex: 0.2, marginLeft: -5, marginRight: 20}} icon='chevron-left' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'} size={35} onPress={() => {
                setMaterials([]);
                setFilteredMaterials([]);
                router.push('/subject-list')}}/> 
                <Searchbar  
                    value={searchQuery}
                    placeholder={i18n.t('searchPlaceholder')}
                    onChangeText={handleSearchChange} style={Platform.OS === 'web'? styles.searchBar : styles.searchBarMobile}></Searchbar>
            </View>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    searchBox: {
        flex:1, 
        flexDirection: 'row',
        width: '70%',
        alignSelf: 'center',
        marginBottom: 50,
        marginTop: 10
    },

    searchBoxMobile: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },

    searchBar: {
        width: '57%',
        borderRadius: 10,
        height: 60,
        margin: 'auto'
    },

    searchBarMobile: {
        flex: 2,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        height: 45,
        marginLeft: 'auto',
    },
});

export default RepositoryFilter;