import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useStore } from './../../hooks/useStore.ts';

const Login = () => {

  const setAuthData = useStore((state: any) => state.setAuthData)

  return (
    <div>
        <h1>login</h1>
        <GoogleOAuthProvider clientId="someid">
            <GoogleLogin

              onSuccess={credentialResponse => {
                console.log(credentialResponse);

                const response = axios.post('http://localhost:3000/login');
                const data = response.data;

                localStorage.setItem('authData', data)

                setAuthData(data)
              }}

              onError={() => {
                console.log('Login Failed');
              }}
            />
        </GoogleOAuthProvider>
    </div>
  )
}

export default Login