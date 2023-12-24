import React from 'react';
import './login.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

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
        Cookies.set('token', response.data[2])
        navigate("/Area")
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className='loginPageBody'>
        <input
          type="text"
          id="text-input"
          value={textEmail}
          onChange={handleTextChangeUser}
          placeholder="Email"
          className='emailLoginArea'
        />
        <input
          type="text"
          id="text-input"
          value={textPassWord}
          onChange={handleTextChangePassWord}
          placeholder="Password"
          className='passwordLoginArea'
        />
        <div className='connectionButon' onClick={handleClickConnection}>
          <span>
            Connection
          </span>
        </div>
        <Link to="/Register" className='registerButon'>
          Register
        </Link>
    </div>
  );
}

export default Login;
