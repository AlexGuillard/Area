/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Service from './src/pages/Service';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Service);
