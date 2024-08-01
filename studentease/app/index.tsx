import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, PaperProvider, Text, ThemeProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { themeDark, themeLight } from '../context/PaperTheme';
import { PasswordInput } from '../component/form/password-input';
import { useRouter } from 'expo-router';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, userState } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if(userState !== null)
      router.replace("/noticeboard")
  }, [userState]);

  function attemptLogin() {
    login(email, password);
  }

  return (
    <ImageBackground source={theme === 'light' ? require('../assets/web.jpg') : require('../assets/webDark.png')} style={styles.background}>
      <Toast />
      <PaperProvider theme={theme === 'light' ? themeLight : themeDark}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <View style={Platform.OS === 'web' ? (theme === 'light' ? styles.formLight : styles.formDark) : (theme === 'light' ? styles.formLightMobile : styles.formDarkMobile)}>
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
                roundness: 30, 
              }}
              onChangeText={setEmail}
            />
            <PasswordInput passwordCallback={setPassword} />
            <ThemeProvider>
            <Button onPress={attemptLogin} mode="contained" style={theme === 'light' ? styles.loginButtonLight : styles.loginButtonDark}>Login</Button>
            </ThemeProvider>
            <TouchableOpacity >
              <Text style={theme === 'light' ? styles.signupTextLight : styles.signupTextDark}>You don't have an account? Click here to register.</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </PaperProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    opacity: 0.85,
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
  },

  titleLightMobile: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
  },

  titleDark: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
    color: 'white',
  },

  titleDarkMobile: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
    textAlign: 'center',
    color: 'white',
  },

  loginButtonLight: {
    backgroundColor: '#4dabf7',
    marginTop: 20,
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
  },

  loginButtonDark: {
    backgroundColor: '#9775fa',
    marginTop: 20,
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
  },

  signupTextLight: {
    textAlign: 'center',
    marginTop: 10,
    color: '#4dabf7'
  },

  signupTextDark: {
    textAlign: 'center',
    marginTop: 10,
    color: '#9775fa'
  },
});

export default Login;
