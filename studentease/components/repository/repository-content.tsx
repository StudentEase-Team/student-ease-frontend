import React from "react";
import { View, Platform, Linking, Text, StyleSheet } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { Material } from "../../model/Material";
import { useTheme } from "../../context/ThemeContext";

type RepositoryContentProps = {
    filteredMaterials: Material[] | undefined,
}

function RepositoryContent({filteredMaterials}: RepositoryContentProps) {
    const {theme} = useTheme();

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

    return(
        <View style={Platform.OS === 'web' ? styles.pageContainerContent : styles.pageContainerContentMobile}>
            {filteredMaterials?.map((material, index) => (
                <Card key={index} style={[Platform.OS === 'web' ? styles.card : styles.cardMobile, { backgroundColor: theme === 'light' ? generateColor(material.materialType, true) : generateColor(material.materialType, false) }]} onPress={() => {Linking.openURL(material.url)}}>
                    <Card.Content style={styles.cardContent}>
                        <IconButton icon={generateIcon(material.materialType)} size={Platform.OS === 'web' ? 60 : 30} style={Platform.OS === 'web' ? styles.icon : styles.iconMobile} iconColor={theme === 'light' ? 'rgb(73, 69, 79)' : 'white'}/>
                        <View style={Platform.OS === 'web' ? styles.textContainer : styles.textContainerMobile}>
                            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardTitleLight : styles.cardTitleDark) : (theme === 'light' ? styles.cardTitleLightMobile : styles.cardTitleDarkMobile)}>{material.name}</Text>
                            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardDescriptionLight : styles.cardDescriptionDark) : (theme === 'light' ? styles.cardDescriptionLightMobile : styles.cardDescriptionDarkMobile)}>{material.about}</Text>
                            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardDetailsLight : styles.cardDetailsDark) : (theme === 'light' ? styles.cardDetailsLightMobile : styles.cardDetailsDarkMobile)}>{material.description}</Text>
                        </View>
                    </Card.Content>
                </Card>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainerContent: {
        width: '70%',
        alignSelf: 'center',
    },

    pageContainerContentMobile: {
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
        borderRadius: 15,
        marginBottom: 10,
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

    cardTitleLight: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },

    cardTitleLightMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 4,
    },

    cardTitleDark: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },

    cardTitleDarkMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },

    cardDescriptionLight: {
        fontSize: 18,
        color: 'black',
        marginBottom: 4,
    },

    cardDescriptionLightMobile: {
        fontSize: 16,
        color: 'black',
        marginBottom: 4,
    },
    
    cardDescriptionDark: {
        fontSize: 18,
        color: 'white',
        marginBottom: 4,
        width: '100%'
    },

    cardDescriptionDarkMobile: {
        fontSize: 16,
        color: 'white',
        marginBottom: 4,
    },

    cardDetailsLight: {
        fontSize: 16,
        color: 'black',
        flexWrap: 'wrap'
    },

    cardDetailsLightMobile: {
        fontSize: 14,
        color: 'black',
        flexWrap: 'wrap',
    },

    cardDetailsDark: {
        fontSize: 16,
        color: 'white',
    },

    cardDetailsDarkMobile: {
        fontSize: 14,
        color: 'white',
    },
});

export default RepositoryContent;