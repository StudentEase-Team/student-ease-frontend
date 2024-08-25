import React, { useState } from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { themeLight, themeDark } from "../../context/PaperTheme";
import CustomDropdown from "../form/custom-dropdown";
import { useTheme } from "../../context/ThemeContext";
import { API_BASE_URL } from '@env';
import axios, { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { RegistrationRequest } from "../../model/RegistrationRequest";
import { I18n } from "i18n-js";
import { useAuth } from "../../context/AuthContext";

type UserCreationContentProps = {
    i18n: I18n,
    collegeData: { label: any; value: any; }[]
}

function UserCreationContent({ i18n, collegeData }: UserCreationContentProps) {
    const { theme } = useTheme();
    const [userRole, setUserRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [collegeName, setCollegeName] = useState<string>();
    const { userState } = useAuth();

    const handleCollegeChange = (selectedCollege: { label: any, value: string }) => {
        setCollegeName(selectedCollege.value);
    };

    const handleUserRoleChange = (selectedRole: { label: any, value: string }) => {
        setUserRole(selectedRole.value);
    };

    const config = {
        headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
    };

    const createUser = async () => {
        if (!email || !password || !firstName || !lastName || !phone || !collegeName || !userRole) {
            Toast.show({
                type: 'error',
                text1: i18n.t('failed_to_create_toast'),
            });
            return;
        }

        try {
            let request: RegistrationRequest = {
                email: email,
                password: password,
                userRole: userRole,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                collegeName: collegeName
            }
            const response: AxiosResponse = await axios.post(`${API_BASE_URL}/register`, request, config);
            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: i18n.t('successfully_created_toast'),
                });
                setEmail('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setPhone('');
                setCollegeName(undefined);
                setUserRole('');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: i18n.t('failed_to_create_user_toast'),
            });
        }
    }

    return (
        <Card style={Platform.OS === 'web' ? (theme === 'light' ? styles.cardLight : styles.cardDark) : (theme === 'light' ? styles.cardLightMobile : styles.cardDarkMobile)}>
            <Card.Content style={styles.cardContainer}>
                <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>
                    {i18n.t('userCreation_createUser')}
                </Text>

                <CustomDropdown style={Platform.OS === 'web' ? (theme === 'light' ? styles.dropdownLight : styles.dropdownDark) : (theme === 'light' ? styles.dropdownLightMobile : styles.dropdownDarkMobile)}
                    data={[{ label: i18n.t('userCreation_roleProfessor'), value: 'PROFESSOR' }, { label: i18n.t('userCreation_roleStudent'), value: 'STUDENT' }]}
                    labelField={'label'}
                    valueField={'value'}
                    onChange={handleUserRoleChange}
                    value={userRole}
                    placeholder={i18n.t('userCreation_roleLabel')} />

                <CustomDropdown style={Platform.OS === 'web' ? (theme === 'light' ? styles.dropdownLight : styles.dropdownDark) : (theme === 'light' ? styles.dropdownLightMobile : styles.dropdownDarkMobile)}
                    data={collegeData}
                    labelField={'label'}
                    valueField={'value'}
                    onChange={handleCollegeChange}
                    value={collegeName}
                    placeholder={i18n.t('userCreation_collegeLabel')} />

                <TextInput
                    theme={theme === 'light' ? themeLight : themeDark}
                    label={i18n.t('userCreation_email')}
                    mode="outlined"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={Platform.OS === 'web' ? (theme === 'light' ? styles.inputLight : styles.inputDark) : (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)} />

                <TextInput
                    theme={theme === 'light' ? themeLight : themeDark}
                    label={i18n.t('userCreation_password')}
                    mode="outlined"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={Platform.OS === 'web' ? (theme === 'light' ? styles.inputLight : styles.inputDark) : (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)} />

                <TextInput
                    theme={theme === 'light' ? themeLight : themeDark}
                    label={i18n.t('userCreation_firstname')}
                    mode="outlined"
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                    style={Platform.OS === 'web' ? (theme === 'light' ? styles.inputLight : styles.inputDark) : (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)} />

                <TextInput
                    theme={theme === 'light' ? themeLight : themeDark}
                    label={i18n.t('userCreation_lastname')}
                    mode="outlined"
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                    style={Platform.OS === 'web' ? (theme === 'light' ? styles.inputLight : styles.inputDark) : (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)} />

                <TextInput
                    theme={theme === 'light' ? themeLight : themeDark}
                    label={i18n.t('userCreation_phoneNumber')}
                    mode="outlined"
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    style={Platform.OS === 'web' ? (theme === 'light' ? styles.inputLight : styles.inputDark) : (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)} />

                <View style={styles.buttonRow}>
                    {Platform.OS === 'web' ? (
                        <Button mode='contained' onPress={() => createUser()} style={theme === 'light' ? styles.createNoticeboardItemButtonLight : styles.createNoticeboardItemButtonDark}>
                            {i18n.t('userCreation_registerNewUser')}
                        </Button>
                    ) : (
                        <Button mode='contained' onPress={() => createUser()} style={theme === 'light' ? styles.createNoticeboardItemButtonLight : styles.createNoticeboardItemButtonDark}>
                            {i18n.t('userCreation_register')}
                        </Button>
                    )}
                    <Button mode='contained-tonal' onPress={() => {
                        setEmail('');
                        setPassword('');
                        setFirstName('');
                        setLastName('');
                        setPhone('');
                        setCollegeName(undefined);
                        setUserRole('');
                    }}
                        style={theme === 'light' ? styles.cancelNoticeboardItemButtonLight : styles.cancelNoticeboardItemButtonDark}>
                        {i18n.t('userCreation_cancel')}
                    </Button>
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    cardLight: {
        width: '40%',
        marginTop: 15,
        padding: 20,
        backgroundColor: 'white',
        alignSelf: 'center',
    },

    cardLightMobile: {
        width: '100%',
        marginTop: 15,
        padding: 10,
        backgroundColor: 'white',
        alignSelf: 'center'
    },

    cardDark: {
        width: '40%',
        marginTop: 15,
        padding: 20,
        backgroundColor: '#242526',
        alignSelf: 'center'
    },

    cardDarkMobile: {
        width: '100%',
        marginTop: 15,
        padding: 10,
        backgroundColor: '#242526',
        alignSelf: 'center'
    },

    cardContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'column', 
        width: '100%' 
    },

    titleLight: {
        fontSize: 24,
        marginBottom: 30,
        fontWeight: 'bold',
    },

    titleLightMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20
    },

    titleDark: {
        fontSize: 24,
        marginBottom: 30,
        fontWeight: 'bold',
        color: 'white'
    },

    titleDarkMobile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20
    },

    dropdownLight: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        marginTop: 5,
        backgroundColor: '#f6f6f6',
        marginBottom: 5,
        padding: 4,
        borderWidth: 1,
        borderColor: '#707070',
        borderRadius: 5,
        height: 50
    },

    dropdownLightMobile: {
        backgroundColor: '#f6f6f6',
        marginBottom: 5,
        marginTop: 5,
        padding: 4,
        borderWidth: 1,
        borderColor: '#707070',
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        borderRadius: 5,
        height: 50
    },

    dropdownDark: {
        backgroundColor: '#121212',
        marginBottom: 5,
        marginTop: 5,
        padding: 4,
        borderWidth: 1,
        borderColor: '#707070',
        shadowColor: '#18191a',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        borderRadius: 5,
        height: 50,
        width: '100%',
    },

    dropdownDarkMobile: {
        backgroundColor: '#121212',
        marginBottom: 5,
        marginTop: 5,
        padding: 4,
        borderWidth: 1,
        borderColor: '#707070',
        shadowColor: '#18191a',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        borderRadius: 5,
        height: 50
    },

    inputLight: {
        marginBottom: 5,
        color: '#242526',
        width: '100%',
        height: 45
    },

    inputLightMobile: {
        marginBottom: 5,
        color: '#242526',
        width: '100%',
        alignSelf: 'center',
        height: 50,
    },

    inputDark: {
        marginBottom: 5,
        color: 'white',
        width: '100%',
        height: 45
    },

    inputDarkMobile: {
        marginBottom: 5,
        color: 'white',
        width: '100%',
        alignSelf: 'center',
        height: 50,
        fontSize: 14
    },

    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
        marginTop: 20
    },

    createNoticeboardItemButtonLight: {
        width: '49%',
        backgroundColor: '#4dabf7',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

    createNoticeboardItemButtonDark: {
        width: '49%',
        backgroundColor: '#9775fa',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

    cancelNoticeboardItemButtonLight: {
        width: '49%',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

    cancelNoticeboardItemButtonDark: {
        width: '49%',
        backgroundColor: 'grey',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
    },

});

export default UserCreationContent;