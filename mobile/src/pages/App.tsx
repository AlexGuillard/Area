import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IconButton} from 'react-native-paper';
import { AuthProvider } from '../context/UserContext';
import Login from './Login';
import AreaPage from './AreaPage';
import Service from './Service';
import Register from './Register';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
          headerTintColor: '#2B2277',
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Area"
          component={AreaPage}
          options={() => ({
            title: 'Area',
            headerBackVisible: false,
            headerRight: () => (
              <IconButton
                style={styles.IconItem}
                icon="account-circle"
                onPress={() => {}}
              />
            ),
          })}
        />
        <Stack.Screen name="Service" component={Service} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(197, 192, 255, 1)',
    position: 'absolute',
    top: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
  },
  IconItem: {
    color: '#2B2277',
    fontSize: 30,
  },
  headerText: {
    textDecorationColor: '#2B2277',
    fontSize: 30,
  },
});

export default App;
