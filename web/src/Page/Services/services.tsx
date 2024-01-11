import React, { useEffect, useState } from 'react';
import './services.css';
import { useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import User from '../../Image/User.png'
import BackIcon from '../../Image/BackIcon.png'
import ServiceCard from '../../Component/ServiceCard/serviceCard';
import Google from '../../Image/Google.png'
import Discord from '../../Image/Discord.png'
import Github from '../../Image/Github.png'
import Spotify from '../../Image/Spotify.png'

function Services() {

  const navigate = useNavigate()

  interface ServiceItem {
    typeService: string;
  }

  const [listServices, setListServices] = useState<ServiceItem[]>()
  const [stateGoogle, setStateGoogle] = useState("Not Connected")
  const [stateDiscord, setStateDiscord] = useState("Not Connected")
  const [stateGithub, setStateGithub] = useState("Not Connected")
  const [stateSpotify, setStateSpotify] = useState("Not Connected")

  const handleCallServicesList = () => {
    const storedToken = Cookies.get('token');
    axios.get(process.env.REACT_APP_SERVER_URL + "/services", {
      headers: {
        token: storedToken,
      }
    })
      .then(response => {
        setListServices(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }


  useEffect(() => {
    document.cookie = "tokenService=testservice; samesite=strict";
    document.cookie = "RefreshToken=testRefreshToken; samesite=strict";
    document.cookie = "ServiceType=testServiceType; samesite=strict";
    const storedToken = Cookies.get('token');
    if (storedToken === "undefined")
      navigate("/")
    if (listServices === undefined) {
      handleCallServicesList()
    } else  {
      let i = 0
      while (listServices[i]) {
        if (listServices[i].typeService === "GOOGLE") {
          setStateGoogle("Connected")
        } else if (listServices[i].typeService === "DISCORD") {
          setStateDiscord("Connected")
        } else if (listServices[i].typeService === "GITHUB") {
          setStateGithub("Connected")
        } else if (listServices[i].typeService === "SPOTIFY") {
          setStateSpotify("Connected")
        }
        i = i + 1
      }
    }
  }, [navigate, listServices]);

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
        <ServiceCard name="Google" status={stateGoogle} user='' image={Google} link={`${process.env.REACT_APP_SERVER_URL}/myauth/google-redirect`}/>
        <ServiceCard name="Discord" status={stateDiscord} user='' image={Discord} link={`${process.env.REACT_APP_SERVER_URL}/services/discord/login`}/>
        <ServiceCard name="Github" status={stateGithub} user='' image={Github} link={`${process.env.REACT_APP_SERVER_URL}/auth/github`}/>
        <ServiceCard name="Spotify" status={stateSpotify} user='' image={Spotify} link={`${process.env.REACT_APP_SERVER_URL}/auth/spotify`}/>
      </div>
    </div>
  );
}

export default Services;
