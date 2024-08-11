import React, { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, View, Platform, Linking } from 'react-native';
import { Text, Card, IconButton, Paragraph, PaperProvider, Searchbar } from 'react-native-paper';
import { useTheme } from '../../../context/ThemeContext';
import { themeDark, themeLight } from '../../../context/PaperTheme';
import { useFocusEffect, useLocalSearchParams, useRouter} from 'expo-router';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../../context/AuthContext';
import { Material } from '../../../model/Material';

const MaterialPage = () => {
    const { theme } = useTheme();
    const router = useRouter();
    let { id } = useLocalSearchParams();
    const [materials, setMaterials] = useState<Material[]>();
    const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { userState } = useAuth();

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
                        text1: 'Failed to fetch materials',
                    });
                }
            };
    
            fetchMaterials();
        }, [id, userState?.token.accessToken])
    );
    
    function generateIcon(type: string) : string {
        switch(type){
            case 'VIDEO_MATERIAL': return 'video';
            case 'PRESENTATION': return 'presentation';
            case 'DOCUMENT': return 'file-document';
            case 'PROGRAM': return 'code-tags';
            case 'OTHER': return 'folder';
            default: return '';
        }
    }

    function generateColor(type: string, light: boolean) : string {
        if(light)
            switch(type){
                case 'VIDEO_MATERIAL': return '#80cbc4';
                case 'PRESENTATION': return '#ffcc80';
                case 'DOCUMENT': return '#b39ddb';
                case 'PROGRAM': return '#ffab91';
                case 'OTHER': return '#ffccbc';
                default: return '';
            }
        else
            switch(type){
                case 'VIDEO_MATERIAL': return '#546e7a';
                case 'PRESENTATION': return '#bd9424';
                case 'DOCUMENT': return '#5e35b1';
                case 'PROGRAM': return '#6d4c41';
                case 'OTHER': return '#424242';
                default: return '';
            }
    }

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
        <ScrollView style={theme === 'light' ? styles.containerLight : styles.containerDark}>
            <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
                <View style={Platform.OS === 'web' ? styles.searchBox : styles.searchBoxMobile}>
                    <IconButton style={Platform.OS === 'web' ? {marginLeft: 0, position: 'absolute', zIndex: 1} : {marginRight:'auto'}} icon='chevron-left' iconColor={theme === 'light' ? '#4dabf7' : '#9775fa'} size={35} onPress={() => {
                    setMaterials([]);
                    setFilteredMaterials([]);
                    router.push('/subject-list')}}/> 
                    <Searchbar  
                        value={searchQuery}
                        placeholder="Search"
                        onChangeText={handleSearchChange} style={Platform.OS === 'web'? styles.searchBar : styles.searchBarMobile}></Searchbar>
                </View>
            </PaperProvider>

            <View style={Platform.OS === 'web' ? styles.containerContent : styles.containerContentMobile}>
                {filteredMaterials?.map((material, index) => (
                    <Card key={index} style={[Platform.OS === 'web' ? styles.card : styles.cardMobile, { backgroundColor: theme === 'light' ? generateColor(material.materialType, true) : generateColor(material.materialType, false) }]} onPress={() => {Linking.openURL(material.url)}}>
                        <Card.Content style={styles.cardContent}>
                            <IconButton icon={generateIcon(material.materialType)} size={Platform.OS === 'web' ? 60 : 30} style={Platform.OS === 'web' ? styles.icon : styles.iconMobile} iconColor={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'}/>
                            <View style={Platform.OS === 'web' ? styles.textContainer : styles.textContainerMobile}>
                                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>{material.name}</Text>
                                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.descriptionLight : styles.descriptionDark) : (theme === 'light' ? styles.descriptionLightMobile : styles.descriptionDarkMobile)}>{material.about}</Text>
                                <Paragraph style={Platform.OS === 'web' ? (theme === 'light' ? styles.detailsLight : styles.detailsDark) : (theme === 'light' ? styles.detailsLightMobile : styles.detailsDarkMobile)}>{material.description}</Paragraph>
                            </View>
                        </Card.Content>
                    </Card>
                ))}
            </View>
            <View style={{height: 20}}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        padding: 20,
    },

    containerDark: {
        flex: 1,
        padding: 20,
        backgroundColor: '#18191a',
    },

    searchBox: {
        flex:1, 
        flexDirection: 'row',
        width: '70%',
        alignSelf: 'center',
        marginBottom: 50,
        marginTop: 10
    },

    searchBoxMobile: {
        flex:1, 
        flexDirection: 'column',
        width: '100%',
        marginBottom: 50,
        alignItems: 'center',
    },

    searchBar: {
        width: '57%',
        borderRadius: 10,
        height: 60,
        margin: 'auto'
    },

    searchBarMobile: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        height: 45,
        marginLeft: 'auto'
    },

    containerContent: {
        width: '70%',
        alignSelf: 'center',
    },

    containerContentMobile: {
        width: '100%',
        flex: 1,
        flexDirection: 'column'
    },

    card: {
        borderRadius: 10,
        marginBottom: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },

    cardMobile: {
        borderRadius: 10,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },

    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    icon: {
        marginRight: 40,
    },

    iconMobile: {
        marginRight: 20,
    },

    textContainer: {
        flexDirection: 'column',
        width: '100%'
    },

    textContainerMobile: {
        flexDirection: 'column',
        width: '80%'
    },

    titleLight: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },

    titleLightMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 4,
    },

    titleDark: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },

    titleDarkMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },

    descriptionLight: {
        fontSize: 18,
        color: 'black',
        marginBottom: 4,
    },

    descriptionLightMobile: {
        fontSize: 16,
        color: 'black',
        marginBottom: 4,
    },
    
    descriptionDark: {
        fontSize: 18,
        color: 'white',
        marginBottom: 4,
        width: '100%'
    },

    descriptionDarkMobile: {
        fontSize: 16,
        color: 'white',
        marginBottom: 4,
    },

    detailsLight: {
        fontSize: 16,
        color: 'black',
        flexWrap: 'wrap'
    },

    detailsLightMobile: {
        fontSize: 14,
        color: 'black',
        flexWrap: 'wrap',
    },

    detailsDark: {
        fontSize: 16,
        color: 'white',
    },

    detailsDarkMobile: {
        fontSize: 14,
        color: 'white',
    },
});

export default MaterialPage;
