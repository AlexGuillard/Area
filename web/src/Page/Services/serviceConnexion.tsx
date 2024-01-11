import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function ServicesConnexion() {

  const navigate = useNavigate()
  const [storedRefreshTokenService, setstoredRefreshTokenService] = useState(Cookies.get('RefreshToken'));
  const [storedTokenService, setstoredTokenService] = useState(Cookies.get('tokenService'));
  const [storedServiceType, setstoredServiceType] = useState(Cookies.get('ServiceType'));

  const registerService = async () => {
    const storedToken = Cookies.get('token');
    const data = {
      token: storedTokenService,
      refresh_token: storedRefreshTokenService,
      typeService: storedServiceType,
    }
    await axios
      .post(process.env.REACT_APP_SERVER_URL + '/services/connexion', data, {
        headers: {
          token: storedToken,
        },
      }) 
      .then(() => {
        navigate("/Area")
      })
      .catch(error => {
        console.error("error at services/connexion");
        console.error(error.data);
        navigate("/Area")
      });
  }

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken == null)
      navigate("/")
    setstoredRefreshTokenService(Cookies.get('RefreshToken'))
    setstoredTokenService(Cookies.get('tokenService'))
    setstoredServiceType(Cookies.get('ServiceType'))
    registerService();
  }, []);

  return (
    <div>
    </div>
  );
}

export default ServicesConnexion;
