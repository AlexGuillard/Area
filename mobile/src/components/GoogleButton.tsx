import {View} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
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
      console.log(error);
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
