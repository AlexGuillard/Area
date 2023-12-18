import React from 'react';
import { useState } from 'react';
import './login.css';

function Login() {

  const [textEmail, setTextEmail] = useState("");
  const [textPassWord, setTextPassWord] = useState("");

  const handleTextChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextEmail(event.target.value);
  };
  const handleTextChangePassWord = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextPassWord(event.target.value);
  };

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
          placeholder="Pass word"
          className='passwordLoginArea'
        />
        <div className='connectionButon'>
          <span>
            Connection
          </span>
        </div>
        <span className='registerButon'>
          Register
        </span>
    </div>
  );
}

export default Login;
