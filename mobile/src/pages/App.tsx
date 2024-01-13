import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthProvider} from '../context/UserContext';
import Login from './Login';
import AreaPage from './AreaPage';
import Service from './Service';
import Register from './Register';
import ServiceConnexion from './ServiceConnexion';
import GithubWebView from './WebView/GithubWebView';
import DiscordWebView from './WebView/DiscordWebView';
import GoogleWebView from './WebView/GoogleWebView';
import SpotifyWebView from './WebView/SpotifyWebView';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Area"
            component={AreaPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Service"
            component={Service}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GithubWebView"
            component={GithubWebView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DiscordWebView"
            component={DiscordWebView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ServiceConnexion"
            component={ServiceConnexion}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GoogleWebView"
            component={GoogleWebView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SpotifyWebView"
            component={SpotifyWebView}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
