import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, useColorScheme,
  TouchableOpacity, TouchableWithoutFeedback,
  Pressable, View, Dimensions, Image, FlatList} from 'react-native';
import { Colors} from 'react-native/Libraries/NewAppScreen';
import Reaction from '../components/ReactionList/reactionList'
import { Appbar } from 'react-native-paper';
import AddComponent from '../components/addComponent';
import EditComponent from '../components/editComponent';
import {data_reaction} from '../constants/test_data';


interface ReactionItem {
  id: string;
  icon: string;
  title: string;
}
const AreaPage = () => {
  const [showAddArea, setShowAddArea] = useState(false);
  const [showEditArea, setShowEditArea] = useState(false);
  const [areaSelected, setAreaSelected] = useState('');
  const [listArea, setListArea] = useState<ReactionItem[]>([]);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor:  Colors.darker,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const handleClickAdd = () => {
    setShowEditArea(false)
    setShowAddArea(true)
  }

  const handleClickEdit = (item: string) => {
    setShowEditArea(true)
    setShowAddArea(false)
    setAreaSelected(item)
  }

  useEffect(() => {
    setListArea(data_reaction)
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {
          showAddArea &&
          (
            <TouchableWithoutFeedback onPress={() => setShowAddArea(false)}>
              <View style={styles.addComponent}>
                <AddComponent />
              </View>
            </TouchableWithoutFeedback>
          )
        }
        {
          showEditArea &&
          (
            <TouchableWithoutFeedback onPress={() => setShowEditArea(false)}>
              <View style={styles.editComponent}>
                <EditComponent name={areaSelected}/>
              </View>
            </TouchableWithoutFeedback>
          )
        }
        <View style={styles.listReaction}>
          <FlatList
            data={listArea}
            renderItem={({item}) =>
            <Reaction title={item.title} image_url={item.icon} on_press={() => handleClickEdit(item.title)}/>
            }
            keyExtractor={item => item.id}
          />
        </View>
        {
          showAddArea==false && showEditArea==false &&
          (
            <TouchableOpacity style={styles.addButton} onPress={handleClickAdd}>
              <Image source={require('../../assets/FAB.png')} />
            </TouchableOpacity>
          )
        }
          <Appbar style={styles.bottomBar}>
          </Appbar>
      </SafeAreaView>
  );
}

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
    zIndex: 1
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
    zIndex: 1
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
    zIndex: 3
  },
  header: {
    backgroundColor : 'rgba(197, 192, 255, 1)',
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
    backgroundColor : 'rgba(197, 192, 255, 1)',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  }
});

export default AreaPage;
