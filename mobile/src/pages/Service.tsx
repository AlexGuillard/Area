import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Appbar} from 'react-native-paper';
import ServiceList from '../components/ServiceList/serviceList.tsx';

function Service(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.darker,
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
      <View style={styles.listContainer}>
        <ServiceList />
      </View>
      <Appbar style={styles.bottomBar}>
        <Appbar.Action
          icon="arrow-left"
          onPress={() => {
            console.log('pressed return');
          }}
        />
        <Appbar.Content title="Area" />
      </Appbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listReaction: {
    height: Dimensions.get('window').height - 275,
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
    zIndex: 1,
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
  listContainer: {
    height: Dimensions.get('window').height - 275,
  },
  bottomBar: {
    backgroundColor: 'rgba(197, 192, 255, 1)',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

export default Service;
