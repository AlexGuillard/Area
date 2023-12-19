import React from 'react';
import { Avatar } from 'react-native-elements';
import { Text, View, Pressable, StyleSheet, Image } from 'react-native';


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

const styles = StyleSheet.create({
    card: {
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

export default  Reaction