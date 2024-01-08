import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {
SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme,
View, TextInput, Pressable,
} from 'react-native';
import { Colors} from 'react-native/Libraries/NewAppScreen';

const Register = ({navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';

  const [textEmail, setTextEmail] = useState("");
  const [textPassWord, setTextPassWord] = useState("");

  const handleTextChangeUser = (text: string) => {
    setTextEmail(text);
  };
  const handleTextChangePassWord = (text: string) => {
      setTextPassWord(text);
  };

  const handleClickRegister = async () => {
      const data = {
        mail: textEmail,
        password: textPassWord,
      };
      axios.post(process.env.REACT_APP_SERVER_URL + '/auth/signin', data)
        .then(response => {
          navigation.navigate("Area")
        })
        .catch(error => {
          console.error(error);
        });
  }

  const backgroundStyle = {
    backgroundColor:  Colors.darker,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.registerPageBody}>
        <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputArea}
              placeholder='Email'
              placeholderTextColor={'rgba(43, 34, 119, 1)'}
              onChangeText={handleTextChangeUser}
              defaultValue={textEmail}
            />
            <TextInput
              style={styles.inputArea}
              placeholder='Password'
              placeholderTextColor={'rgba(43, 34, 119, 1)'}
              onChangeText={handleTextChangePassWord}
              defaultValue={textPassWord}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.options}>
            <Pressable style={styles.connectionButon} onPress={handleClickRegister}>
              <Text>Register</Text>
            </Pressable>
            <Pressable onPress={() => { navigation.navigate('Login') }}>
              <Text style={styles.secondaryButtonText}>Login</Text>
            </Pressable>
          </View>
    </View>
    </SafeAreaView>
    //     <GoogleButton />
  );
}

const styles = StyleSheet.create({
    registerPageBody: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 34,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    inputArea: {
        height: 44,
        width: 262,
        backgroundColor: '#C5C0FF',
        borderWidth: 2,
        borderColor: '#423B8E',
        borderStyle: 'solid',
        borderRadius: 16,
        color: '#2B2277',
        fontSize: 12,
        paddingLeft: 18,
    },
    options: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    connectionButon: {
        height: 34,
        width: 125,
        backgroundColor: '#C5C0FF',
        borderWidth: 1,
        borderColor: '#423B8E',
        borderStyle: 'solid',
        borderRadius: 10,
        color: '#2B2277',
        fontSize: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
      secondaryButtonText: {
        color: '#E5E1E6',
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
        fontFamily: 'Inter',
        fontSize: 10,
        fontWeight: '400',
      }
})

export default Register;
