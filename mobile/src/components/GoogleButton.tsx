import {View} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  REACT_APP_GOOGLE_CLIENT_ID,
  REACT_APP_SERVER_IP,
  REACT_APP_SERVER_PORT,
} from '@env';
import axios from 'axios';
import {useAuth} from '../context/UserContext';

const GoogleButton = ({navigation}) => {
  const {setAuthData} = useAuth();

  const configureGoogleSignIn = async () => {
    try {
      await GoogleSignin.configure({
        webClientId: REACT_APP_GOOGLE_CLIENT_ID,
      });
      console.log('Google Sign-In configured successfully!');
    } catch (error) {
      console.error('Error configuring Google Sign-In:', error);
    }
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const signIn = async () => {
    try {
      const test = await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const response = await axios.post(
        REACT_APP_SERVER_IP +
          ':' +
          REACT_APP_SERVER_PORT +
          '/auth/loginService',
        {
          token: userInfo.idToken,
        },
      );
      setAuthData(
        response.data.email,
        response.data.randomToken,
        response.data.id,
      );
      navigation.navigate('Area');
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing in');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.log('Some other error happened:', error);
        console.log(error.message);
        console.log(error.code);
      }
    }
  };

  return (
    <View>
      <GoogleSigninButton
        style={{width: 192, height: 48, marginTop: 30}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};

export default GoogleButton;
