import React from 'react';
import './area.css';
import User from '../../Image/User.png'
import AddIcon from '../../Image/AddIcon.png'
import AreaCard from '../../Component/AreaCard/areaCard'

function Area() {
  return (
    <div className='areaBody'>
      <div className='areaHeader'>
        <span className='areaTitle'>
          Area
        </span>
        <img src={User} className='UserLogo'/>
      </div>
      <AreaCard name="Name area"/>
      <img src={AddIcon} className='AddLogo'/>
    </div>
  );
}

export default Area;