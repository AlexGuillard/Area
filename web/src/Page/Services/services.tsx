import React from 'react';
import './services.css';
import User from '../../Image/User.png'
import BackIcon from '../../Image/BackIcon.png'
import ServiceCard from '../../Component/ServiceCard/serviceCard';
import Google from '../../Image/Google.png'

function Services() {
  return (
    <div className='servicesBody'>
      <div className='servicesHeader'>
        <div className='servicesBackArea'>
          <img src={BackIcon} className='BackLogo'/>
          <span className='BackTitle'>
            Area
          </span>
        </div>
        <span className='servicesTitle'>
          Services
        </span>
        <img src={User} className='UserLogo'/>
      </div>
      <ServiceCard name="Google" status='Not Connected' user='User name' image={Google}/>
    </div>
  );
}

export default Services;