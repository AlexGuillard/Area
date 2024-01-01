import React from 'react';
import Login from './Page/Login/login';
import Register from './Page/Register/register';
import Area from './Page/Area/area';
import Services from './Page/Services/services';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
        <nav>
          <div className="AppBody">
          </div>
        </nav>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/Register" Component={Register} />
          <Route path="/Area" Component={Area} />
          <Route path="/Services" Component={Services} />
        </Routes>
    </Router>
  );
}

export default App;
