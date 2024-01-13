import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export function GoogleButton() {

  // onSuccess={async credentialResponse => {

  //   const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/auth/loginService', {
  //     token: credentialResponse.credential
  //   });
  //   const data = response.data;
  //   Cookies.set('token', data.randomToken)
  //   localStorage.setItem('authData', JSON.stringify(data))

  //   setAuthData(data)

  //   navigate('/Area')
  // }}
  const [userInfo, setUserInfo] = useState(null);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices().then
      const user = await GoogleSignin.signIn();

      setUserInfo(user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Sign in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('Play services not available');
      } else {
        // some other error happened
        console.error(error);
      }
    }
  };

  return (
    <View>
    <Text>App</Text>
    <Text style={{color: 'white'}}>User Info: {userInfo ? JSON.stringify(userInfo) : 'None'}</Text>
    <GoogleSigninButton
      style={{width: 192, height: 48, marginTop: 30}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
    />
  </View>
  )
}
