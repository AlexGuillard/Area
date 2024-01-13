import {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions} from 'react-native';
import axios from 'axios';
import {useAuth} from '../context/UserContext';
import ServiceCard from '../components/ServiceList/serviceList';
import HeaderBar from '../components/headerComponent';

const Service = ({navigation}) => {
  const backgroundStyle = {
    backgroundColor: '#1C1B1F',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const {token} = useAuth();

  const Google = require('../../assets/Google.png');
  const Discord = require('../../assets/Discord.png');
  const Github = require('../../assets/Github.png');
  // const Spotify = require('../../assets/Spotify.png')

  interface ServiceItem {
    typeService: string;
  }

  const [listServices, setListServices] = useState<ServiceItem[]>();
  const [stateGoogle, setStateGoogle] = useState('Not Connected');
  const [stateDiscord, setStateDiscord] = useState('Not Connected');
  const [stateGithub, setStateGithub] = useState('Not Connected');
  const [stateSpotify, setStateSpotify] = useState('Not Connected');

  const handleCallServicesList = () => {
    const storedToken = token;
    axios
      .get('http://10.0.2.2:8080/services', {
        headers: {
          token: storedToken,
        },
      })
      .then(response => {
        setListServices(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (listServices === undefined) {
      handleCallServicesList();
    } else {
      let i = 0;
      while (listServices[i]) {
        if (listServices[i].typeService === 'GOOGLE') {
          setStateGoogle('Connected');
        } else if (listServices[i].typeService === 'DISCORD') {
          setStateDiscord('Connected');
        } else if (listServices[i].typeService === 'GITHUB') {
          setStateGithub('Connected');
        } else if (listServices[i].typeService === 'SPOTIFY') {
          setStateSpotify('Connected');
        }
        i = i + 1;
      }
    }
  }, [listServices]);

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      /> */}
      <HeaderBar
        page="Services"
        left_icon={[
          {
            image_url: require('../../assets/BackIcon.png'),
            onPress: () => {
              navigation.goBack();
            },
          },
        ]}
      />
      <View style={styles.servicesCardArea}>
        <ServiceCard
          serviceName={'Google'}
          status={stateGoogle}
          image={Google}
          userName={''}
          link={'http://10.0.2.2:8080/myauth/google-redirect'}
        />
        <ServiceCard
          serviceName={'Discord'}
          status={stateDiscord}
          image={Discord}
          userName={''}
          link={'http://10.0.2.2:8080/services/discord/login'}
        />
        <ServiceCard
          serviceName={'Github'}
          status={stateGithub}
          image={Github}
          userName={''}
          link={'http://10.0.2.2:8080/auth/github'}
        />
        <ServiceCard
          serviceName={'Spotify'}
          status={stateSpotify}
          image={Google}
          userName={''}
          link={'http://10.0.2.2:8080/auth/spotify'}
        />
      </View>
      {/* <Appbar style={styles.bottomBar}>
        <Appbar.Action
          icon="arrow-left"
          onPress={() => {
          }}
        />
        <Appbar.Content title="Area" />
      </Appbar> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  servicesCardArea: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    paddingTop: '30%',
  },

  // listReaction: {
  //   height: Dimensions.get('window').height - 275,
  // },
  // addButton: {
  //   backgroundColor: '#4A4458',
  //   borderRadius: 16,
  //   display: 'flex',
  //   width: 75,
  //   height: 75,
  //   marginTop: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   position: 'absolute',
  //   bottom: 20,
  //   zIndex: 1,
  // },
  // header: {
  //   backgroundColor: 'rgba(197, 192, 255, 1)',
  //   position: 'absolute',
  //   top: 0,
  //   width: '100%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: '10%',
  // },
  // headerItem: {
  //   color: '#2B2277',
  //   fontSize: 30,
  // },
  // headerText: {
  //   textDecorationColor: '#2B2277',
  //   fontSize: 30,
  // },
  // bottomBar: {
  //   backgroundColor: 'rgba(197, 192, 255, 1)',
  //   width: '100%',
  //   position: 'absolute',
  //   bottom: 0,
  // },
});

export default Service;
