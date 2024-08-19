import React, { useContext, useEffect, useState } from 'react'
import { Platform, StyleSheet, View, Text } from 'react-native'
import { ScrollView, } from "react-native-gesture-handler";
import { useTheme } from '../../context/ThemeContext';
import  CustomDropdown  from '../../component/form/custom-dropdown'
import { Card, PaperProvider, TextInput as PaperInput, ThemeProvider, Button } from 'react-native-paper';
import { themeDark, themeLight } from '../../context/PaperTheme';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
import axios, { AxiosResponse } from 'axios';
import { College } from '../../model/College';
import { RegistrationRequest } from '../../model/RegistrationRequest';
import { I18n } from 'i18n-js';
import { translations } from '../../localization';
import { LocaleContext } from '../../context/LocaleContext';

function UserCreation() {
    const { theme } = useTheme();
    const { userState } = useAuth();
    const [ userRole, setUserRole ] = useState('');
    const [email, setEmail] = useState('');
    const [ password, setPassword ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [collegeName, setCollegeName] = useState<string>();
    const initialCollegeData = [{ label: 'Any', value: 'any' }];
    const [collegeData, setCollegeData] = useState<{ label: any, value: any }[]>(initialCollegeData);
    const i18n = new I18n(translations)
    const { locale} = useContext(LocaleContext);
    i18n.locale = locale

    const router = useRouter();
    const config = {
        headers: { Authorization: `Bearer ${userState?.token.accessToken}` }
    };

    const fetchColleges = async () => {
        const response: AxiosResponse = await axios.get(`${API_BASE_URL}/college`, config);
            if (response.status === 200) {
                const colleges: College[] = response.data;
                const updatedCollegeData = [ ...colleges.map(c => ({ label: c.abbreviation, value: c.name }))];
                setCollegeData(updatedCollegeData);
            }
        }

    useEffect(() => {
        fetchColleges();
    },[]);

    const handleCollegeChange = (selectedCollege: { label: any, value: string}) => {
        setCollegeName(selectedCollege.value);
    };

    const handleUserRoleChange = (selectedRole: { label: any, value: string}) => {
        setUserRole(selectedRole.value);
    };

    const createUser = async () => {
        if (!email || !password || !firstName || !lastName || !phone || !collegeName || !userRole) {
            Toast.show({
                type: 'error',
                text1: 'All fields must be filled!',
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
                    text1: 'Successfully created user!',
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
                text1: 'Failed to create user. Please try again.',
            });
        }
    }

    return (
        <ScrollView style={theme === 'light' ? styles.containerLight : styles.containerDark}>
            <Card
                style={
                    Platform.OS === 'web'
                        ? theme === 'light'
                            ? styles.qaContainerLight
                            : styles.qaContainerDark
                        : theme === 'light'
                        ? styles.qaContainerLightMobile
                        : styles.qaContainerDarkMobile
                }>

                <Card.Content style={{flex:1, alignItems:'center', justifyContent:'center',flexDirection:'column', width:'100%'}}>
                    <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>
                        {i18n.t('userCreation_createUser')} 
                    </Text>
                    
                    <CustomDropdown style={Platform.OS === 'web' ? (theme === 'light' ? styles.dropdownLight : styles.dropdownDark) : (theme === 'light' ? styles.dropdownLightMobile : styles.dropdownDarkMobile)} 
                        data={[{label: i18n.t('userCreation_roleProfessor'), value: 'PROFESSOR'}, {label: i18n.t('userCreation_roleStudent'), value: 'STUDENT'}]} 
                        labelField={'label'} 
                        valueField={'value'} 
                        onChange={handleUserRoleChange}
                        value={userRole}
                        placeholder={i18n.t('userCreation_roleLabel')}
                    />

                    <CustomDropdown style={Platform.OS === 'web' ? (theme === 'light' ? styles.dropdownLight : styles.dropdownDark) : (theme === 'light' ? styles.dropdownLightMobile : styles.dropdownDarkMobile)} 
                        data={collegeData} 
                        labelField={'label'} 
                        valueField={'value'} 
                        onChange={handleCollegeChange}
                        value={collegeName}
                        placeholder={i18n.t('userCreation_collegeLabel')}
                    />

                    <PaperInput
                        theme={theme === 'light' ? themeLight : themeDark}
                        label={i18n.t('userCreation_email')}
                        mode="outlined"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={Platform.OS === 'web' ? (theme === 'light' ? styles.inputLight : styles.inputDark) : (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}
                    />

                    <PaperInput
                        theme={theme === 'light' ? themeLight : themeDark}                        
                        label={i18n.t('userCreation_password')}
                        mode="outlined"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={Platform.OS === 'web' ? (theme === 'light' ? styles.inputLight : styles.inputDark) : (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}
                    />

                    <PaperInput
                        theme={theme === 'light' ? themeLight : themeDark}
                        label={i18n.t('userCreation_firstname')} 
                        mode="outlined"
                        value={firstName}
                        onChangeText={text => setFirstName(text)}
                        style={Platform.OS === 'web' ? (theme === 'light' ? styles.inputLight : styles.inputDark) : (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}
                    />

                    <PaperInput
                        theme={theme === 'light' ? themeLight : themeDark}
                        label={i18n.t('userCreation_lastname')} 
                        mode="outlined"
                        value={lastName}
                        onChangeText={text => setLastName(text)}
                        style={Platform.OS === 'web' ? (theme === 'light' ? styles.inputLight : styles.inputDark) : (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}
                    />

                    <PaperInput
                        theme={theme === 'light' ? themeLight : themeDark}
                        label={i18n.t('userCreation_phoneNumber')}
                        mode="outlined"
                        value={phone}
                        onChangeText={text => setPhone(text)}
                        style={Platform.OS === 'web' ? (theme === 'light' ? styles.inputLight : styles.inputDark) : (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}
                    />

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
            <Toast></Toast>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        padding: 20,
    },

    containerDark: {
        flex: 1,
        padding: 20,
        backgroundColor: '#18191A'
    },
    qaContainerLight: {
        width: '40%',
        marginTop: 15,
        padding: 20,
        backgroundColor: 'white',
        alignSelf:'center',
    },

    qaContainerLightMobile: {
        width: '100%',
        marginTop: 15,
        padding:10,
        backgroundColor: 'white',
        alignSelf:'center'
    },

    qaContainerDark: {
        width: '40%',
        marginTop: 15,
        padding: 20,
        backgroundColor: '#242526',
        alignSelf:'center'
    },

    qaContainerDarkMobile: {
        width: '100%',
        marginTop: 15,
        padding: 10,
        backgroundColor: '#242526',
        alignSelf:'center'
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
        borderColor:'#707070', 
        borderRadius: 5,
        height: 50
    },

    dropdownLightMobile: {
        backgroundColor: '#f6f6f6',
        marginBottom: 5,
        marginTop: 5, 
        padding: 4, 
        borderWidth: 1, 
        borderColor:'#707070', 
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
        borderColor:'#707070', 
        shadowColor: '#18191a',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        borderRadius: 5,
        height: 50,
        width:'100%', 
    },

    dropdownDarkMobile: {
        backgroundColor: '#121212',
        marginBottom: 5,
        marginTop: 5, 
        padding: 4, 
        borderWidth: 1, 
        borderColor:'#707070', 
        shadowColor: '#18191a',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        borderRadius: 5,
        height: 50
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

})

export default UserCreation;
