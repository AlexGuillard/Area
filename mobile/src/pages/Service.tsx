import React, {useEffect, useState} from 'react';
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
  const Spotify = require('../../assets/Spotify.png');

  interface ServiceItem {
    typeService: string;
  }

  const [listServices, setListServices] = useState<ServiceItem[]>();
  const [stateGoogle, setStateGoogle] = useState('Not Connected');
  const [stateDiscord, setStateDiscord] = useState('Not Connected');
  const [stateGithub, setStateGithub] = useState('Not Connected');
  const [stateSpotify, setStateSpotify] = useState('Not Connected');

  useEffect(() => {
    if (listServices === undefined) {
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
  }, [listServices, token]);

  return (
    <SafeAreaView style={backgroundStyle}>
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
          navigation={navigation}
          serviceName={'Google'}
          status={stateGoogle}
          image={Google}
          userName={''}
          link={'http://10.0.2.2:8080/myauth/google-redirect'}
        />
        <ServiceCard
          navigation={navigation}
          serviceName={'Discord'}
          status={stateDiscord}
          image={Discord}
          userName={''}
          link={'http://10.0.2.2:8080/services/discord/login'}
        />
        <ServiceCard
          navigation={navigation}
          serviceName={'Github'}
          status={stateGithub}
          image={Github}
          userName={''}
          link={'GithubWebView'}
        />
        <ServiceCard
          navigation={navigation}
          serviceName={'Spotify'}
          status={stateSpotify}
          image={Spotify}
          userName={''}
          link={'http://10.0.2.2:8080/auth/spotify'}
        />
      </View>
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
});

export default Service;
