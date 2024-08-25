import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../../context/AuthContext';
import { Material } from '../../../model/Material';
import { I18n } from 'i18n-js';
import { translations } from '../../../localization';
import { LocaleContext } from '../../../context/LocaleContext';
import RepositoryContent from '../../../components/repository/repository-content';
import RepositoryFilter from '../../../components/repository/repository-filter';

const MaterialPage = () => {
    const { theme } = useTheme();
    let { id } = useLocalSearchParams();
    const [materials, setMaterials] = useState<Material[]>();
    const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
    const { userState } = useAuth();
    const i18n = new I18n(translations)
    const { locale } = useContext(LocaleContext);
    i18n.locale = locale

    useFocusEffect(
        useCallback(() => {
            const fetchMaterials = async () => {
                if (!userState?.token.accessToken || !id) return;

                const config = {
                    headers: { Authorization: `Bearer ${userState.token.accessToken}` }
                };
                try {
                    const response: AxiosResponse = await axios.get(`${API_BASE_URL}/materials/${id}`, config);
                    if (response.status === 200) {
                        setMaterials(response.data);
                        setFilteredMaterials(response.data);
                    }
                } catch (error) {
                    Toast.show({
                        type: 'error',
                        text1: i18n.t('failed_to_fetch_toast'),
                    });
                }
            };

            fetchMaterials();
        }, [id, userState?.token.accessToken])
    );

    return (
        <ScrollView style={theme === 'light' ? styles.pageContainerLight : styles.pageContainerDark}>
            <RepositoryFilter
                i18n={i18n}
                materials={materials}
                setMaterials={setMaterials}
                setFilteredMaterials={setFilteredMaterials} />

            <RepositoryContent
                filteredMaterials={filteredMaterials} />

            <View style={{ height: 30 }}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    pageContainerLight: {
        flex: 1,
        padding: 20,
    },

    pageContainerDark: {
        flex: 1,
        padding: 20,
        backgroundColor: '#18191a',
    },
});

export default MaterialPage;
