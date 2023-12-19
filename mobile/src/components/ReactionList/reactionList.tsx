import React from 'react';
import { Avatar } from 'react-native-elements';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
  Dimensions
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    icon: 'https://picsum.photos/id/237/200/300',
    title: 'Reaction',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    icon: 'https://picsum.photos/seed/picsum/200/300',
    title: 'Reaction',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    icon: 'https://picsum.photos/200/300',
    title: 'Reaction',
  },
    {
    id: '2aaef08c-9e70-11ee-8c90-0242ac120002',
    icon: 'https://picsum.photos/200/300',
    title: 'Reaction',
  },
    {
    id: '32805184-9e70-11ee-8c90-0242ac120002',
    icon: 'https://picsum.photos/id/237/200/300',
    title: 'Reaction',
  },
    {
    id: '37310b9c-9e70-11ee-8c90-0242ac120002',
    icon: 'https://picsum.photos/id/237/200/300',
    title: 'Reaction',
  },  {
    id: '3ea5160c-9e70-11ee-8c90-0242ac120002',
    icon: 'https://picsum.photos/id/237/200/300',
    title: 'Reaction',
  },
];

type ReactionProps = {
  title: string,
  image_url: string,
};

const Reaction = (props: ReactionProps) => {
    return (
      <View>
        <Pressable style={styles.card} onPress={() => { console.log("pressed") }}>
            <Avatar
            rounded
            size="medium"
            source={{uri: props.image_url}}/>
            <Text style={styles.cardText}>{props.title}</Text>
        </Pressable>
      </View>
    );
}

const ReactionList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Reaction title={item.title} image_url={item.icon} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight|| 0,
    justifyContent: 'space-evenly',
  },
  card: {
    marginHorizontal: 30,
    marginVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 16,
    padding: 10,
    backgroundColor: "rgba(199, 196, 220, 1)",
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  cardImage: {
      width: 65,
      height: 65,
      borderRadius: 100,
  },
  cardText: {
      paddingLeft: 50,
      paddingVertical: 10,
      color: "#000",
      textAlign: "center",
      fontSize: 25,
      fontWeight: "400",
  }
});

export default ReactionList;