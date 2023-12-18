import React from 'react';
import './area.css';
import { BrowserRouter as Router, Route, Link, useNavigate} from 'react-router-dom';
import User from '../../Image/User.png'
import AddIcon from '../../Image/AddIcon.png'
import AreaCard from '../../Component/AreaCard/areaCard'

function Area() {

  const navigate = useNavigate()

  return (
    <div className='areaBody'>
      <div className='areaHeader'>
        <span className='areaTitle'>
          Area
        </span>
        <img src={User} className='UserLogo' onClick={() => navigate("/Services")}/>
      </div>
      <AreaCard name="Name area"/>
      <img src={AddIcon} className='AddLogo'/>
    </div>
  );
}

export default Area;