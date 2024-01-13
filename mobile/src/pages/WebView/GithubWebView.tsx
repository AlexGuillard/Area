import React from 'react';
import WebView from 'react-native-webview';

const GithubWebView = ({navigation}) => {
    return (
        <WebView 
            source={{ uri: 'http://10.0.2.2:8080/auth/github' }}
            onNavigationStateChange={(navState) => {
                if (navState.url.includes('http://')) {
                    console.log('url', navState.url);
                    navigation.goBack();
                }
            }}
            startInLoadingState
            javaScriptEnabled
        />
    );
};

export default GithubWebView;
