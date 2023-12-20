import React from 'react';
import './services.css';
import { BrowserRouter as Router, Route, Link, useNavigate} from 'react-router-dom';
import User from '../../Image/User.png'
import BackIcon from '../../Image/BackIcon.png'
import ServiceCard from '../../Component/ServiceCard/serviceCard';
import Google from '../../Image/Google.png'

function Services() {

  const navigate = useNavigate()

  return (
    <div className='servicesBody'>
      <div className='servicesHeader'>
        <div className='servicesBackArea' onClick={() => navigate("/Area")}>
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