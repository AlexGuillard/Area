import React from 'react';
import { useState } from 'react';
import './register.css';

function Register() {

  const [textEmail, setTextEmail] = useState("");
  const [textPassWord, setTextPassWord] = useState("");

  const handleTextChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextEmail(event.target.value);
  };
  const handleTextChangePassWord = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextPassWord(event.target.value);
  };

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
        <div className='connectionButon'>
          <span>
            Register
          </span>
        </div>
        <span className='registerButon'>
          Connection
        </span>
    </div>
  );
}

export default Register;