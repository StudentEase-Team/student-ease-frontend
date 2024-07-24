import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Input, Text } from '@rneui/themed';
import { PasswordInput } from '../../component/form/password-input';
import { CustomButton } from '../../component/form/custom-button';
import axios, { AxiosResponse } from 'axios';
import Toast from 'react-native-toast-message';
import NavigationBar from '../../component/navigation/navigation-bar';
import { useAuth } from '../../context/AuthContext';
import { UserState } from '../../model/UserState';
import { useTheme } from '../../context/ThemeContext';
import { Button, PaperProvider } from 'react-native-paper';
import { themeDark, themeLight } from '../../context/PaperTheme';


const Login : React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { theme } = useTheme();

  function attemptLogin() {
    login(email, password)
  }


    

  return (
    <ImageBackground source={require('../../assets/web.jpg')} style={styles.background}>
      <Toast />
      <PaperProvider theme={theme === 'light'? themeLight : themeDark}>
      <View style={styles.container}>
        <View style={theme === 'light'? styles.formLight : styles.formDark}>
          <Text h3 style={theme === 'light'? styles.titleLight : styles.titleDark}>Login</Text>
          <Input
            placeholder="University email"
            keyboardType="email-address"
            autoCapitalize="none" 
            style={theme === 'light'? {color:'black'}:{color:'white'}}
            onChangeText={value => setEmail(value)}
            />
          <PasswordInput passwordCallback={setPassword}/>
          <Button onPress={attemptLogin} mode='contained'>Login</Button>
          <TouchableOpacity style={theme === 'light'? styles.signupTextLight : styles.signupTextDark}>
            <Text style={theme === 'light'? {color:'black'}:{color:'white'}}>You don't have a student account? Click here to sign up!</Text>
          </TouchableOpacity>
        </View>
      </View>
      </PaperProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'repeat',

  },

  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    opacity: 0.85,
  },

  formLight: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  formDark: {
    padding: 20,
    backgroundColor: 'rgb(30,30,30)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  titleLight: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
  },

  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
    color: 'white'
  },

  signupTextLight: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'none'
  },

  signupTextDark: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'none'
  },
});

export default Login;