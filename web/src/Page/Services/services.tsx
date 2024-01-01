import React, { useEffect } from 'react';
import './services.css';
import { useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';import
User from '../../Image/User.png'
import BackIcon from '../../Image/BackIcon.png'
import ServiceCard from '../../Component/ServiceCard/serviceCard';
import Google from '../../Image/Google.png'

function Services() {

  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken == null)
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
      <form action="http://localhost:8080/myauth/google-redirect" method="get">
        <input type="submit" value="Press to log in"/>
      </form>
      <ServiceCard name="Google" status='Not Connected' user='User name' image={Google}/>
    </div>
  );
}

export default Services;
