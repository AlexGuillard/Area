import React from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';

type ServiceProps = {
  navigation: any;
  serviceName: string;
  status: string;
  image: any;
  userName: string;
  link: string;
};

const ServiceCard: React.FC<ServiceProps> = props => {
  const handleSubmit = () => {
    console.log('Formulaire soumis !');
    // Linking.openURL(props.link);
    props.navigation.navigate(props.link);
  };

  return (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={handleSubmit}
      accessibilityRole="button">
      <View style={styles.serviceCardHeader}>
        <Text style={styles.serviceCardName}>{props.serviceName}</Text>
        <Text style={styles.serviceCardStatus}>{props.status}</Text>
      </View>
      <View style={styles.serviceCardBody}>
        <Image style={styles.serviceLogo} source={props.image} />
        <Text style={styles.serviceCardUser}>{props.userName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  serviceCard: {
    marginTop: 25,
    paddingTop: '2%',
    height: '17%',
    width: '70%',
    backgroundColor: 'rgba(199, 196, 220, 1)',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
  },

  serviceCardHeader: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },

  serviceCardName: {
    fontSize: 20,
    color: '#000000',
    marginLeft: '10%',
  },

  serviceCardStatus: {
    fontSize: 10,
    marginLeft: 'auto',
    marginRight: '10%',
  },

  serviceCardBody: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '85%',
  },

  serviceLogo: {
    width: 50,
    height: 52,
    marginLeft: 20,
  },

  serviceCardUser: {},
});

export default ServiceCard;
