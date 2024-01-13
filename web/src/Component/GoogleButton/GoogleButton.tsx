import axios from 'axios';
import { useStore } from '../../hooks/useStore';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function GoogleButton() {

    const setAuthData = useStore((state: any) => state.setAuthData)
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || ''
    const navigate = useNavigate();

  return (
    <div>
        <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin

              useOneTap

              onSuccess={async credentialResponse => {

                const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/auth/loginService', {
                  token: credentialResponse.credential
                });
                const data = response.data;
                Cookies.set('token', data.randomToken)
                localStorage.setItem('authData', JSON.stringify(data))

                setAuthData(data)

                navigate('/Area')
              }}

              onError={() => {
                console.log('Login Failed');
              }}

              theme='filled_black'
            />
        </GoogleOAuthProvider>
    </div>
  )
}
