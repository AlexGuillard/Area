import React from 'react';
import './login.css';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import GoogleButton from '../../Component/GoogleButton/GoogleButton';

function Login() {

  const navigate = useNavigate()

  const [textEmail, setTextEmail] = useState("");
  const [textPassWord, setTextPassWord] = useState("");

  const handleTextChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextEmail(event.target.value);
  };
  const handleTextChangePassWord = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextPassWord(event.target.value);
  };

  const handleClickConnection = () => {
    const data = {
      mail: textEmail,
      password: textPassWord,
    };
    axios.post(process.env.REACT_APP_SERVER_URL + '/auth/signin', data)
      .then(response => {
        Cookies.set('token', response.data.randomToken)
        navigate("/Area")
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className='loginPageBody'>
      <h1 className='titleLoginArea'>
        Login
      </h1>
      <input
        type="email"
        id="text-input"
        value={textEmail}
        onChange={handleTextChangeUser}
        placeholder="Email"
        className='emailLoginArea'
        minLength={8} maxLength={128}
      />
      <input
        type="password"
        id="text-input"
        value={textPassWord}
        onChange={handleTextChangePassWord}
        placeholder="Password"
        className='passwordLoginArea'
        minLength={8} maxLength={64}
      />
      <div className='connectionButon' onClick={handleClickConnection}>
        <span>
          Connection
        </span>
      </div>
      <GoogleButton />
      <Link to="/Register" className='registerButon'>
        Register
      </Link>
    </div>
  );
}

export default Login;
