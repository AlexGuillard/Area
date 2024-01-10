import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function ServicesConnexion() {

  const navigate = useNavigate()
  const [storedRefreshTokenService, setstoredRefreshTokenService] = useState(Cookies.get('RefreshToken'));
  const [storedTokenService, setstoredTokenService] = useState(Cookies.get('tokenService'));
  const [storedServiceType, setstoredServiceType] = useState(Cookies.get('ServiceType'));

  useEffect(() => {
    console.log(Cookies.get('tokenService'))
    const storedToken = Cookies.get('token');
    if (storedToken == null)
      navigate("/")
    const storedTokenService = Cookies.get('tokenService');
    const storedRefreshTokenService = Cookies.get('RefreshToken');
    const storedServiceType = Cookies.get('ServiceType');
    const data = {
        token: storedTokenService,
        refresh_token: storedRefreshTokenService,
        typeService: storedServiceType,
    }
    // axios
    //   .get(process.env.REACT_APP_SERVER_URL + 'services/discord/callback', {
    //     withCredentials: true,
    //   })
    //   .then(() => {
    //     console.log("cookie " + Cookies.attributes)
    //     setstoredRefreshTokenService(Cookies.get('RefreshToken'))
    //     setstoredTokenService(Cookies.get('tokenService'))
    //     setstoredServiceType(Cookies.get('ServiceType'))
    //   })
    //   .catch(error => {
    //     console.error("error here " + error.data);
    //   });
    axios
      .post(process.env.REACT_APP_SERVER_URL + '/connexion', data, {
        headers: {
            randomToken: storedToken,
        },
      }) 
      .then(() => {
        navigate("/Area")
      })
      .catch(error => {
        console.error(error.data);
      });
  }, [navigate]);

  return (
    <div>
      <p>storedTokenService: { storedTokenService }</p>
      <p>storedRefreshTokenService: { storedRefreshTokenService }</p>
      <p>storedServiceType: { storedServiceType }</p>
    </div>
  );
}

export default ServicesConnexion;
