/**
 * @format
 */

import 'react-native';
import React from 'react';
import Login from '../src/pages/Login';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import axios from 'axios';

it('renders correctly', () => {
  renderer.create(<Login />);
});

function random_string(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

it('connect to back', async () => {
  const mail = random_string(10) + '@' + random_string(10) + '.com';
  const password = 'test';
  // use axios to connect to back
  const data = {
    mail: mail,
    password: password,
  };

  // axios
  await axios
    .post('http://localhost:8080/auth/signup', data)
    .then(() => {
      console.log('success');
    })
    .catch(error => {
      console.error(error.response);
    });
});
