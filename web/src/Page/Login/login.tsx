import React from 'react';
import { useState } from 'react';
import './login.css';
import { BrowserRouter as Router, Route, Link, useNavigate} from 'react-router-dom';

function Login() {

  const [textEmail, setTextEmail] = useState("");
  const [textPassWord, setTextPassWord] = useState("");
  const navigate = useNavigate()

  const handleTextChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextEmail(event.target.value);
  };
  const handleTextChangePassWord = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextPassWord(event.target.value);
  };

  const handleClickConnection = () => {
    navigate("/Area")
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
          placeholder="Pass word"
          className='passwordLoginArea'
        />
        <div className='connectionButon'>
          <span onClick={handleClickConnection}>
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
