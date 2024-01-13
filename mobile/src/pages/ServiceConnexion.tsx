import React, {useCallback, useEffect, useState} from 'react';
import {useAuth} from '../context/UserContext';
import CookieManager from '@react-native-cookies/cookies';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  REACT_APP_SERVER_IP,
  REACT_APP_SERVER_PORT,
  REACT_APP_WEB_IP,
  REACT_APP_WEB_PORT,
} from '@env';

const ServiceConnexion = ({route, navigation}) => {
  const {routeParam} = route.params;
  const {token, clearAuthData} = useAuth();
  const [storedRefreshTokenService, setStoredRefreshTokenService] =
    useState('');
  const [storedTokenService, setStoredTokenService] = useState('');
  const [storedServiceType, setStoredServiceType] = useState('');

  const registerService = async () => {
    await axios
      .get(routeParam)
      .then(res => {
        console.log('res =>', res);
      })
      .catch(err => {
        console.log('err param =>', routeParam);
        console.log('err =>', err);
      });

    await CookieManager.get(
      REACT_APP_WEB_IP + ':' + REACT_APP_WEB_PORT + '/ServicesConnexion',
    ).then(cookies => {
      console.log('CookieManager.get =>', cookies);
      setStoredServiceType(cookies.ServiceType.value);
      setStoredRefreshTokenService(cookies.RefreshToken.value);
      setStoredTokenService(cookies.tokenService.value);
    });

    const data = {
      token: storedTokenService,
      refresh_token: storedRefreshTokenService,
      typeService: storedServiceType,
    };

    await axios
      .post(
        REACT_APP_SERVER_IP +
          ':' +
          REACT_APP_SERVER_PORT +
          '/services/connexion',
        data,
        {
          headers: {
            token: token,
          },
        },
      )
      .then(() => {
        navigation.navigate('Area');
      })
      .catch(() => {
        navigation.navigate('Service');
      });
  };

  const registerServiceCallback = useCallback(registerService, [
    storedRefreshTokenService,
    storedTokenService,
    storedServiceType,
    navigation,
    routeParam,
    token,
  ]);

  useEffect(() => {
    if (token === 'undefined') {
      clearAuthData();
      navigation.navigate('Login');
    }
    registerServiceCallback();
  }, [registerServiceCallback, token, clearAuthData, navigation]);

  return <SafeAreaView>{/* Your component content */}</SafeAreaView>;
};

export default ServiceConnexion;
