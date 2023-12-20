import React, { useState } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, useColorScheme,
  TouchableOpacity,
  Pressable, View, Dimensions, Image} from 'react-native';
import { Colors} from 'react-native/Libraries/NewAppScreen';
import ReactionList from '../components/ReactionList/reactionList'
import { Appbar } from 'react-native-paper';
import AddComponent from '../components/addComponent';

const AreaPage = () => {
  const [showAddArea, setShowAddArea] = useState(false);
  const [showEditArea, setShowEditArea] = useState(false);
  const [areaSelected, setAreaSelected] = useState("");
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

  return (
    <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {
          showAddArea &&
          (
            <View style={styles.addComponent}>
               <TouchableOpacity style={{height: "100%", width: "100%", position: 'absolute', zIndex: 2}}
                onPress={() => setShowAddArea(false)}
                />
              <AddComponent/>
            </View>
          )
        }
        <View style={styles.listReaction}>
          <ReactionList/>
        </View>
        {
          showAddArea==false &&
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
    height: "80%",
    position: 'absolute',
    top: 0,
  },
  addComponent: {
    position: 'absolute',
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
  },
  addButton: {
    backgroundColor: "#4A4458",
    borderRadius: 16,
    display: "flex",
    width: 75,
    height: 75,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: 20,
    zIndex: 3
  },
  header: {
    backgroundColor : "rgba(197, 192, 255, 1)",
    position: 'absolute',
    top: 0,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    height: "10%",
  },
  headerItem: {
    color: "#2B2277",
    fontSize: 30,
  },
  headerText: {
    textDecorationColor: "#2B2277",
    fontSize: 30,
  },
  bottomBar: {
    backgroundColor : "rgba(197, 192, 255, 1)",
    width: "100%",
    position: 'absolute',
    bottom: 0,
  }
});

export default AreaPage;
