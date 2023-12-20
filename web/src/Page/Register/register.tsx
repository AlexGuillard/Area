import React from 'react';
import { useState } from 'react';
import './register.css';
import { BrowserRouter as Router, Route, Link, useNavigate} from 'react-router-dom';

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
    navigate("/Area")
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