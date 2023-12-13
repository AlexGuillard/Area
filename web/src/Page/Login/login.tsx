import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useStore } from './../../hooks/useStore.ts';

const Login = () => {

  const setAuthData = useStore((state: any) => state.setAuthData)

  return (
    <div>
        <h1>login</h1>
        <GoogleOAuthProvider clientId="someId">
            <GoogleLogin

              onSuccess={async credentialResponse => {
                console.log(credentialResponse);

                const response = await axios.post('http://localhost:8080/auth/loginService', {
                  token: credentialResponse.credential
                });
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