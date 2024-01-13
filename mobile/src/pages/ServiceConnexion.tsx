import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions, Text} from 'react-native';
import {useAuth} from '../context/UserContext';
import { WebView } from 'react-native-webview';

const ServiceConnexion = ({navigation}) => {
    const backgroundStyle = {
        backgroundColor: '#1C1B1F',
        justifyContent: 'center',
        alignItems: 'center',
      };
  return (
    <WebView source={{ uri: `http://10.0.2.2:8081/ServicesConnexion` }} style={{ flex: 1 }} />
  );
};

export default ServiceConnexion;
