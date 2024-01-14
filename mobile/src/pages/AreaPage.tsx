import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Pressable,
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
import {REACT_APP_SERVER_IP, REACT_APP_SERVER_PORT} from '@env';

interface AreaItem {
  id: string;
  nameArea: string;
}
const AreaPage = ({navigation}) => {
  const [showAddArea, setShowAddArea] = useState(false);
  const [showEditArea, setShowEditArea] = useState(false);
  const [areaSelected, setAreaSelected] = useState('');
  const [actionSelected, setActionSelected] = useState('');
  const [reactionSelected, setReactionSelected] = useState('');
  const [listArea, setListArea] = useState<AreaItem[]>([]);
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

  const logOutUser = () => {
    axios
        .post(REACT_APP_SERVER_IP + ':' + REACT_APP_SERVER_PORT + '/auth/signout', {
          headers: {
            token: token,
          },
        })
        .then(() => {
          clearAuthData();
          navigation.navigate('Login');
        })
        .catch(error => {
          console.error(error);
        });
  }

  const handleCallAreaList = () => {
    axios
      .get(REACT_APP_SERVER_IP + ':' + REACT_APP_SERVER_PORT + '/areas', {
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

  useEffect(() => {
    if (token === 'undefined') {
      clearAuthData();
      navigation.navigate('Login');
    }
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
          {image_url: require('../../assets/Logout.png'), onPress: () => logOutUser()},
        ]}
      />
      {showAddArea && (
        <TouchableWithoutFeedback onPress={() => setShowAddArea(false)}>
          <View style={styles.addComponent}>
            <AddComponent refreshAreas={handleCallAreaList} closeAddArea={() => setShowAddArea(false)}/>
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
      <View style={styles.areaList}>
        <FlatList
          data={listArea}
          renderItem={({item}) => (
            <Pressable onPress={() => handleClickEdit(item.id)}>
                <AreaCard
              name={item.nameArea}
              on_press={() => handleClickEdit(item.id)}
            />
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      {showAddArea === false && showEditArea === false && (
        <TouchableOpacity style={styles.addButton} onPress={handleClickAdd}>
          <Image style={styles.addButton}  source={require('../../assets/AddIcon.png')} />
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
    borderRadius: 16,
    width: 75,
    height: 75,
    marginTop: 10,
    position: 'absolute',
    bottom: "2%",
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
  areaList: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '60%',
    gap: 50,
    padding: 0,
    marginTop: 10,
  }
});

export default AreaPage;
