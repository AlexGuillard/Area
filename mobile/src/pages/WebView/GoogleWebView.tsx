import React from 'react';
import WebView from 'react-native-webview';

const GoogleWebView = ({navigation}) => {
    return (
        <WebView 
            source={{ uri: 'http://10.0.2.2:8080/myauth' }}
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
