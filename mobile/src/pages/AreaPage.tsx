import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  FlatList,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AreaCard from '../components/areaCard';
import {Appbar} from 'react-native-paper';
import AddComponent from '../components/addComponent';
import EditComponent from '../components/editComponent';
import axios from 'axios';
import {useAuth} from '../context/UserContext';
import HeaderBar from '../components/headerComponent';

interface ReactionItem {
  id: string;
  icon: string;
  title: string;
}
const AreaPage = ({navigation}) => {
  const [showAddArea, setShowAddArea] = useState(false);
  const [showEditArea, setShowEditArea] = useState(false);
  const [areaSelected, setAreaSelected] = useState('');
  const [actionSelected, setActionSelected] = useState('');
  const [reactionSelected, setReactionSelected] = useState('');
  const [listArea, setListArea] = useState<ReactionItem[]>([]);
  const {token, clearAuthData} = useAuth();

  const backgroundStyle = {
    backgroundColor: Colors.darker,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const handleClickAdd = () => {
    setShowEditArea(false);
    setShowAddArea(true);
  };

  const handleClickEdit = (item: string) => {
    setShowEditArea(true);
    setShowAddArea(false);
    setAreaSelected(item);
    setActionSelected('');
    setReactionSelected('');
  };

  useEffect(() => {
    if (token === 'undefined') {
      clearAuthData();
      navigation.navigate('Login');
    }
    const handleCallAreaList = () => {
      axios
        .get('http://10.0.2.2:8080/areas', {
          headers: {
            token: token,
          },
        })
        .then(response => {
          setListArea(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };
    handleCallAreaList();
  }, [clearAuthData, navigation, token]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <HeaderBar
        page="Area"
        left_icon={[
          {
            image_url: require('../../assets/User.png'),
            onPress: () => {
              navigation.navigate('Service');
            },
          },
          {image_url: require('../../assets/Logout.png'), onPress: () => {}},
        ]}
      />
      {showAddArea && (
        <TouchableWithoutFeedback onPress={() => setShowAddArea(false)}>
          <View style={styles.addComponent}>
            <AddComponent />
          </View>
        </TouchableWithoutFeedback>
      )}
      {showEditArea && (
        <TouchableWithoutFeedback onPress={() => setShowEditArea(false)}>
          <View style={styles.editComponent}>
            <EditComponent
              name={areaSelected}
              nameAction={actionSelected}
              nameReaction={reactionSelected}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      <View style={styles.listReaction}>
        <FlatList
          data={listArea}
          renderItem={({item}) => (
            <AreaCard
              title={item.title}
              image_url={item.icon}
              on_press={() => handleClickEdit(item.title)}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      {showAddArea === false && showEditArea === false && (
        <TouchableOpacity style={styles.addButton} onPress={handleClickAdd}>
          <Image source={require('../../assets/FAB.png')} />
        </TouchableOpacity>
      )}
      <Appbar style={styles.bottomBar} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listReaction: {
    height: '75%',
    position: 'absolute',
    top: 50,
  },
  editComponent: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  addComponent: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  addButton: {
    backgroundColor: '#4A4458',
    borderRadius: 16,
    display: 'flex',
    width: 75,
    height: 75,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    zIndex: 3,
  },
  header: {
    backgroundColor: 'rgba(197, 192, 255, 1)',
    position: 'absolute',
    top: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
  },
  headerItem: {
    color: '#2B2277',
    fontSize: 30,
  },
  headerText: {
    textDecorationColor: '#2B2277',
    fontSize: 30,
  },
  bottomBar: {
    backgroundColor: 'rgba(197, 192, 255, 1)',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export default AreaPage;
