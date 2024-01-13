import React from 'react';
import WebView from 'react-native-webview';

const DiscordWebView = ({navigation}) => {
    return (
        <WebView 
            source={{ uri: 'http://10.0.2.2:8080/services/discord/login' }}
            onNavigationStateChange={(navState) => {
                if (navState.url.includes('/services/discord/callback')) {
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

export default DiscordWebView;
