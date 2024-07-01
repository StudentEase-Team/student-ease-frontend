import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { PasswordInput } from '../../components/form/password_input';
import { CustomButton } from '../../components/form/custom_button';

export default function LoginPage() {
  return (
    <ImageBackground source={require('../../assets/web.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text h3 style={styles.title}>Login</Text>
          <Input
            placeholder="University email"
            keyboardType="email-address"
            autoCapitalize="none" />
          <PasswordInput />
          <CustomButton buttonText='Login' mode='day' />
          <TouchableOpacity>
            <Text style={styles.signupText}>
              You don't have a student account? Click here to sign up!
            </Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    opacity: 0.85,
    //backgroundColor: '#f0f0f0',
  },
  form: {
    width: '25%',
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
  },
});
