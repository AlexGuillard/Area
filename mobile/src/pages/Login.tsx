import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAuth} from '../context/UserContext';

const Login = ({navigation}) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const backgroundStyle = {
    backgroundColor: Colors.darker,
    flex: 1,
  };
  const {setAuthData} = useAuth();
  const [displayMessage, setMessage] = useState('');

  const handleTextChangeUser = (text: string) => {
    setMail(text);
  };
  const handleTextChangePassWord = (text: string) => {
    setPassword(text);
  };

  const handleClickConnection = () => {
    const data = {
      mail: mail,
      password: password,
    };
    axios
      .post(process.env.REACT_APP_SERVER_IP + ':' + process.env.REACT_APP_SERVER_PORT + '/auth/signin', data)
      .then(async response => {
        setAuthData(
          response.data.email,
          response.data.randomToken,
          response.data.id,
        );
        navigation.navigate('Area');
      })
      .catch(error => {
        if (error.response.status === 403) {
          setMessage('Mail Not Found');
        } else if (error.response.status === 400) {
          setMessage('Invalid Mail or Password');
        } else {
          setMessage('Error');
          console.error(error);
        }
      });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 50}}>
        <View style={{justifyContent: 'center'}}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'rgba(43, 34, 119, 1)'}
            onChangeText={handleTextChangeUser}
            defaultValue={mail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={'rgba(43, 34, 119, 1)'}
            onChangeText={handleTextChangePassWord}
            defaultValue={password}
            secureTextEntry={true}
          />
        </View>
        <View style={{paddingHorizontal: 50}}>
          {displayMessage !== '' && (
            <Text style={styles.errorMessage}>{displayMessage}</Text>
          )}
          <Pressable
            style={styles.primaryButton}
            onPress={handleClickConnection}>
            <Text style={styles.primaryButtonText}>Login</Text>
          </Pressable>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.secondaryButtonText}>Register</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  input: {
    borderColor: 'rgba(66, 59, 142, 1)',
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    height: 40,
    backgroundColor: 'rgba(197, 192, 255, 1)',
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
    marginTop: 0,
  },
  primaryButton: {
    borderColor: '#3F3C8F',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 40,
    backgroundColor: '#282377',
    marginVertical: 10,
  },
  primaryButtonText: {
    color: 'white',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '900',
  },
  secondaryButton: {
    width: '100%',
    padding: 10,
    height: 40,
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
  },
});

export default Login;
