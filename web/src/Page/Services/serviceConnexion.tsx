import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function ServicesConnexion() {

  const navigate = useNavigate()

  useEffect(() => {
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
        console.error(error);
      });
  }, [navigate]);

  return (
    <div>
    </div>
  );
}

export default ServicesConnexion;
