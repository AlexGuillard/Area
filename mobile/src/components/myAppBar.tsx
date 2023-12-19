import React from 'react';
import { StyleSheet, useColorScheme} from 'react-native';
import { Colors} from 'react-native/Libraries/NewAppScreen';
import { Appbar } from 'react-native-paper';

type appBarProps = {
  title: string,
};


const MyAppBar = (props: appBarProps) =>  {
  return (
    <Appbar style={styles.header}>
        <Appbar.Content title={props.title}/>
        <Appbar.Action icon="account-circle" onPress={() => {}} />
    </Appbar>
  );
}

const styles = StyleSheet.create({
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
});

export default MyAppBar;
