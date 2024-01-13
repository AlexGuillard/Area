import { REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT } from '@env';
import React from 'react';
import WebView from 'react-native-webview';

const GoogleWebView = ({navigation}) => {
    return (
        <WebView 
            source={{ uri: REACT_APP_SERVER_IP + ':' + REACT_APP_SERVER_PORT + '/myauth' }}
            onNavigationStateChange={(navState) => {
                if (navState.url.includes('/myauth/google-redirect')) {
                    const url = navState.url.replace('localhost', '10.0.2.2')
                    navigation.navigate('ServiceConnexion', {
                        routeParam: url
                    });
                }
            }}
            startInLoadingState
            javaScriptEnabled
        />
    );
};

export default GoogleWebView;
