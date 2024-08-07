import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
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
                        
                        <CustomDropdown style={Platform.OS === 'web'? {width:'80%'}:{width:'100%'}} data={[{label:'Professor', value:'PROFESSOR'}, {label:'Student', value:'STUDENT'}]} 
                        labelField={'label'} 
                        valueField={'value'} 
                        onChange={ handleUserRoleChange }
                        value={userRole}
                        />


                        <CustomDropdown style={Platform.OS === 'web'? {width:'80%', marginTop: 15}:{width:'100%', marginTop: 15}} data={collegeData} 
                        labelField={'label'} 
                        valueField={'value'} 
                        onChange={ handleCollegeChange }
                        value={collegeName}
                        />

                        <PaperInput
                                theme = {theme === 'light'? themeLight:themeDark}
                                label="Email"
                                mode="outlined"
                                value={email}
                                onChangeText={text => setEmail(text)}
                                style={Platform.OS === 'web'? (theme === 'light' ? styles.inputLight : styles.inputDark): (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}>
                        </PaperInput>

                        <PaperInput
                                theme = {theme === 'light'? themeLight:themeDark}                        
                                label="Password"
                                mode="outlined"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={text => setPassword(text)}
                                style={Platform.OS === 'web'? (theme === 'light' ? styles.inputLight : styles.inputDark): (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}>
                        </PaperInput>

                        <PaperInput
                                theme = {theme === 'light'? themeLight:themeDark}
                                label="Firstname"
                                mode="outlined"
                                value={firstName}
                                onChangeText={text => setFirstName(text)}
                                style={Platform.OS === 'web'? (theme === 'light' ? styles.inputLight : styles.inputDark): (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}>
                        </PaperInput>

                        <PaperInput
                                theme = {theme === 'light'? themeLight:themeDark}
                                label="Lastname"
                                mode="outlined"
                                value={lastName}
                                onChangeText={text => setLastName(text)}
                                style={Platform.OS === 'web'? (theme === 'light' ? styles.inputLight : styles.inputDark): (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}>
                        </PaperInput>

                        <PaperInput
                                theme = {theme === 'light'? themeLight:themeDark}
                                label="Phone number"
                                mode="outlined"
                                value={phone}
                                onChangeText={text => setPhone(text)}
                                style={Platform.OS === 'web'? (theme === 'light' ? styles.inputLight : styles.inputDark): (theme === 'light' ? styles.inputLightMobile : styles.inputDarkMobile)}>
                        </PaperInput>

                        <View style={styles.buttonRow}>
                            {Platform.OS === 'web' ? (
                                <Button mode='contained' onPress={() => createUser()} style={theme === 'light' ? styles.createNoticeboardItemButtonLight : styles.createNoticeboardItemButtonDark}> Register new user </Button>
                            ) : (
                                <Button mode='contained' onPress={() => createUser()} style={theme === 'light' ? styles.createNoticeboardItemButtonLight : styles.createNoticeboardItemButtonDark}> Register </Button>
                            )}
                            <Button mode='contained-tonal' onPress={() => {               
                                setEmail('');
                                setPassword('');
                                setFirstName('');
                                setLastName('');
                                setPhone('');
                                setCollegeName(undefined);
                                setUserRole('');}} 
                            style={theme === 'light' ? styles.cancelNoticeboardItemButtonLight : styles.cancelNoticeboardItemButtonDark}> Cancel </Button>
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
        width: '50%',
        marginTop: 15,
        padding: 20,
        backgroundColor: 'white',
        alignSelf:'center'
    },

    qaContainerLightMobile: {
        width: '100%',
        marginTop: 15,
        padding: 20,
        backgroundColor: 'white',
        alignSelf:'center'
    },

    qaContainerDark: {
        width: '50%',
        marginTop: 15,
        padding: 20,
        backgroundColor: '#242526',
        alignSelf:'center'
    },

    qaContainerDarkMobile: {
        width: '100%',
        marginTop: 15,
        padding: 20,
        backgroundColor: '#242526',
        alignSelf:'center'
    },

    inputLight: {
        marginTop: 10,
        color: '#242526',
        width: '80%',
        height: 45
    },

    inputLightMobile: {
        marginTop: 10,
        color: '#242526',
        width: '100%',
        alignSelf: 'center',
        height: 45,
    },
    
    inputDark: {
        marginTop: 10,
        color: 'white',
        width: '80%',
        height: 45
    },

    inputDarkMobile: {
        marginTop: 10,
        color: 'white',
        width: '100%',
        alignSelf: 'center',
        height: 45,
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

})

export default UserCreation;
