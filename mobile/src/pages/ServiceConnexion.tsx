import React, {useCallback, useEffect, useState} from 'react';
import {useAuth} from '../context/UserContext';
import { WebView } from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const ServiceConnexion = ({ route, navigation }) => {
  const { routeParam } = route.params;
  const { token, clearAuthData } = useAuth();
  const [storedRefreshTokenService, setStoredRefreshTokenService] = useState('');
  const [storedTokenService, setStoredTokenService] = useState('');
  const [storedServiceType, setStoredServiceType] = useState('');

  const registerService = async () => {
    await axios.get(routeParam).then((res) => {
      console.log('res =>', res);
    }).catch((err) => {
      console.log('err param =>', routeParam);
      console.log('err =>', err);
    });

    await CookieManager.get('http://10.0.2.2:8081/ServicesConnexion')
      .then((cookies) => {
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
      .post('http://10.0.2.2:8080/services/connexion', data, {
        headers: {
          token: token,
        },
      })
      .then(() => {
        navigation.navigate("Area");
      })
      .catch(error => {
        navigation.navigate("Service");
      });
  };

  const registerServiceCallback = useCallback(registerService, [storedRefreshTokenService, storedTokenService, storedServiceType, navigation]);

  useEffect(() => {
    registerServiceCallback();
  }, [registerServiceCallback]);

  return (
    <SafeAreaView>
      {/* Your component content */}
    </SafeAreaView>
  );
};

export default ServiceConnexion;
