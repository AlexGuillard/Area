import React, { useEffect } from 'react';
import './services.css';
import { useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';import
User from '../../Image/User.png'
import BackIcon from '../../Image/BackIcon.png'
import ServiceCard from '../../Component/ServiceCard/serviceCard';
import Google from '../../Image/Google.png'
import Discord from '../../Image/Discord.png'
import Github from '../../Image/Github.png'

function Services() {

  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken == "undefined")
      navigate("/")
  }, [navigate]);

  return (
    <div className='servicesBody'>
      <div className='servicesHeader'>
        <div className='servicesBackArea' onClick={() => navigate("/Area")}>
          <img src={BackIcon} className='BackLogo' alt="back"/>
          <span className='BackTitle'>
            Area
          </span>
        </div>
        <span className='servicesTitle'>
          Services
        </span>
        <img src={User} className='UserLogo' alt="user logo"/>
      </div>
      <div className='servicesCardArea'>
        <ServiceCard name="Google" status='Not Connected' user='User name' image={Google} link='http://localhost:8080/myauth/google-redirect'/>
        <ServiceCard name="Discord" status='Not Connected' user='User name' image={Discord} link=''/>
        <ServiceCard name="Github" status='Not Connected' user='User name' image={Github} link=''/>
      </div>
    </div>
  );
}

export default Services;
