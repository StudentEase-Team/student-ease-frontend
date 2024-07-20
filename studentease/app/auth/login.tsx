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


const Login : React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  function attemptLogin() {
    login(email, password)
  }


    

  return (
    <ImageBackground source={require('../../assets/web.jpg')} style={styles.background}>
      <Toast />
      <View style={styles.container}>
        <View style={styles.form}>
          <Text h3 style={styles.title}>Login</Text>
          <Input
            placeholder="University email"
            keyboardType="email-address"
            autoCapitalize="none" 
            onChangeText={value => setEmail(value)}
            />
          <PasswordInput passwordCallback={setPassword}/>
          <CustomButton buttonText='Login' mode='day' func={attemptLogin}/>
          <TouchableOpacity style={styles.signupText}>
            <Text>You don't have a student account? Click here to sign up!</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    //backgroundColor: '#f0f0f0',
  },

  form: {

    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
  },

  signupText: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'none'
  },
});

export default Login;