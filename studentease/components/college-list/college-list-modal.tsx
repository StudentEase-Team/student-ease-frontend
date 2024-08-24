import React, { useState } from "react"
import { Platform, View, Text, StyleSheet } from "react-native"
import { IconButton, Button, TextInput as PaperInput, Modal } from "react-native-paper"
import { useTheme } from "../../context/ThemeContext"
import { I18n } from "i18n-js"

type CollegeListModalProps = {
    i18n: I18n,
}

function CollegeListModal({ i18n }: CollegeListModalProps) {
    const { theme } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Modal visible={modalVisible} contentContainerStyle={Platform.OS === 'web' ? (theme === 'light' ? styles.modalContainerLight : styles.modalContainerDark) : (theme === 'light' ? styles.modalContainerLightMobile : styles.modalContainerDarkMobile)} onDismiss={() => { setModalVisible(false) }}>
                <View>
                    <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleModalLight : styles.titleModalDark) : (theme === 'light' ? styles.titleModalLightMobile : styles.titleModalDarkMobile)}>Add a new college</Text>
                    <PaperInput
                        label="College name"
                        mode="outlined"
                        /*value={college}
                        onChangeText={text => setCollege(text)}*/
                        style={styles.input}
                        theme={{ roundness: 7 }}
                    />

                    <PaperInput
                        label="College abbreviation"
                        mode="outlined"
                        /*value={subject}
                        onChangeText={text => setSubject(text)}*/
                        style={styles.input}
                        theme={{ roundness: 7 }}
                    />

                    <PaperInput
                        label="Address"
                        mode="outlined"
                        /*value={title}
                        onChangeText={text => setTitle(text)}*/
                        style={styles.input}
                        theme={{ roundness: 7 }}
                    />
                    <PaperInput
                        label="Phone number"
                        mode="outlined"
                        placeholder='+38121536536'
                        /*value={description}
                        onChangeText={text => setDescription(text)}*/
                        style={styles.input}
                        theme={{ roundness: 7 }}
                    />

                    <PaperInput
                        label="e-mail address"
                        mode="outlined"
                        placeholder='example@gmail.com'
                        /*value={description}
                        onChangeText={text => setDescription(text)}*/
                        style={styles.input}
                        theme={{ roundness: 7 }}
                    />

                    <View style={styles.buttonRow}>

                        {Platform.OS === 'web' ? (
                            <Button mode='contained' style={theme === 'light' ? styles.createCollegeButtonLight : styles.createCollegeButtonDark}> Submit announcement </Button>
                        ) : (
                            <Button mode='contained' style={theme === 'light' ? styles.createCollegeButtonLight : styles.createCollegeButtonDark}> Submit </Button>
                        )}
                        <Button mode='contained-tonal' onPress={() => setModalVisible(false)} style={theme === 'light' ? styles.cancelCollegeButtonLight : styles.cancelCollegeButtonDark}> Cancel </Button>
                    </View>

                </View>
            </Modal>


            {Platform.OS === 'web' ? (
                <Button mode='contained' style={theme === 'light' ? styles.addCollegeButtonLight : styles.addCollegeButtonDark} onPress={() => setModalVisible(true)}>
                    Add new college
                </Button>
            ) : (
                <IconButton icon='plus' iconColor='white' size={45} style={theme === 'light' ? styles.addCollegeButtonLightMobile : styles.addCollegeButtonDarkMobile} onPress={() => setModalVisible(true)}>
                </IconButton>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    modalContainerLight: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '40%',
        alignSelf: 'center',
    },

    modalContainerLightMobile: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '95%',
        alignSelf: 'center',
    },

    modalContainerDark: {
        backgroundColor: '#242526',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '40%',
        alignSelf: 'center',
    },

    modalContainerDarkMobile: {
        backgroundColor: '#242526',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '95%',
        alignSelf: 'center',
    },

    input: {
        marginBottom: 10,
    },

    createCollegeButtonLight: {
        width: '49%',
        backgroundColor: '#4dabf7',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

    createCollegeButtonDark: {
        width: '49%',
        backgroundColor: '#9775fa',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

    cancelCollegeButtonLight: {
        width: '49%',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

    cancelCollegeButtonDark: {
        width: '49%',
        backgroundColor: 'grey',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

    titleModalLight: {
        fontSize: 24,
        marginTop: 10,
        marginBottom: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },

    titleModalLightMobile: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },

    titleModalDark: {
        color: 'white',
        fontSize: 24,
        marginTop: 10,
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    titleModalDarkMobile: {
        color: 'white',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    addCollegeButtonLight: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#4dabf7',
    },

    addCollegeButtonLightMobile: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#4dabf7',
    },

    addCollegeButtonDark: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#9775fa',
    },

    addCollegeButtonDarkMobile: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        borderRadius: 50,
        justifyContent: 'center',
        backgroundColor: '#9775fa',
    },

    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
        marginTop: 20
    },
})

export default CollegeListModal;