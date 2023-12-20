import React, { useState } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, useColorScheme,
  TouchableOpacity,
  Pressable, View, Dimensions, Image} from 'react-native';
import { Colors} from 'react-native/Libraries/NewAppScreen';
import ReactionList from '../components/ReactionList/reactionList'
import { Appbar } from 'react-native-paper';

function AreaPage(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor:  Colors.darker,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={styles.listReaction}>
          <ReactionList/>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Image source={require('../../assets/FAB.png')} />
        </TouchableOpacity>
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
    zIndex: 1
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
