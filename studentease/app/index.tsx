import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { TextInput, Button, PaperProvider, Text, ThemeProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { themeDark, themeLight } from '../context/PaperTheme';
import { PasswordInput } from '../components/form/password-input';
import { useRouter } from 'expo-router';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, userState } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if(userState !== null)
      router.replace("/homepage")
  }, [userState]);

  function attemptLogin() {
    login(email, password);
  }

  return (
    <ImageBackground source={theme === 'light' ? require('../assets/web.jpg') : require('../assets/webDark.png')} style={styles.backgroundImage}>
      <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <View style={Platform.OS === 'web' ? (theme === 'light' ? styles.formLight : styles.formDark) : (theme === 'light' ? styles.formLightMobile : styles.formDarkMobile)}>
          <Image 
            source={theme === 'light' ? require('../assets/logolight.png') : require('../assets/logodark.png')}  
            style={styles.logo}
            resizeMode="contain" />
            <Text style={Platform.OS === 'web' ? (theme === 'light' ? styles.titleLight : styles.titleDark) : (theme === 'light' ? styles.titleLightMobile : styles.titleDarkMobile)}>Login</Text>
            <TextInput
              placeholder="University email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              mode="outlined"
              label="University email"
              style={theme === 'light' ? styles.inputLight : styles.inputDark}
              theme={{
                roundness: 5, 
              }}
              onChangeText={setEmail}/>
            <PasswordInput passwordCallback={setPassword}  onSubmitEdit={attemptLogin}/>
            <ThemeProvider>
              <Button onPress={attemptLogin} mode="contained" style={theme === 'light' ? styles.loginButtonLight : styles.loginButtonDark}>Login</Button>
            </ThemeProvider>
          </View>
        </KeyboardAvoidingView>
      </PaperProvider>
      <Toast />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },

  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },

  logo: {
    width: '50%',
    height: 80,
    alignSelf:'center'
  },

  inputLight: {
    marginBottom: 10,
  },

  inputDark: {
    marginBottom: 10,
    color: 'white',
  },

  formLight: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: '25%',
  },

  formLightMobile: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: '100%',
  },

  formDark: {
    padding: 20,
    backgroundColor: '#242526',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: '25%',
  },

  formDarkMobile: {
    padding: 20,
    backgroundColor: '#242526',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: '100%',
  },

  titleLight: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333'
  },

  titleLightMobile: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333'
  },

  titleDark: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#f6f6f6',
  },

  titleDarkMobile: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: 'white',
  },

  loginButtonLight: {
    backgroundColor: '#4dabf7',
    marginTop: 30,
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
  },

  loginButtonDark: {
    backgroundColor: '#9775fa',
    marginTop: 30,
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
  },
});

export default Login;
