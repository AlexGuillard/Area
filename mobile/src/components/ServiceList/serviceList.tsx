import React from 'react';
import {Avatar} from 'react-native-elements';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    image_url: 'https://picsum.photos/id/237/200/300',
    userName: 'User 1',
    status: 'Active',
    serviceName: 'Service 1',
  },
  {
    id: '41cabac8-9701-43e6-b862-45bb0ed222c9',
    image_url: 'https://picsum.photos/id/237/200/300',
    userName: 'User 2',
    status: 'Active',
    serviceName: 'Service 2',
  },
  {
    id: '8eb6869c-9f08-11ee-8c90-0242ac120002',
    image_url: 'https://picsum.photos/id/237/200/300',
    userName: 'User 3',
    status: 'Active',
    serviceName: 'Service 3',
  },
  {
    id: '92bbcbd0-9f08-11ee-8c90-0242ac120002',
    image_url: 'https://picsum.photos/id/237/200/300',
    userName: 'User 4',
    status: 'Active',
    serviceName: 'Service 4',
  },
  {
    id: '980ed3fc-9f08-11ee-8c90-0242ac120002',
    image_url: 'https://picsum.photos/id/237/200/300',
    userName: 'User 5',
    status: 'Active',
    serviceName: 'Service 5',
  },
  {
    id: '9b78d84e-9f08-11ee-8c90-0242ac120002',
    image_url: 'https://picsum.photos/id/237/200/300',
    userName: 'User 6',
    status: 'Active',
    serviceName: 'Service 6',
  },
];

type ServiceProps = {
  serviceName: string;
  status: string;
  image_url: string;
  userName: string;
};

const ServiceCard = (props: ServiceProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.infoPart}>
        <Text style={{fontSize: 20, color: 'black'}}>{props.serviceName}</Text>
        <View style={{flex: 1}} />
        <Text
          style={{
            marginLeft: 50,
            fontSize: 10,
            color: props.status === 'Active' ? 'green' : 'red',
          }}>
          {props.status}
        </Text>
      </View>
      <View style={styles.userPart}>
        <Avatar rounded size="large" source={{uri: props.image_url}} />
        <Text style={styles.userNameText}>{props.userName}</Text>
      </View>
    </View>
  );
};

const ServiceList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <ServiceCard
            serviceName={item.serviceName}
            status={item.status}
            image_url={item.image_url}
            userName={item.userName}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '80%',
  },
  card: {
    paddingHorizontal: 24,
    borderRadius: 16,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(199, 196, 220, 1)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  infoPart: {
    flexDirection: 'row',
  },
  userPart: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  cardImage: {
    width: 65,
    height: 65,
    borderRadius: 100,
  },
  userNameText: {
    fontSize: 30,
    marginLeft: 20,
    color: 'black',
  },
});

export default ServiceList;
