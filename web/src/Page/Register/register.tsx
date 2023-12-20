import React from 'react';
import './register.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

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
    console.log(process.env.REACT_APP_SERVER_URL)
    axios.post(process.env.REACT_APP_SERVER_URL + '/auth/signup', data)
      .then(response => {
        console.log(response.data)
        console.log(response.data[2])
        Cookies.set('token', response.data[2])
        navigate("/Area")
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className='registerPageBody'>
        <input
          type="text"
          id="text-input"
          value={textEmail}
          onChange={handleTextChangeUser}
          placeholder="Email"
          className='emailRegisterArea'
        />
        <input
          type="text"
          id="text-input"
          value={textPassWord}
          onChange={handleTextChangePassWord}
          placeholder="Pass word"
          className='passwordRegisterArea'
        />
        <div className='connectionButon' onClick={handleClickRegister}>
          <span>
            Register
          </span>
        </div>
        <Link to="/" className='registerButon'>
          Login
        </Link>
    </div>
  );
}

export default Register;