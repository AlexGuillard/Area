import React from 'react';
import './register.css';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import GoogleButton from '../../Component/GoogleButton/GoogleButton';

function Register() {

  const navigate = useNavigate()

  const [textEmail, setTextEmail] = useState("");
  const [textPassWord, setTextPassWord] = useState("");

  const handleTextChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextEmail(event.target.value);
  };
  const handleTextChangePassWord = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextPassWord(event.target.value);
  };

  const handleClickRegister = () => {
    const data = {
      mail: textEmail,
      password: textPassWord,
    };
    axios.post(process.env.REACT_APP_SERVER_URL + '/auth/signup', data)
      .then(response => {
        Cookies.set('token', response.data.randomToken)
        navigate("/Area")
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className='registerPageBody'>
        <input
          type="email"
          id="text-input"
          value={textEmail}
          onChange={handleTextChangeUser}
          placeholder="Email"
          className='emailRegisterArea'
          minLength={8} maxLength={128}
        />
        <input
          type="password"
          id="text-input"
          value={textPassWord}
          onChange={handleTextChangePassWord}
          placeholder="Password"
          className='passwordRegisterArea'
          minLength={8} maxLength={64}
        />
        <div className='connectionButon' onClick={handleClickRegister}>
          <span>
            Register
          </span>
        </div>

        <GoogleButton />

        <Link to="/" className='registerButon'>
          Login
        </Link>
    </div>
  );
}

export default Register;
